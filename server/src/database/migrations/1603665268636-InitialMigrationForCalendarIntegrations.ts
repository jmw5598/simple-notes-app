import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigrationForCalendarIntegrations1603665268636 implements MigrationInterface {
    name = 'InitialMigrationForCalendarIntegrations1603665268636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "calendar_integration_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "PK_6f1b59a98bc2ce96306c51c9789" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "calendar_integration" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "access_token" character varying NOT NULL, "refresh_token" character varying NOT NULL, "token_type" character varying NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "calendar_integration_type_id" integer NOT NULL, "account_id" integer, CONSTRAINT "PK_2c53f913a5cc0499e72e9bf9257" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "calendar_integration" ADD CONSTRAINT "FK_2df7b9366b0cde673b164246e86" FOREIGN KEY ("calendar_integration_type_id") REFERENCES "calendar_integration_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calendar_integration" ADD CONSTRAINT "FK_843e26342040a044f33bdd6fb42" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar_integration" DROP CONSTRAINT "FK_843e26342040a044f33bdd6fb42"`);
        await queryRunner.query(`ALTER TABLE "calendar_integration" DROP CONSTRAINT "FK_2df7b9366b0cde673b164246e86"`);
        await queryRunner.query(`DROP TABLE "calendar_integration"`);
        await queryRunner.query(`DROP TABLE "calendar_integration_type"`);
    }

}
