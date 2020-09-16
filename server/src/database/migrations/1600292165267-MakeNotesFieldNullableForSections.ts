import {MigrationInterface, QueryRunner} from "typeorm";

export class MakeNotesFieldNullableForSections1600292165267 implements MigrationInterface {
    name = 'MakeNotesFieldNullableForSections1600292165267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section" ALTER COLUMN "notes" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section" ALTER COLUMN "notes" SET NOT NULL`);
    }

}
