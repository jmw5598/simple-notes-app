import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatedInitialEntitiesForCategorySectionAndTopic1600276918602 implements MigrationInterface {
    name = 'CreatedInitialEntitiesForCategorySectionAndTopic1600276918602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "section" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "synopsis" character varying NOT NULL, "notes" text NOT NULL, "topic_id" integer, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topic" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "synopsis" character varying NOT NULL, "permission" character varying NOT NULL, "account_id" integer, CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topic_category" ("topic_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_cf3189cfb3433ba594ff7106ac6" PRIMARY KEY ("topic_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_050fb7fcabbd109227be88766b" ON "topic_category" ("topic_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0f9130851d3da68df3569dc4dc" ON "topic_category" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "FK_a44706d4357bf85ad5748a9bc62" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_23a755dc898b153774290c7db62" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic_category" ADD CONSTRAINT "FK_050fb7fcabbd109227be88766b4" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic_category" ADD CONSTRAINT "FK_0f9130851d3da68df3569dc4dc3" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topic_category" DROP CONSTRAINT "FK_0f9130851d3da68df3569dc4dc3"`);
        await queryRunner.query(`ALTER TABLE "topic_category" DROP CONSTRAINT "FK_050fb7fcabbd109227be88766b4"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_23a755dc898b153774290c7db62"`);
        await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_a44706d4357bf85ad5748a9bc62"`);
        await queryRunner.query(`DROP INDEX "IDX_0f9130851d3da68df3569dc4dc"`);
        await queryRunner.query(`DROP INDEX "IDX_050fb7fcabbd109227be88766b"`);
        await queryRunner.query(`DROP TABLE "topic_category"`);
        await queryRunner.query(`DROP TABLE "topic"`);
        await queryRunner.query(`DROP TABLE "section"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
