import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { addHours } from 'date-fns';
import { CreateInvitationDto } from '@libs/dto/invitation/create-invitation.dto';
import { Invitation } from '@libs/entity/invitation.entity';
import { RbacService } from '../rbac/rbac.service';
import { CognitoService } from '../cognito/cognito.service';
import { EmailService } from '../utils/email.service';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation, 'central_db')
    private invitationRepository: Repository<Invitation>,
    private configService: ConfigService,
    // private rbacService: RbacService,
    // private cognitoService: CognitoService,
    private emailService: EmailService,
  ) {}

  async createInvitation(createInvitationDto: CreateInvitationDto): Promise<{ message: string }> {
    // Check if invitation already exists and is not expired
    const existingInvitation = await this.invitationRepository.findOne({
      where: {
        email: createInvitationDto.email,
        is_used: false,
        expires_at: MoreThan(new Date()),
      },
    });

    if (existingInvitation) {
      throw new BadRequestException('An active invitation already exists for this email');
    }

    // Generate invitation token
    const token = uuidv4();
    const expiresAt = addHours(new Date(), 24);

    // Create invitation record
    const invitation = this.invitationRepository.create({
      ...createInvitationDto,
      token,
      expires_at: expiresAt,
    });

    await this.invitationRepository.save(invitation);

    // Generate invitation link
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const invitationLink = `${frontendUrl}/signup?token=${token}&tenant_id=${createInvitationDto.tenant_id}`;

    // Send invitation email
    await this.emailService.sendInvitationEmail({
      to: createInvitationDto.email,
      invitationLink,
      role: createInvitationDto.role,
    });

    return {
      message: 'Invitation sent successfully',
    };
  }

  async validateInvitation(token: string): Promise<Invitation> {
    const invitation = await this.invitationRepository.findOne({
      where: {
        token,
        is_used: false,
        expires_at: MoreThan(new Date()),
      },
    });

    if (!invitation) {
      throw new BadRequestException('Invalid or expired invitation link');
    }

    return invitation;
  }

  async markInvitationAsUsed(token: string): Promise<void> {
    await this.invitationRepository.update(
      { token },
      { is_used: true }
    );
  }
} 