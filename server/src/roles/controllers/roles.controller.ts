import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAdminRoleGuard } from 'src/authentication/guards/jwt-admin-role.guard';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { RoleDto } from '../dtos/role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { RolesService } from '../services/roles.service';

@Controller('roles')
// @UseGuards(JwtAuthenticationGuard, JwtAdminRoleGuard)
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

  @Get('active')
  public async getActiveRoles(): Promise<RoleDto[]> {
    try {
      return this._rolesService.getActiveRoles();
    } catch (error) {
      this._logger.error(`Error getting active roles! `, error);
      throw error;
    }
  }

  @Post()
  public async createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    try {
      return this._rolesService.createRole(createRoleDto);
    } catch (error) {
      this._logger.error(`Error creating role`, error);
      throw error;
    }
  }

  @Put(':id')
  public async updateRoleById(@Param('id') roleId: number, @Body() updateRoleDto: UpdateRoleDto): Promise<RoleDto> {
    try {
      return this._rolesService.updateRoleById(roleId, updateRoleDto);
    } catch (error) {
      this._logger.error(`Error updating role`, error);
      throw error;
    }
  }

  @Delete(':id')
  public async deleteRoleById(@Param('id') roleId: number): Promise<RoleDto> {
    try {
      return this._rolesService.deleteRoleById(roleId);
    } catch (error) {
      this._logger.error(`Error deleting role`, error);
      throw error;
    }
  }
}
