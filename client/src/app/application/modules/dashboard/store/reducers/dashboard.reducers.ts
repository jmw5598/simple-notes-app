import { createReducer, on } from '@ngrx/store';
import { CalendarEvent } from '@sn/core/models';
import { TodoList, Topic } from '@sn/shared/models';

import * as fromActions from '../actions';

export const dashboardFeatureKey = 'dashboard';

export interface IDashboardState {
  todaysEvents: CalendarEvent[];
  recentTopics: Topic[];
  todaysTodoLists: TodoList[];
  pastDueTodoLists: TodoList[];
}

export const initialDashboardState: IDashboardState = {
  todaysEvents: null,
  recentTopics: null,
  todaysTodoLists: null,
  pastDueTodoLists: null
}

const _dashboardReducer = createReducer(
  initialDashboardState,
  on(fromActions.getRecentTopicsSuccess, (state, { topics }) => {
    return {
      ...state,
      recentTopics: topics
    }
  }),
  on(fromActions.getTodaysCalendarEventsSuccess, (state, { events }) => {
    return {
      ...state,
      todaysEvents: events
    }
  }),
  on(fromActions.getTodaysTodoListsSuccess, (state, { todoLists }) => {
    return {
      ...state,
      todaysTodoLists: todoLists
    }
  }),
  on(fromActions.getPastDueTodoListsSuccess, (state, { todoLists }) => {
    return {
      ...state,
      pastDueTodoLists: todoLists
    }
  }),
  // on(fromActions.updatePastDueTodoListSuccess, (state, { todoList }) => {
  //   return {
  //     ...state,
  //     pastDueTodoLists: state.pastDueTodoLists.map(t => {
  //       if (todoList.id === t.id) {
  //         return todoList
  //       }
  //       return t;
  //     })
  //   }
  // }),
  // on(fromActions.updateTodaysTodoListSuccess, (state, { todoList }) => {
  //   return {
  //     ...state,
  //     pastDueTodoLists: state.todaysTodoLists.map(t => {
  //       if (todoList.id === t.id) {
  //         return todoList
  //       }
  //       return t;
  //     })
  //   }
  // }),
);

export function dashboardReducer(state, action) {
  return _dashboardReducer(state, action);
}
