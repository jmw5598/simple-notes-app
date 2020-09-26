import { IPageable, PageRequest } from '../models';

export const DEFAULT_SEARCH_SECTIONS_PAGE: IPageable = PageRequest.from(1, 10, 'createdAt', 'ASC');
