import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTablesForDocumentBuilder1618573606302 implements MigrationInterface {
    name = 'CreateTablesForDocumentBuilder1618573606302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "document_topic_section" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "document_topic_id" integer NOT NULL, "section_id" integer NOT NULL, CONSTRAINT "PK_362aff55108f2ba8afa740e9dd1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "document_topic" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "document_id" integer NOT NULL, "topic_id" integer NOT NULL, CONSTRAINT "PK_15868309fec1c4fcb4ad80304f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "document_topic_section" ADD CONSTRAINT "FK_5c73103255715df78787b650671" FOREIGN KEY ("document_topic_id") REFERENCES "document_topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_topic_section" ADD CONSTRAINT "FK_2d261436c4445e40567e741fc16" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_topic" ADD CONSTRAINT "FK_c2c16f8e10d59edfec15b4f2fb9" FOREIGN KEY ("document_id") REFERENCES "document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_topic" ADD CONSTRAINT "FK_5068f0ef16500397a1d0cafa2a8" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_topic" DROP CONSTRAINT "FK_5068f0ef16500397a1d0cafa2a8"`);
        await queryRunner.query(`ALTER TABLE "document_topic" DROP CONSTRAINT "FK_c2c16f8e10d59edfec15b4f2fb9"`);
        await queryRunner.query(`ALTER TABLE "document_topic_section" DROP CONSTRAINT "FK_2d261436c4445e40567e741fc16"`);
        await queryRunner.query(`ALTER TABLE "document_topic_section" DROP CONSTRAINT "FK_5c73103255715df78787b650671"`);
        await queryRunner.query(`DROP TABLE "document_topic"`);
        await queryRunner.query(`DROP TABLE "document_topic_section"`);
    }

}
