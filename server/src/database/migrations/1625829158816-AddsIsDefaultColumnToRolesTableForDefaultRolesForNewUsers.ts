import {MigrationInterface, QueryRunner} from "typeorm";

export class AddsIsDefaultColumnToRolesTableForDefaultRolesForNewUsers1625829158816 implements MigrationInterface {
    name = 'AddsIsDefaultColumnToRolesTableForDefaultRolesForNewUsers1625829158816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" ADD "is_default" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "is_default"`);
    }

}
