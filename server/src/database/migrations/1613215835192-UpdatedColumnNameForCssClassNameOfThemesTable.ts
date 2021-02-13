import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedColumnNameForCssClassNameOfThemesTable1613215835192 implements MigrationInterface {
    name = 'UpdatedColumnNameForCssClassNameOfThemesTable1613215835192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "theme" RENAME COLUMN "cssClassName" TO "css_class_name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "theme" ALTER COLUMN "css_class_name" DROP NOT NULL`);
    }

}
