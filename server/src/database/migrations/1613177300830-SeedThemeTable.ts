import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedThemeTable1613177300830 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("INSERT INTO theme (created_at, updated_at, name, filename) VALUES (NOW(), NOW(), 'Blue', 'theme-blue.css')");
        queryRunner.query("INSERT INTO theme (created_at, updated_at, name, filename) VALUES (NOW(), NOW(), 'Cyan', 'theme-cyan.css')");
        queryRunner.query("INSERT INTO theme (created_at, updated_at, name, filename) VALUES (NOW(), NOW(), 'Green', 'theme-green.css')");
        queryRunner.query("INSERT INTO theme (created_at, updated_at, name, filename) VALUES (NOW(), NOW(), 'Indigo', 'theme-indigo.css')");
        queryRunner.query("INSERT INTO theme (created_at, updated_at, name, filename) VALUES (NOW(), NOW(), 'Orange', 'theme-orange.css')");
        queryRunner.query("INSERT INTO theme (created_at, updated_at, name, filename) VALUES (NOW(), NOW(), 'Pink', 'theme-pink.css')");
        queryRunner.query("INSERT INTO theme (created_at, updated_at, name, filename) VALUES (NOW(), NOW(), 'Purple', 'theme-purple.css')");
        queryRunner.query("INSERT INTO theme (created_at, updated_at, name, filename) VALUES (NOW(), NOW(), 'Red', 'theme-red.css')");
        queryRunner.query("INSERT INTO theme (created_at, updated_at, name, filename) VALUES (NOW(), NOW(), 'Teal', 'theme-teal.css')");
        queryRunner.query("INSERT INTO theme (created_at, updated_at, name, filename) VALUES (NOW(), NOW(), 'Yellow', 'theme-yellow.css')");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('DELETE FROM theme WHERE id > 0');
    }

}
