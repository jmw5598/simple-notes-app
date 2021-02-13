import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedThemesAddingCssClassNameFieldValues1613215893575 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("UPDATE theme SET css_class_name = 'theme-swatch-blue' WHERE filename = 'theme-blue.css'");
        queryRunner.query("UPDATE theme SET css_class_name = 'theme-swatch-cyan' WHERE filename = 'theme-cyan.css'");
        queryRunner.query("UPDATE theme SET css_class_name = 'theme-swatch-green' WHERE filename = 'theme-green.css'");
        queryRunner.query("UPDATE theme SET css_class_name = 'theme-swatch-indigo' WHERE filename = 'theme-indigo.css'");
        queryRunner.query("UPDATE theme SET css_class_name = 'theme-swatch-orange' WHERE filename = 'theme-orange.css'");
        queryRunner.query("UPDATE theme SET css_class_name = 'theme-swatch-pink' WHERE filename = 'theme-pink.css'");
        queryRunner.query("UPDATE theme SET css_class_name = 'theme-swatch-purple' WHERE filename = 'theme-purple.css'");
        queryRunner.query("UPDATE theme SET css_class_name = 'theme-swatch-red' WHERE filename = 'theme-red.css'");
        queryRunner.query("UPDATE theme SET css_class_name = 'theme-swatch-teal' WHERE filename = 'theme-teal.css'");
        queryRunner.query("UPDATE theme SET css_class_name = 'theme-swatch-yellow' WHERE filename = 'theme-yellow.css'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('UPDATE theme SET css_class_name = NULL WHERE id > 0');
    }

}
