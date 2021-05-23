import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedOrderIndexToTodoEntity1621772336780 implements MigrationInterface {
    name = 'AddedOrderIndexToTodoEntity1621772336780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "order_index" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "order_index"`);
    }

}
