import { Account } from "src/accounts/entities/account.entity";
import { BaseEntity } from "src/database/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { Flashcard } from './flashcard.entity';

@Entity({ name: 'flashcard_set' })
export class FlashcardSet extends BaseEntity {
  @Column({ name: 'title', nullable: false })
  public title: string;

  @Column({ name: 'synopsis', nullable: false })
  public synopsis: string;

  @OneToMany(
    type => Flashcard,
    flashcard => flashcard.flashcardSet,
    { cascade: true }
  )
  public flashcards: Flashcard[];

  @ManyToOne(type => Account)
  @JoinColumn({ name: 'account_id' })
  public account: Account;
}
