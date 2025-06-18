import { Injectable } from '@nestjs/common';
import { CognitoService } from '../cognito/cognito.service';
import { RbacService } from './../rbac/rbac.service';
import { UserTenantMapService } from '../user-tenant-map/user-tenant-map.service';
import { GlobalSignOutDto, ChangePasswordDto  } from './dto/auth-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly cognitoService: CognitoService,
    private readonly rbacService: RbacService,
    private readonly userTenantMapService: UserTenantMapService,
  ) {}

  async signUp(email: string, password: string, name: string, tenantId: string, role: string) {
    // todo: add the user in the cognito user group based on the role
    return this.cognitoService.signUp(email, password, name, tenantId);
  }

  async signIn(email: string, password: string) {
    return this.cognitoService.signIn(email, password);
  }

  async verifyMFASetup(session: string, totpCode: string, email: string) {
    const result = await this.cognitoService.verifyMFASetup(session, totpCode, email);
    const userId = result.userId;
    const tenantId = result.tenantId;
    delete  result.userId
    delete  result.tenantId
    
    // Create user-tenant mapping in the central database
    if (userId && tenantId) {
      await this.userTenantMapService.createUserTenantMapping(tenantId, userId);
    }

    // Add the user to default user group - "read-only"
    await this.assignDefaultRole(email)

    return result;

  }

  // async completeMfaSetup(session: string, totpCode: string, email: string) {
  //   return this.cognitoService.completeMfaSetup(session, totpCode, email);
  // }

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
    // Default role is typically "read-only"
    await this.rbacService.assignRoleToUser(email, 'read-only');
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