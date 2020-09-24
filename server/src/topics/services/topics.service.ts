import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Raw } from 'typeorm';
import { CreateTopicDto } from '../dtos/create-topic.dto';
import { Topic } from '../entities/topic.entity';
import { TopicDto } from '../dtos/topic.dto';
import { TopicMapper } from '../mappers/topic.mapper';
import { UpdateTopicDto } from '../dtos/update-topic.dto';
import { TopicNotFoundException } from '../exceptions/topic-not-found.exception';
import { IPageable } from '../../common/models/pageable.interface';
import { Page } from '../../common/models/page.model';


@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly _topicsRepository: Repository<Topic>
  ) { }

  public async getAllTopics(accountId: number): Promise<TopicDto[]> {
    const topics: Topic[] = await this._topicsRepository.find({
      relations: ['account', 'account.user'],
      where: {
        account: { id: accountId },
        deletedAt: IsNull()
      },
      order: { updatedAt: 'DESC' }
    });
    return TopicMapper.toTopicDtoList(topics);
  }

  public async searchTopics(accountId: number, searchTerm: string, pageable: IPageable): Promise<Page<TopicDto>> {
    const sort: {[key: string]: string} = {
      updatedAt: 'DESC',
      ...pageable.getSort().asKeyValue()
    };
    sort
    const where = await this._generateSearchWhereClause(accountId, searchTerm);
    const result = await this._topicsRepository.findAndCount({
      relations: ['account', 'account.user'],
      where: where,
      order: sort,
      skip: ((pageable.getPageNumber() - 1) * pageable.getPageSize()),
      take: pageable.getPageSize()
    });
    const elements: TopicDto[] = TopicMapper.toTopicDtoList(result[0]);
    const totalElements: number = result[1];
    return this._generatePageResult(elements, totalElements, pageable);
  }

  public async createTopic(accountId: number, createTopicDto: CreateTopicDto): Promise<TopicDto> {
    const topic: Topic = await this._topicsRepository.save(
      this._topicsRepository.create({
        ...createTopicDto,
        account: { id: accountId }
      })
    );
    return TopicMapper.toTopicDto(topic);
  }

  public async updateTopic(accountId: number, topicId: number, updateTopicDto: UpdateTopicDto): Promise<TopicDto> {
    const topic: Topic = await this._topicsRepository.findOne({
      relations: ['account', 'account.user'],
      where: {
        id: topicId,
        account: { id: accountId }
      }
    });
    topic.title = updateTopicDto.title;
    topic.synopsis = updateTopicDto.synopsis;
    topic.permission = updateTopicDto.permission;
    topic.updatedAt = new Date();
    return TopicMapper.toTopicDto(await this._topicsRepository.save(topic));
  }

  public async deleteTopic(accountId: number, topicId: number): Promise<TopicDto> {
    const topic: Topic = await this._topicsRepository.findOne({ 
      id: topicId, 
      account: { id: accountId }
    });
    if (!topic) throw new TopicNotFoundException();
    topic.deletedAt = new Date();
    return TopicMapper.toTopicDto(await this._topicsRepository.save(topic));
  }

  public async getTopicById(accountId: number, topicId: number): Promise<TopicDto> {
    const topic: Topic = await this._topicsRepository.findOne({
      relations: ['account', 'account.user'],
      where: {
        id: topicId,
        account: { id: accountId }
      }
    });
    if (!topic) throw new TopicNotFoundException();
    return TopicMapper.toTopicDto(topic);
  }

  private async _generateSearchWhereClause(accountId: number, searchTerm: string): Promise<any> {
    const ilike = Raw(alias => `${alias} ILIKE '%${searchTerm.replace("/\s/g", "%")}%'`)
    return [
      { title: ilike, account: { id: accountId }, deletedAt: IsNull() },
      { synopsis: ilike, account: { id: accountId }, deletedAt: IsNull() }
    ];
  }

  private async _generatePageResult(elements: TopicDto[], totalElements: number, pageable: IPageable): Promise<Page<TopicDto>> {
    return {
      elements: elements, 
      totalElements: totalElements, 
      totalPages: Math.ceil(totalElements / pageable.getPageSize()),
      current: pageable,
      next: pageable.next(totalElements),
      previous: pageable.previous(totalElements)
    } as Page<TopicDto>;
  }
}
