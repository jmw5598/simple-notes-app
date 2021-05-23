import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedTodoCompletedAtColumnType1621770433978 implements MigrationInterface {
    name = 'UpdatedTodoCompletedAtColumnType1621770433978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "completed_at"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "completed_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "completed_at"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "completed_at" TIMESTAMP NOT NULL`);
    }

}
