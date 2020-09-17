import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTopicDto } from '../dtos/create-topic.dto';
import { Topic } from '../entities/topic.entity';
import { TopicDto } from '../dtos/topic.dto';
import { TopicMapper } from '../mappers/topic.mapper';
import { UpdateTopicDto } from '../dtos/update-topic.dto';
import { TopicNotFoundException } from '../exceptions/topic-not-found.exception';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly _topicsRepository: Repository<Topic>
  ) { }

  public async getAllTopics(accountId: number): Promise<TopicDto[]> {
    const topics: Topic[] = await this._topicsRepository.find({
      account: { id: accountId }
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
      where: {
        id: topicId,
        account: { id: accountId }
      }
    });
    topic.title = updateTopicDto.title;
    topic.synopsis = updateTopicDto.synopsis;
    return TopicMapper.toTopicDto(await this._topicsRepository.save(topic));
  }
}
