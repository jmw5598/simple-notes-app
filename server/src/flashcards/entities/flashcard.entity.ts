import { BaseEntity } from "src/database/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { FlashcardSet } from "./flashcard-set.entity";

@Entity()
export class Flashcard extends BaseEntity {
  @Column({ name: 'front_content', nullable: false })
  public frontContent: string;

  @Column({ name: 'back_content', nullable: false })
  public backContent: string;

  @Column({ type: 'int', name: 'order_index', nullable: false })
  public orderIndex: number;

  @ManyToOne(type => FlashcardSet)
  @JoinColumn({ name: 'flashcard_set_id' })
  public flashcardSet: FlashcardSet;
}
