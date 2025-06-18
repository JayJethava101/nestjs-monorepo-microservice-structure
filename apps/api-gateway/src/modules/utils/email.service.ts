import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '@libs/dto/invitation/create-invitation.dto';
import * as nodemailer from 'nodemailer';

interface InvitationEmailData {
  to: string;
  invitationLink: string;
  role: UserRole;
}

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: true,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendInvitationEmail(data: InvitationEmailData): Promise<void> {
    const { to, invitationLink, role } = data;

    const mailOptions = {
      from: this.configService.get('SMTP_FROM'),
      to,
      subject: 'You have been invited to join our platform',
      html: `
        <h1>Welcome to our platform!</h1>
        <p>You have been invited to join as a ${role}.</p>
        <p>Click the link below to complete your registration:</p>
        <a href="${invitationLink}">Complete Registration</a>
        <p>This invitation link will expire in 24 hours.</p>
        <p>If you did not request this invitation, please ignore this email.</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
} 