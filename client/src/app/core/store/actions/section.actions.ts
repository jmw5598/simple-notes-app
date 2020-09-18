import { createAction, props } from '@ngrx/store';
import { Section } from '@sn/shared/models';

export enum SectionActions {
  GET_SECTION_BY_ID = '[Section] Get Section By Id',
  SET_SELECTED_SECTION = '[Section] Set Selected Section',
  CREATE_SECTION = '[Section] Create Section',
  CREATE_SECTION_SUCCESS = '[Section] Create Section Success',
  DELETE_SECTION = '[Section] Delete Section',
  DELETE_SECTION_SUCCESS = '[Section] Delete Section Success',
  UPDATE_SECTION = '[Section] Update Section',
  UPDATE_SECTION_SUCCESS = '[Section] Update Section Success',
}

export const getSectionById = createAction(
  SectionActions.GET_SECTION_BY_ID,
  props<{ id: number}>()
);

export const setSelectedSection = createAction(
  SectionActions.SET_SELECTED_SECTION,
  props<{ section: Section }>()
);

export const createSection = createAction(
  SectionActions.CREATE_SECTION,
  props<{ topicId: number, section: Section }>()
);

export const createSectionSuccess = createAction(
  SectionActions.CREATE_SECTION_SUCCESS,
  props<{ section: Section }>()
);

export const deleteSection = createAction(
  SectionActions.DELETE_SECTION,
  props<{ id: number }>()
);

export const deleteSectionSuccess = createAction(
  SectionActions.DELETE_SECTION_SUCCESS,
  props<{ section: Section }>()
);

export const updateSection = createAction(
  SectionActions.UPDATE_SECTION,
  props<{ id: number, section: Section }>()
);

export const updateSectionSuccess = createAction(
  SectionActions.UPDATE_SECTION_SUCCESS,
  props<{ section: Section }>()
);
