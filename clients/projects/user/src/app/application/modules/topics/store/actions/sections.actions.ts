import { createAction, props } from '@ngrx/store';
import { Page, PageableSearch, ResponseMessage, Section } from '@sn/shared/models';

export const getSectionById = createAction(
  '[Section] Get Section By Id',
  props<{ topicId: number, sectionId: number}>()
);

export const setSelectedSection = createAction(
  '[Section] Set Selected Section',
  props<{ section: Section }>()
);

export const createSection = createAction(
  '[Section] Create Section',
  props<{ topicId: number, section: Section }>()
);

export const createSectionSuccess = createAction(
  '[Section] Create Section Success',
  props<{ section: Section }>()
);

export const deleteSection = createAction(
  '[Section] Delete Section',
  props<{ topicId: number, sectionId: number }>()
);

export const deleteSectionSuccess = createAction(
  '[Section] Delete Section Success',
  props<{ section: Section }>()
);

export const updateSection = createAction(
  '[Section] Update Section',
  props<{
    topicId: number, 
    sectionId: number, 
    section: Section
  }>()
);

export const updateSectionSuccess = createAction(
  '[Section] Update Section Success',
  props<{ section: Section }>()
);

export const updateSectionNotes = createAction(
  '[Section] Update Section Notes',
  props<{
    topicId: number,
    sectionId: number,
    notes: string
  }>()
)

export const setCreateSectionResponseMessage = createAction(
  '[Section] Set Create Section Response Message',
  props<{ message: ResponseMessage }>()
);

export const setUpdateSectionResponseMessage = createAction(
  '[Section] Set Update Section Response Message',
  props<{ message: ResponseMessage }>()
);

export const setUpdateSectionNotesResponseMessage = createAction(
  '[Section] Set Update Section Notes Response Message',
  props<{ message: ResponseMessage }>()
);

export const searchSections = createAction(
  '[Section] Search Sections',
  props<{ topicId: number, search: PageableSearch }>()
);

export const searchSectionsResult = createAction(
  '[Section] Search Section Result',
  props<{ page: Page<Section> }>()
);
