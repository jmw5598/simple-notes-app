import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateKeyboardShortcutAndActionTables1605913741232 implements MigrationInterface {
    name = 'CreateKeyboardShortcutAndActionTables1605913741232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "keyboard_shortcut_action" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "action" character varying NOT NULL, "description" character varying NOT NULL, "default_shortcut" character varying NOT NULL, CONSTRAINT "PK_f08e3cb53f2744035af51a6d5c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "keyboard_shortcut" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "shortcut" character varying NOT NULL, "account_id" integer, "keyboard_shortcut_action_id" integer, CONSTRAINT "PK_ff87769c969898524d863a93ad4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "keyboard_shortcut" ADD CONSTRAINT "FK_71ba8a4e295102b658acf076af1" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "keyboard_shortcut" ADD CONSTRAINT "FK_175f6008ecf58bd7b550f54b02c" FOREIGN KEY ("keyboard_shortcut_action_id") REFERENCES "keyboard_shortcut_action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "keyboard_shortcut" DROP CONSTRAINT "FK_175f6008ecf58bd7b550f54b02c"`);
        await queryRunner.query(`ALTER TABLE "keyboard_shortcut" DROP CONSTRAINT "FK_71ba8a4e295102b658acf076af1"`);
        await queryRunner.query(`DROP TABLE "keyboard_shortcut"`);
        await queryRunner.query(`DROP TABLE "keyboard_shortcut_action"`);
    }

}
