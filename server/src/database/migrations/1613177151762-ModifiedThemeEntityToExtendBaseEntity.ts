import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifiedThemeEntityToExtendBaseEntity1613177151762 implements MigrationInterface {
    name = 'ModifiedThemeEntityToExtendBaseEntity1613177151762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "theme" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "theme" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "theme" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "theme" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "theme" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "theme" DROP COLUMN "created_at"`);
    }

}
