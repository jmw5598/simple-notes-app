import { IPageable, PageRequest } from '../models';

export const DEFAULT_SEARCH_TOPICS_PAGE: IPageable = PageRequest.from(1, 10, 'updatedAt', 'DESC');
