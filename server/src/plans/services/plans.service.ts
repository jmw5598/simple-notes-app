import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreatePlanDto } from '../dtos/create-plan.dto';
import { PlanDto } from '../dtos/plan.dto';
import { UpdatePlanDto } from '../dtos/update-plan.dt';
import { Plan } from '../entities/plan.entity';
import { PlanNotFoundException } from '../exceptions/plan-note-found.exception';
import { PlansMapper } from '../mappers/plans.mapper';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private readonly _plansRepository: Repository<Plan>
  ) {}

  public async getAllPlans(): Promise<PlanDto[]> {
    const plans: Plan[] = await this._plansRepository.find();
    if (!plans) throw new PlanNotFoundException();
    return PlansMapper.toPlanDtoList(plans);
  }

  public async getActivePlans(): Promise<PlanDto[]> {
    const roles: Plan[] = await this._plansRepository.find({ deletedAt: IsNull() })
    if (!roles) throw new PlanNotFoundException();
    return PlansMapper.toPlanDtoList(roles);
  }

  public async createPlan(createPlanDto: CreatePlanDto): Promise<PlanDto> {
    const role: Plan = this._plansRepository.create({
      name: createPlanDto.name
    });
    return PlansMapper.toPlanDto(
      await this._plansRepository.save(role)
    );
  }

  public async updatePlanById(roleId: number, updatePlanDto: UpdatePlanDto): Promise<PlanDto> {
    const existingPlan: Plan = await this._plansRepository.findOne({ id: roleId });
    
    if (!existingPlan) throw new PlanNotFoundException();

    existingPlan.name = updatePlanDto.name;

    return PlansMapper.toPlanDto(
      await this._plansRepository.save(existingPlan)
    );
  }

  public async deletePlanById(roleId: number): Promise<PlanDto> {
    const existingPlan: Plan = await this._plansRepository.findOne({ id: roleId });
    
    if (!existingPlan) throw new PlanNotFoundException();

    existingPlan.deletedAt = new Date();

    return PlansMapper.toPlanDto(
      await this._plansRepository.save(existingPlan)
    );
  }

  public async undeletePlanById(roleId: number): Promise<PlanDto> {
    const existingPlan: Plan = await this._plansRepository.findOne({ id: roleId });
    
    if (!existingPlan) throw new PlanNotFoundException();

    existingPlan.deletedAt = null;

    return PlansMapper.toPlanDto(
      await this._plansRepository.save(existingPlan)
    );
  }
}
