import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialTodosEntity1621701429052 implements MigrationInterface {
    name = 'InitialTodosEntity1621701429052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "started_by" TIMESTAMP WITH TIME ZONE NOT NULL, "completed_by" TIMESTAMP WITH TIME ZONE NOT NULL, "description" character varying NOT NULL, "is_complete" boolean NOT NULL, "account_id" integer, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_417bcf3baaef311f1e173040678" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_417bcf3baaef311f1e173040678"`);
        await queryRunner.query(`DROP TABLE "todo"`);
    }

}
