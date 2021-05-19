import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from 'src/common/models/page.model';
import { IPageable } from 'src/common/models/pageable.interface';
import { IsNull, Raw, Repository } from 'typeorm';
import { CreateFlashcardSetDto } from '../dtos/create-flashcard-set.dto';
import { CreateFlashcardDto } from '../dtos/create-flashcard.dto';
import { FlashcardSetDto } from '../dtos/flashcard-set.dto';
import { UpdateFlashcardSetDto } from '../dtos/update-flashcard-set.dto';
import { FlashcardSet } from '../entities/flashcard-set.entity';
import { Flashcard } from '../entities/flashcard.entity';
import { FlashcardSetNotFoundException } from '../exceptions/flashcard-set-not-found.exception';
import { FlashcardSetMapper } from '../mappers/flashcard-set.mapper';

@Injectable()
export class FlashcardsService {
  constructor(
    @InjectRepository(FlashcardSet)
    private _flashcardSetRepository: Repository<FlashcardSet>,
    @InjectRepository(Flashcard)
    private _flashcardRepository: Repository<Flashcard>
  ) {}

  public async searchFlashcardSets(accountId: number, searchTerm: string, pageable: IPageable): Promise<Page<FlashcardSetDto>> {
    const sort: {[key: string]: string} = pageable.getSort().asKeyValue();
    const where = await this._generateSearchWhereClause(accountId, searchTerm);
    const result = await this._flashcardSetRepository.findAndCount({
      relations: ['flashcards'],
      where: where,
      order: sort,
      skip: ((pageable.getPageNumber() - 1) * pageable.getPageSize()),
      take: pageable.getPageSize()
    });
    const elements: FlashcardSetDto[] = FlashcardSetMapper.toFlashcardSetDtoList(result[0]);
    const totalElements: number = result[1];
    return this._generatePageResult(elements, totalElements, pageable);
  }

  public async getFlashcardSetById(accountId: number, flashcardSetId: number): Promise<FlashcardSetDto> {
    const flashcardSet:  FlashcardSet = await this._flashcardSetRepository.createQueryBuilder('fcs')
      .innerJoin('fcs.account', 'account')
      .leftJoinAndSelect('fcs.flashcards', 'fc')
      .where('account.id = :accountId', { accountId: accountId })
      .andWhere('fcs.id = :flashcardSetId', { flashcardSetId: flashcardSetId })
      .orderBy({
        'fc.orderIndex': 'ASC'
      }).getOne()
    if (!flashcardSet) throw new FlashcardSetNotFoundException();
    return FlashcardSetMapper.toFlashcardSetDto(flashcardSet, true);
  }
  
  public async createFlashcardSet(accountId: number, createFlashcardSetDto: CreateFlashcardSetDto): Promise<FlashcardSetDto> {
    const flashcardSet: FlashcardSet = await this._flashcardSetRepository.save(
      this._flashcardSetRepository.create({
        title: createFlashcardSetDto.title,
        synopsis: createFlashcardSetDto.synopsis,
        account: { id: accountId },
        flashcards: createFlashcardSetDto.flashcards.map((createFlashcardDto: CreateFlashcardDto, index: number) => ({
          orderIndex: index,
          frontContent: createFlashcardDto.frontContent,
          backContent: createFlashcardDto.backContent
        }))
      })
    );
    return FlashcardSetMapper.toFlashcardSetDto(flashcardSet);
  }

  public async deleteFlashcardSetById(accountId: number, flashcardSetId: number): Promise<FlashcardSetDto> {
    const flashcardSet: FlashcardSet = await this._flashcardSetRepository.findOne({
      relations: ['flashcards'],
      where: {
        id: flashcardSetId,
        account: { id: accountId }
      }
    });

    if (!flashcardSet) throw new FlashcardSetNotFoundException();

    const now: Date = new Date();
    flashcardSet.deletedAt = now;
    flashcardSet.flashcards.forEach((flashcard: Flashcard) => flashcard.deletedAt = now);
    
    return FlashcardSetMapper.toFlashcardSetDto(
      await this._flashcardSetRepository.save(flashcardSet)
    );
  }

  public async updateFlashcardSetById(accountId: number, flashcardSetId: number, updateFlashcardSetDto: UpdateFlashcardSetDto): Promise<FlashcardSetDto> {
    const flashcardSet: FlashcardSet = await this._flashcardSetRepository.findOne({
      relations: ['flashcards'],
      where: {
        id: flashcardSetId,
        account: { id: accountId }
      }
    });

    if (!flashcardSet) throw new FlashcardSetNotFoundException();

    flashcardSet.title = updateFlashcardSetDto.title;
    flashcardSet.synopsis = updateFlashcardSetDto.synopsis;
    flashcardSet.updatedAt = new Date();

    flashcardSet.flashcards = updateFlashcardSetDto.flashcards.map((flashcard, fcOrderIndex) => {
      return this._flashcardRepository.create({
        ...flashcard,
        orderIndex: fcOrderIndex
      })
    });

    return FlashcardSetMapper.toFlashcardSetDto(
      await this._flashcardSetRepository.save(flashcardSet)
    );
  }

  private async _generateSearchWhereClause(accountId: number, searchTerm: string): Promise<any> {
    const ilike = Raw(alias => `${alias} ILIKE '%${searchTerm.replace("/\s/g", "%")}%'`)
    return [
      { title: ilike, account: { id: accountId }, deletedAt: IsNull() }
    ];
  }

  private async _generatePageResult(elements: FlashcardSetDto[], totalElements: number, pageable: IPageable): Promise<Page<FlashcardSetDto>> {
    return {
      elements: elements, 
      totalElements: totalElements, 
      totalPages: Math.ceil(totalElements / pageable.getPageSize()),
      current: pageable,
      next: pageable.next(totalElements),
      previous: pageable.previous(totalElements)
    } as Page<FlashcardSetDto>;
  }
}
