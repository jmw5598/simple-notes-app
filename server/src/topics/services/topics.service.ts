import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CreateTopicDto } from '../dtos/create-topic.dto';
import { Topic } from '../entities/topic.entity';
import { TopicDto } from '../dtos/topic.dto';
import { TopicMapper } from '../mappers/topic.mapper';
import { UpdateTopicDto } from '../dtos/update-topic.dto';
import { TopicNotFoundException } from '../exceptions/topic-not-found.exception';
import { TopicsController } from '../controllers/topics.controller';

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
}
