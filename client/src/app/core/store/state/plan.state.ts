import { Plan } from '@sn/core/models'; 

export const plansFeatureKey: string = 'plans';

export interface IPlanState {
  plans: Plan[]
};

export const initialPlanState: IPlanState = {
  plans: null
};
