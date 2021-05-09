import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOrderIndexColumnToFlashcardEntity1620571486771 implements MigrationInterface {
    name = 'AddOrderIndexColumnToFlashcardEntity1620571486771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flashcard" ADD "order_index" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flashcard" DROP COLUMN "order_index"`);
    }

}
