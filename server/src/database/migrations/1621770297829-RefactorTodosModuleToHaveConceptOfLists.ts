import {MigrationInterface, QueryRunner} from "typeorm";

export class RefactorTodosModuleToHaveConceptOfLists1621770297829 implements MigrationInterface {
    name = 'RefactorTodosModuleToHaveConceptOfLists1621770297829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_417bcf3baaef311f1e173040678"`);
        await queryRunner.query(`CREATE TABLE "todo_list" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "started_by" TIMESTAMP WITH TIME ZONE NOT NULL, "completed_by" TIMESTAMP WITH TIME ZONE NOT NULL, "title" character varying NOT NULL, "account_id" integer, CONSTRAINT "PK_1a5448d48035763b9dbab86555b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "started_by"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "completed_by"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "account_id"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "completed_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "todo_list_id" integer`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_c6ee9be84df2d3abfed3907120d" FOREIGN KEY ("todo_list_id") REFERENCES "todo_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo_list" ADD CONSTRAINT "FK_fe3c904be5e43a522c2fae5b507" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_list" DROP CONSTRAINT "FK_fe3c904be5e43a522c2fae5b507"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_c6ee9be84df2d3abfed3907120d"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "todo_list_id"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "completed_at"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "account_id" integer`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "completed_by" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "started_by" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`DROP TABLE "todo_list"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_417bcf3baaef311f1e173040678" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
