import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialDocumentEntityAndItsRelations1601334486196 implements MigrationInterface {
    name = 'InitialDocumentEntityAndItsRelations1601334486196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "document" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "account_id" integer, CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "document_section" ("documentId" integer NOT NULL, "sectionId" integer NOT NULL, CONSTRAINT "PK_adafef0153c385174bdbeed7aac" PRIMARY KEY ("documentId", "sectionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8547eb4b9dd254b5d9708e85d8" ON "document_section" ("documentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f9546fb721a0b8605794586d03" ON "document_section" ("sectionId") `);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_a05e62b6b25192e8ff52fd197ed" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_section" ADD CONSTRAINT "FK_8547eb4b9dd254b5d9708e85d8c" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_section" ADD CONSTRAINT "FK_f9546fb721a0b8605794586d033" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_section" DROP CONSTRAINT "FK_f9546fb721a0b8605794586d033"`);
        await queryRunner.query(`ALTER TABLE "document_section" DROP CONSTRAINT "FK_8547eb4b9dd254b5d9708e85d8c"`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_a05e62b6b25192e8ff52fd197ed"`);
        await queryRunner.query(`DROP INDEX "IDX_f9546fb721a0b8605794586d03"`);
        await queryRunner.query(`DROP INDEX "IDX_8547eb4b9dd254b5d9708e85d8"`);
        await queryRunner.query(`DROP TABLE "document_section"`);
        await queryRunner.query(`DROP TABLE "document"`);
    }

}
