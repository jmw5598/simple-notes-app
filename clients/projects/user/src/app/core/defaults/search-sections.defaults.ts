import { IPageable, PageRequest } from '@sn/shared/models';

export const DEFAULT_SEARCH_SECTIONS_PAGE: IPageable = PageRequest.from(1, 10, 'createdAt', 'ASC');
