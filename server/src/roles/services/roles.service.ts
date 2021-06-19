import { Injectable } from '@nestjs/common';
import { Role } from '../../users/entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEventNotFoundException } from '../exceptions/role-not-found.exception';
import { RolesMapper } from '../mappers/roles.mapper';
import { RoleDto } from '../dtos/role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly _rolesRepository: Repository<Role>
  ) {}

  public async getAllRoles(): Promise<RoleDto[]> {
    const roles: Role[] = await this._rolesRepository.find();
    if (!roles) throw new RoleEventNotFoundException();
    return RolesMapper.toRoleDtoList(roles);
  }

  // public async createRole(): Promise<RoleDto> {

  // }

  // public async updateRoleById(roleId: number): Promise<RoleDto> {

  // }

  // public async deleteRoleById(roleId: number): Promise<RoleDto> {

  // }
}
