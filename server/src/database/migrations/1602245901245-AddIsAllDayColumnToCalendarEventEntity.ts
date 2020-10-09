import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsAllDayColumnToCalendarEventEntity1602245901245 implements MigrationInterface {
    name = 'AddIsAllDayColumnToCalendarEventEntity1602245901245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar_event" ADD "is_all_day" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar_event" DROP COLUMN "is_all_day"`);
    }

}
