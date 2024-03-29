import { createAction, props } from '@ngrx/store';
import { 
  Document, 
  DocumentMarkdown, 
  ExportConfig, 
  FileResponse, 
  Section, 
  Topic,
  DocumentTopicSection,
  DocumentTopic,
  Page,
  PageableSearch,
  ResponseMessage } from '@sn/shared/models';

export const createDocument = createAction(
  '[Document] Create Document',
  props<{ document: Document }>()
);

export const createDocumentSuccess = createAction(
  '[Document] Create Document Success',
  props<{ document: Document }>()
);

export const setCreateDocumentResponseMessage = createAction(
  '[Document] Set Create Document Response Message ',
  props<{ message: ResponseMessage }>()
);

export const updateDocument = createAction(
  '[Document] Update Document',
  props<{ id: number, document: Document }>()
);

export const updateDocumentSuccess = createAction(
  '[Document] Update Document Success',
  props<{ document: Document }>()
);

export const setUpdateDocumentResponseMessage = createAction(
  '[Document] Update Document Response Message',
  props<{ message: ResponseMessage }>()
);

export const deleteDocument = createAction(
  '[Document] Delete Document',
  props<{ id: number }>()
);

export const deleteDocumentSuccess = createAction(
  '[Document] Delete Documnet Success',
  props<{ document: Document }>()
);

export const setDeleteDocumentResponseMessage = createAction(
  '[Document] Delete Document Response Message',
  props<{ message: ResponseMessage }>()
);

export const getDocumentById = createAction(
  '[Document] Get Document By Id',
  props<{ documentId: number }>()
);

export const getDocumentByIdSuccess = createAction(
  '[Document] Get Document By Id Succes',
  props<{ document: Document }>()
);

export const searchDocuments = createAction(
  '[Document] Search Documents',
  props<{ search: PageableSearch }>()
);

export const searchDocumentsResult = createAction(
  '[Document] Search Documents Result',
  props<{ page: Page<Document> }>()
);

export const setSearchDocumentsSelection = createAction(
  '[Document] Search Documents Selection',
  props<{ document: Document }>()
);

export const searchTopics = createAction(
  '[Document] Search Topics',
  props<{ search: PageableSearch }>()
);

export const searchTopicsResult = createAction(
  '[Document] Search Topics Result',
  props<{ page: Page<Topic> }>()
);

export const getSectionsByTopicId = createAction(
  '[Document] Get Sections By Topic By Id',
  props<{ topicId: number }>()
);

export const getSectionsByTopicIdSuccess = createAction(
  '[Document] Get Sections By Topic By Id Success',
  props<{ sections: Section[] }>()
);

export const createNewBuilderDocument = createAction(
  '[Document] Create New Builder Document'
);

export const setBuilderDocument = createAction(
  '[Document] Set Builder Document',
  props<{ document: Document }>()
);

export const removeBuilderTopic = createAction(
  '[Document] Remove Builder Topic',
  props<{ topicId: number }>()  
);

export const removeBuilderSection = createAction(
  '[Document] Remove Builder Section',
  props<{ topicId: number, sectionId: number }>()
);

export const setBuilderTopics = createAction(
  '[Document] Set Builder Topics',
  props<{ documentTopics: DocumentTopic[] }>()
);

export const setBuilderTopicSections = createAction(
  '[Document] Set Builder Topic Sections',
  props<{ topicId: number, documentTopicSections: DocumentTopicSection[] }>()
);

export const setBuilderSearchTopicSelection = createAction(
  '[Document] Set Builder Search Topic Selection',
  props<{ documentTopic: DocumentTopic }>()
);

export const getDocumentMarkdownPreviewById = createAction(
  '[Document] Set Document Markdown Preview By Id',
  props<{ documentId: number }>()
);

export const setDocumentMarkdownPreview = createAction(
  '[Document] Set Document Markdown Preview',
  props<{ documentMarkdown: DocumentMarkdown }>()
);

export const exportDocument = createAction(
  '[Document] Export Document By Id',
  props<{ documentId: number, config: ExportConfig }>()
);

export const exportDocumentSuccess = createAction(
  '[Document] Export Document Success',
  props<{ file: FileResponse }>()
);

export const setExportDocumentResponseMessage = createAction(
  '[Document] Export Document Response Message',
  props<{ message: ResponseMessage }>()
);

export const setExportDocumentFileResponse = createAction(
  '[Document] Export Document File Response',
  props<{ file: FileResponse }>()
);
