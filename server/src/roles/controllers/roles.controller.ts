import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAdminRoleGuard } from 'src/authentication/guards/jwt-admin-role.guard';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { RoleDto } from '../dtos/role.dto';
import { RolesService } from '../services/roles.service';

@Controller('roles')
@UseGuards(JwtAuthenticationGuard, JwtAdminRoleGuard)
export class RolesController {
  constructor(
    private readonly _logger: SnLoggerService,
    private readonly _rolesService: RolesService 
  ) {
    this._logger.setContext(this.constructor.name);
  }

  @Get()
  public async getAllRoles(): Promise<RoleDto[]> {
    try {
      return this._rolesService.getAllRoles();
    } catch (error) {
      this._logger.error(`Error getting roles! `, error);
      throw error;
    }
  }

  // @Post()
  // public async createRole(): Promise<RoleDto> {
  //   try {
  //     return this._rolesService.createRole();
  //   } catch (error) {
  //     this._logger.error(`Error creating role`, error);
  //     throw error;
  //   }
  // }

  // @Put(':id')
  // public async updateRoleById(): Promise<RoleDto> {
  //   try {
  //     return this._rolesService.updateRoleById();
  //   } catch (error) {
  //     this._logger.error(`Error updating role`, error);
  //     throw error;
  //   }
  // }

  // @Delete(':id')
  // public async updateRoleById(): Promise<RoleDto> {
  //   try {
  //     return this._rolesService.deleteRoleById();
  //   } catch (error) {
  //     this._logger.error(`Error deleting role`, error);
  //     throw error;
  //   }
  // }

  // TODO :id - PUT - update role
  // TODO  - POST - create role
  // TODO :id - DELETE - delete role;
}
