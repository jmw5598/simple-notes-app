import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedColorColumnToCalendarEvent1603319616029 implements MigrationInterface {
    name = 'AddedColorColumnToCalendarEvent1603319616029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar_event" ADD "color" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar_event" DROP COLUMN "color"`);
    }

}
