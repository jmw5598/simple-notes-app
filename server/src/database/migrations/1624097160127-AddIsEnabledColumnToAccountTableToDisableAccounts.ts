import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsEnabledColumnToAccountTableToDisableAccounts1624097160127 implements MigrationInterface {
    name = 'AddIsEnabledColumnToAccountTableToDisableAccounts1624097160127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "is_enabled" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "is_enabled"`);
    }

}
