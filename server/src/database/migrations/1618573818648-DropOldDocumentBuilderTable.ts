import {MigrationInterface, QueryRunner} from "typeorm";

export class DropOldDocumentBuilderTable1618573818648 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE document_section`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "document_section" ("documentId" integer NOT NULL, "sectionId" integer NOT NULL, CONSTRAINT "PK_adafef0153c385174bdbeed7aac" PRIMARY KEY ("documentId", "sectionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8547eb4b9dd254b5d9708e85d8" ON "document_section" ("documentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f9546fb721a0b8605794586d03" ON "document_section" ("sectionId") `);
    }

}
