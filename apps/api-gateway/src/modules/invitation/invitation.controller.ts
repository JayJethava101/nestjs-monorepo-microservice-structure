import { Controller, Post, Body, UseGuards, Get, Query, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from '@libs/dto/invitation/create-invitation.dto';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { RolesGuard } from '../../guards/roles/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

@ApiTags('invitations')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Roles('super_admin')
@Controller('invitations')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user invitation' })
  @ApiResponse({ status: 201, description: 'Invitation sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request or active invitation exists' })
  async createInvitation(@Body() createInvitationDto: CreateInvitationDto) {
    return this.invitationService.createInvitation(createInvitationDto);
  }

  @Get('validate')
  @ApiOperation({ summary: 'Validate an invitation token' })
  @ApiResponse({ status: 200, description: 'Invitation is valid' })
  @ApiResponse({ status: 400, description: 'Invalid or expired invitation' })
  async validateInvitation(@Query('token') token: string) {
    if (!token) {
      throw new BadRequestException('Token is required');
    }
    return this.invitationService.validateInvitation(token);
  }
} 