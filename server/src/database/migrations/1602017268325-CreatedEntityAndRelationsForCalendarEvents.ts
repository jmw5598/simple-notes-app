import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatedEntityAndRelationsForCalendarEvents1602017268325 implements MigrationInterface {
    name = 'CreatedEntityAndRelationsForCalendarEvents1602017268325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "calendar_event" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "start_date_time" TIMESTAMP NOT NULL, "end_date_time" TIMESTAMP NOT NULL, "location" character varying NOT NULL, "description" character varying NOT NULL, "account_id" integer NOT NULL, CONSTRAINT "PK_176fe24e6eb48c3fef696c7641f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "calendar_event" ADD CONSTRAINT "FK_db5a3f34cfb403ec34d1a4ed0c6" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar_event" DROP CONSTRAINT "FK_db5a3f34cfb403ec34d1a4ed0c6"`);
        await queryRunner.query(`DROP TABLE "calendar_event"`);
    }

}
