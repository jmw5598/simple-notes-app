import { Plan } from "../entities/plan.entity";
import { PlanDto } from "../dtos/plan.dto";

export class PlansMapper {
  public static toPlanDto(plan: Plan): PlanDto {
    return {
      id: plan.id,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
      deletedAt: plan.deletedAt,
      name: plan.name
    } as PlanDto
  }

  public static toPlanDtoList(roles: Plan[]): PlanDto[] {
    return roles.map(plan => PlansMapper.toPlanDto(plan));
  }
}
