import {MigrationInterface, QueryRunner} from "typeorm";

export class SetCssClassNameColumnConstraintOnThemeTable1613216258089 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "theme" ALTER COLUMN "css_class_name" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "theme" ALTER COLUMN "css_class_name" DROP NOT NULL`);
    }

}
