import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSectionDto } from '../dtos/create-section.dto';
import { Section } from '../entities/section.entity';
import { SectionDto } from '../dtos/section.dto';
import { SectionMapper } from '../mappers/section.mapper';
import { Topic } from '../entities/topic.entity';
import { TopicNotFoundException } from '../exceptions/topic-not-found.exception';
import { SectionNotFoundException } from '../exceptions/section-not-found.exception';

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

    const section: Section = await this._sectionsRepository.save(
      this._sectionsRepository.create({
        ...createSectionDto,
        topic: { id: topicId }
      })
    );
    return SectionMapper.toSectionDto(section);
  }

  public async getSectionById(accountId: number, topicId: number, sectionId: number): Promise<SectionDto> {
    const section: Section = await this._sectionsRepository.findOne({
      id: sectionId,
      topic: {
        id: topicId,
        account: { id: accountId }
      }
    });
    if (!section) throw new SectionNotFoundException();
    return SectionMapper.toSectionDto(section);
  }
}
