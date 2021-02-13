import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateThemeTableAndRelation1613176597922 implements MigrationInterface {
    name = 'CreateThemeTableAndRelation1613176597922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "theme" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "filename" character varying NOT NULL, CONSTRAINT "PK_c1934d0b4403bf10c1ab0c18166" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "account" ADD "theme_id" integer`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_36b30847114f1e1dedd8f9d84c7" FOREIGN KEY ("theme_id") REFERENCES "theme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_36b30847114f1e1dedd8f9d84c7"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "theme_id"`);
        await queryRunner.query(`DROP TABLE "theme"`);
    }

}
