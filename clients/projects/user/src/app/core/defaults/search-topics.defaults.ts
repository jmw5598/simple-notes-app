import { IPageable, PageRequest } from '@sn/shared/models';

export const DEFAULT_SEARCH_TOPICS_PAGE: IPageable = PageRequest.from(1, 10, 'updatedAt', 'DESC');
