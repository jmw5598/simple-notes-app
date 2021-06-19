import { IsNotEmpty } from 'class-validator';
import { Plan } from '../../plans/entities/plan.entity';

export class CreateAccountDto {
  @IsNotEmpty()
  public plan: Plan;

  public isConfirmed: boolean;
  public isEnabled: boolean;
}