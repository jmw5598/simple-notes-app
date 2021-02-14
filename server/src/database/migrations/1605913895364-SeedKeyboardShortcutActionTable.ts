import { MigrationInterface, QueryRunner } from "typeorm";
import { KeyboardShortcutAction } from '../../accounts/entities/keyboard-shortcut-action.entity';
import { KeyboardShortcutActionType } from '../../accounts/enums/keyboard-shortcut-action.enum';

const actions: Partial<KeyboardShortcutAction>[] = [
    {
        action: KeyboardShortcutActionType.CREATE_CALENDAR_EVENT,
        description: `Create a new calendar event.`,
        defaultShortcut: `alt + e`
    },
    {
        action: KeyboardShortcutActionType.CREATE_TOPIC,
        description: `Create a new topic.`,
        defaultShortcut: `alt + t`
    },
    {
        action: KeyboardShortcutActionType.SEARCH_TOPICS,
        description: `Search for topics.`,
        defaultShortcut: `alt + s`
    }
];

export class SeedKeyboardShortcutActionTable1605913895364 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        actions.forEach((a) => {
            queryRunner.query(`
                INSERT INTO keyboard_shortcut_action (created_at, updated_at, action, description, default_shortcut) 
                VALUES (NOW(), NOW(), '${a.action}', '${a.description}', '${a.defaultShortcut}')
            `);
        });   
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM keyboard_shortcut_action WHERE id > 0`);
    }
}
