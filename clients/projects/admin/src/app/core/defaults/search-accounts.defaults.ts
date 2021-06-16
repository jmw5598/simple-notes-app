import { IPageable, PageRequest } from '@sn/shared/models';

export const DEFAULT_SEARCH_ACCOUNTS_PAGE: IPageable = PageRequest.from(1, 10, 'updatedAt', 'DESC');
