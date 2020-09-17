import { Section } from './section.model';

export class SectionResource {
  constructor(
    public section: Section,
    public _links: Object
  ) {}
}
