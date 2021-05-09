import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedFlashcardForeignKeyNamesToSnakeCase1620568017126 implements MigrationInterface {
    name = 'UpdatedFlashcardForeignKeyNamesToSnakeCase1620568017126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flashcard" DROP CONSTRAINT "FK_dc650d0e20ec765536cd36f27d7"`);
        await queryRunner.query(`ALTER TABLE "flashcard" RENAME COLUMN "flashcardSetId" TO "flashcard_set_id"`);
        await queryRunner.query(`ALTER TABLE "flashcard" ADD CONSTRAINT "FK_68b716742120c717878bae44e6b" FOREIGN KEY ("flashcard_set_id") REFERENCES "flashcard_set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flashcard" DROP CONSTRAINT "FK_68b716742120c717878bae44e6b"`);
        await queryRunner.query(`ALTER TABLE "flashcard" RENAME COLUMN "flashcard_set_id" TO "flashcardSetId"`);
        await queryRunner.query(`ALTER TABLE "flashcard" ADD CONSTRAINT "FK_dc650d0e20ec765536cd36f27d7" FOREIGN KEY ("flashcardSetId") REFERENCES "flashcard_set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
