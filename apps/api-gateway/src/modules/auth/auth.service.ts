import { Injectable } from '@nestjs/common';
import { CognitoService } from '../cognito/cognito.service';
import { RbacService } from './../rbac/rbac.service';
import { GlobalSignOutDto, ChangePasswordDto  } from './dto/auth-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly cognitoService: CognitoService,
    private readonly rbacService: RbacService,
   
  ) {}

  async signUp(email: string, password: string, name: string) {
    return this.cognitoService.signUp(email, password, name);
  }

  async signIn(email: string, password: string) {
    return this.cognitoService.signIn(email, password);
  }

  async verifyMFASetup(session: string, totpCode: string, email: string) {
    return this.cognitoService.verifyMFASetup(session, totpCode, email);
  }

  async completeMfaSetup(session: string, totpCode: string, email: string) {
    return this.cognitoService.completeMfaSetup(session, totpCode, email);
  }

  async verifyMFA(session: string, totpCode: string, email: string) {
    return this.cognitoService.verifyMFA(session, totpCode, email);
  }

  async forgotPassword(email: string) {
    return this.cognitoService.forgotPassword(email);
  }

  async confirmForgotPassword(email: string, password: string, confirmationCode: string) {
    return this.cognitoService.confirmForgotPassword(email, password, confirmationCode);
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const { email, currentPassword, newPassword } = changePasswordDto;
    return this.cognitoService.changePassword(email, currentPassword, newPassword);
  }

  async assignDefaultRole(email: string) {
    // Default role is typically "user"
    await this.rbacService.assignRoleToUser(email, 'user');
  }

  async globalSignOut(globalSignOutDto: GlobalSignOutDto) {
    const { accessToken } = globalSignOutDto;
    
    return this.cognitoService.globalSignOut(accessToken);

  }

  async forcedGlobalSignOut(email: string) {
    return this.cognitoService.forcedGlobalSignOut(email);
  }

  async refreshToken(refreshToken: string) {
    return this.cognitoService.refreshToken(refreshToken);
  }
}