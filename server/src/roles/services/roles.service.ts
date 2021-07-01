import { Injectable } from '@nestjs/common';
import { Role } from '../../users/entities/role.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleNotFoundException } from '../exceptions/role-not-found.exception';
import { RolesMapper } from '../mappers/roles.mapper';
import { RoleDto } from '../dtos/role.dto';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly _rolesRepository: Repository<Role>
  ) {}

  public async getAllRoles(): Promise<RoleDto[]> {
    const roles: Role[] = await this._rolesRepository.find();
    if (!roles) throw new RoleNotFoundException();
    return RolesMapper.toRoleDtoList(roles);
  }

  public async getActiveRoles(): Promise<RoleDto[]> {
    const roles: Role[] = await this._rolesRepository.find({ deletedAt: IsNull() })
    if (!roles) throw new RoleNotFoundException();
    return RolesMapper.toRoleDtoList(roles);
  }

  public async createRole(createRoleDto: CreateRoleDto): Promise<RoleDto> {
    const role: Role = this._rolesRepository.create({
      name: `ROLE_${createRoleDto?.name?.split(' ').join('_').toUpperCase()}`
    });
    return RolesMapper.toRoleDto(
      await this._rolesRepository.save(role)
    );
  }

  public async updateRoleById(roleId: number, updateRoleDto: UpdateRoleDto): Promise<RoleDto> {
    const existingRole: Role = await this._rolesRepository.findOne({ id: roleId });
    
    if (!existingRole) throw new RoleNotFoundException();

    const roleMinusPrefix = updateRoleDto.name.split('ROLE_').join();

    existingRole.name = (`ROLE_${roleMinusPrefix.split(' ').join('_').toUpperCase()}`).replace(/[^A-Z0-9\_]/g, '');

    return RolesMapper.toRoleDto(
      await this._rolesRepository.save(existingRole)
    );
  }

  public async deleteRoleById(roleId: number): Promise<RoleDto> {
    const existingRole: Role = await this._rolesRepository.findOne({ id: roleId });
    
    if (!existingRole) throw new RoleNotFoundException();

    existingRole.deletedAt = new Date();

    return RolesMapper.toRoleDto(
      await this._rolesRepository.save(existingRole)
    );
  }

  public async undeleteRoleById(roleId: number): Promise<RoleDto> {
    const existingRole: Role = await this._rolesRepository.findOne({ id: roleId });
    
    if (!existingRole) throw new RoleNotFoundException();

    existingRole.deletedAt = null;

    return RolesMapper.toRoleDto(
      await this._rolesRepository.save(existingRole)
    );
  }
}
