import { Body, CacheTTL, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAdminRoleGuard } from 'src/authentication/guards/jwt-admin-role.guard';
import { SnLoggerService } from 'src/logger/sn-logger.service';
import { CreatePlanDto } from '../dtos/create-plan.dto';
import { PlanDto } from '../dtos/plan.dto';
import { UpdatePlanDto } from '../dtos/update-plan.dt';

import { PlansService } from '../services/plans.service';

@Controller('plans')
export class PlansController {
  constructor(
    private readonly _logger: SnLoggerService,
    private readonly _plansService: PlansService
  ) {
    this._logger.setContext(this.constructor.name);
  }

  @Get()
  @CacheTTL(86400)
  public async getPlans(): Promise<PlanDto[]> {
    try {
      return this._plansService.getAllPlans();
    } catch (error) {
      this._logger.error(`Error getting plans`, error);
      throw error;
    }
  }

  @Get('active')
  public async getActivePlans(): Promise<PlanDto[]> {
    try {
      return this._plansService.getActivePlans();
    } catch (error) {
      this._logger.error(`Error getting active plans`, error);
      throw error;
    }
  }

  
  @Post()
  @UseGuards(JwtAdminRoleGuard)
  public async createRole(@Body() createPlanDto: CreatePlanDto): Promise<PlanDto> {
    try {
      return this._plansService.createPlan(createPlanDto);
    } catch (error) {
      this._logger.error(`Error creating plan`, error);
      throw error;
    }
  }

  
  @Put(':id')
  @UseGuards(JwtAdminRoleGuard)
  public async updateRoleById(@Param('id') planId: number, @Body() updatePlanDto: UpdatePlanDto): Promise<PlanDto> {
    try {
      return this._plansService.updatePlanById(planId, updatePlanDto);
    } catch (error) {
      this._logger.error(`Error updating plan`, error);
      throw error;
    }
  }

  
  @Delete(':id')
  @UseGuards(JwtAdminRoleGuard)
  public async deleteRoleById(@Param('id') planId: number): Promise<PlanDto> {
    try {
      return this._plansService.deletePlanById(planId);
    } catch (error) {
      this._logger.error(`Error deleting plan`, error);
      throw error;
    }
  }
}
