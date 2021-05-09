import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialFlashcardTables1620567830432 implements MigrationInterface {
    name = 'InitialFlashcardTables1620567830432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "flashcard" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "front_content" character varying NOT NULL, "back_content" character varying NOT NULL, "flashcardSetId" integer, CONSTRAINT "PK_e0aba0501d3bc532951efc9f791" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flashcard_set" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "synopsis" character varying NOT NULL, "account_id" integer, CONSTRAINT "PK_88b5ae86e5973e3580c1783f298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "flashcard" ADD CONSTRAINT "FK_dc650d0e20ec765536cd36f27d7" FOREIGN KEY ("flashcardSetId") REFERENCES "flashcard_set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flashcard_set" ADD CONSTRAINT "FK_6244e4bda48b15230267c54db63" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flashcard_set" DROP CONSTRAINT "FK_6244e4bda48b15230267c54db63"`);
        await queryRunner.query(`ALTER TABLE "flashcard" DROP CONSTRAINT "FK_dc650d0e20ec765536cd36f27d7"`);
        await queryRunner.query(`DROP TABLE "flashcard_set"`);
        await queryRunner.query(`DROP TABLE "flashcard"`);
    }

}
