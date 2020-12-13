import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Raw } from 'typeorm';
import { CreateSectionDto } from '../dtos/create-section.dto';
import { Section } from '../entities/section.entity';
import { SectionDto } from '../dtos/section.dto';
import { SectionMapper } from '../mappers/section.mapper';
import { Topic } from '../entities/topic.entity';
import { TopicNotFoundException } from '../exceptions/topic-not-found.exception';
import { SectionNotFoundException } from '../exceptions/section-not-found.exception';
import { UpdateSectionDto } from '../dtos/update-section.dto';
import { UpdateSectionNotesDto } from '../dtos/update-section-notes.dto';
import { IPageable } from '../../common/models/pageable.interface';
import { Page } from '../../common/models/page.model';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Topic)
    private readonly _topicsRepository: Repository<Topic>,
    @InjectRepository(Section)
    private readonly _sectionsRepository: Repository<Section>
  ) { }

  public async createSection(accountId: number, topicId: number, createSectionDto: CreateSectionDto): Promise<SectionDto> {
    const topic: Topic = await this._topicsRepository.findOne({
      id: topicId,
      account: { id: accountId }
    });

    if (!topic) throw new TopicNotFoundException();
    topic.updatedAt = new Date();
    this._topicsRepository.save(topic);

    const section: Section = await this._sectionsRepository.save(
      this._sectionsRepository.create({
        ...createSectionDto,
        topic: { id: topicId }
      })
    );
    return SectionMapper.toSectionDto(section);
  }

  public async updateSectionById(
    accountId: number, topicId: number, sectionId: number, 
    updateSectionDto: UpdateSectionDto): Promise<SectionDto> {
      const section: Section = await this._getSectionById(accountId, topicId, sectionId);
      section.title = updateSectionDto.title;
      section.synopsis = updateSectionDto.synopsis;
      section.updatedAt = new Date();
      return SectionMapper.toSectionDto(await this._sectionsRepository.save(section));
  }

  public async deleteSectionById(accountId: number, topicId: number, sectionId: number): Promise<SectionDto> {
    const section: Section = await this._sectionsRepository.findOne({
      id: sectionId,
      topic: {
        id: topicId,
        account: { id: accountId }
      }
    }); 
    if (!section) throw new SectionNotFoundException();
    section.deletedAt = new Date();
    return SectionMapper.toSectionDto(await this._sectionsRepository.save(section));
  }

  public async getSectionsByTopicId(accountId: number, topicId: number): Promise<SectionDto[]> {
    const sections: Section[] = await this._sectionsRepository.find({
      select: ['id', 'title', 'synopsis', 'createdAt', 'updatedAt'],
      where: {
        topic: {
          id: topicId,
          account: { id: accountId },
        }, 
        deletedAt: IsNull()
      },
      order: { createdAt: 'ASC' }
    });
    return SectionMapper.toSectionDtoList(sections);
  }

  public async getSectionById(accountId: number, topicId: number, sectionId: number): Promise<SectionDto> {
    const section: Section = await this._getSectionById(accountId, topicId, sectionId);
    return SectionMapper.toSectionDto(section);
  }

  public async updateSectionNotesById(
      accountId: number, updateSectionNotesDto: UpdateSectionNotesDto): Promise<SectionDto> {
    const topic: Topic = await this._topicsRepository.findOne({
      id: updateSectionNotesDto.topicId,
      account: { id: accountId }
    });

    if (!topic) throw new TopicNotFoundException();
    topic.updatedAt = new Date();
    this._topicsRepository.save(topic);

    const section: Section = await this._sectionsRepository.findOne({
      id: updateSectionNotesDto.sectionId,
      topic: {
        id: updateSectionNotesDto.topicId,
        account: { id: accountId }
      }
    })

    if (!section) throw new SectionNotFoundException();
    section.notes = updateSectionNotesDto.notes;
    section.updatedAt = new Date();

    return SectionMapper.toSectionDto(await this._sectionsRepository.save(section));
  }

  public async searchSections(accountId: number, topicId: number, searchTerm: string, pageable: IPageable): Promise<Page<SectionDto>> {
    const sort: {[key: string]: string} = pageable.getSort().asKeyValue();
    const where = await this._generateSearchWhereClause(accountId, topicId, searchTerm);
    const result = await this._sectionsRepository.findAndCount({
      relations: ['topic', 'topic.account'],
      where: where,
      order: sort,
      skip: ((pageable.getPageNumber() - 1) * pageable.getPageSize()),
      take: pageable.getPageSize(),
      select: ['id', 'title', 'synopsis', 'createdAt', 'updatedAt']
    });
    const elements: SectionDto[] = SectionMapper.toSectionDtoList(result[0]);
    const totalElements: number = result[1];
    return this._generatePageResult(elements, totalElements, pageable);
  }

  private async _getSectionById(accountId: number, topicId: number, sectionId: number): Promise<Section> {
    const section: Section = await this._sectionsRepository.findOne({
      id: sectionId,
      topic: {
        id: topicId,
        account: { id: accountId }
      }
    });
    if (!section) throw new SectionNotFoundException();
    return section;
  }

  private async _generateSearchWhereClause(accountId: number, topicId: number, searchTerm: string): Promise<any> {
    const ilike = Raw(alias => `${alias} ILIKE '%${searchTerm.replace("/\s/g", "%")}%'`)
    return [
      { 
        title: ilike, 
        topic: { id: topicId, account: { id: accountId } }, 
        deletedAt: IsNull() 
      },
      { 
        synopsis: ilike, 
        topic: { id: topicId, account: { id: accountId } }, 
        deletedAt: IsNull() 
      }
    ];
  }

  private async _generatePageResult(elements: SectionDto[], totalElements: number, pageable: IPageable): Promise<Page<SectionDto>> {
    return {
      elements: elements, 
      totalElements: totalElements, 
      totalPages: Math.ceil(totalElements / pageable.getPageSize()),
      current: pageable,
      next: pageable.next(totalElements),
      previous: pageable.previous(totalElements)
    } as Page<SectionDto>;
  }
}
