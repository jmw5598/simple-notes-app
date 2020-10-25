import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedPlansTable1603665355426 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("INSERT INTO plan (created_at, updated_at, name) VALUES (NOW(), NOW(), 'Free')");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("DELETE FROM plan WHERE id > 0");
    }
}
