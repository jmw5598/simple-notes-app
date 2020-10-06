import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedCalendarEventEntityDateColumnsDataType1602027410649 implements MigrationInterface {
    name = 'UpdatedCalendarEventEntityDateColumnsDataType1602027410649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar_event" DROP COLUMN "start_date_time"`);
        await queryRunner.query(`ALTER TABLE "calendar_event" ADD "start_date_time" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "calendar_event" DROP COLUMN "end_date_time"`);
        await queryRunner.query(`ALTER TABLE "calendar_event" ADD "end_date_time" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar_event" DROP COLUMN "end_date_time"`);
        await queryRunner.query(`ALTER TABLE "calendar_event" ADD "end_date_time" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "calendar_event" DROP COLUMN "start_date_time"`);
        await queryRunner.query(`ALTER TABLE "calendar_event" ADD "start_date_time" TIMESTAMP NOT NULL`);
    }

}
