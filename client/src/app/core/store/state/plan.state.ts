import { Plan } from '@sn/core/models'; 

export interface IPlanState {
  plans: Plan[]
};

export const initialPlanState: IPlanState = {
  plans: null
};
