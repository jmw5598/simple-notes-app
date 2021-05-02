import {MigrationInterface, QueryRunner} from "typeorm";

export class AddsOrderIndexColumnToDocumentTopicAndSectionEntities1619954314991 implements MigrationInterface {
    name = 'AddsOrderIndexColumnToDocumentTopicAndSectionEntities1619954314991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_topic_section" ADD "order_index" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document_topic" ADD "order_index" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_topic" DROP COLUMN "order_index"`);
        await queryRunner.query(`ALTER TABLE "document_topic_section" DROP COLUMN "order_index"`);
    }

}
