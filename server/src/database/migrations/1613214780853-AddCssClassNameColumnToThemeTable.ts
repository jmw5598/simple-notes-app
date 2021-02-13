import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCssClassNameColumnToThemeTable1613214780853 implements MigrationInterface {
    name = 'AddCssClassNameColumnToThemeTable1613214780853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "theme" ADD "cssClassName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "theme" DROP COLUMN "cssClassName"`);
    }

}
