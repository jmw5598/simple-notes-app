import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCompletedAtColumnToTodoListTable1622985000935 implements MigrationInterface {
    name = 'AddCompletedAtColumnToTodoListTable1622985000935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_list" ADD "completed_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_list" DROP COLUMN "completed_at"`);
    }

}
