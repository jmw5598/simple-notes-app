import { KeyboardShortcutAction } from "src/accounts/entities/keyboard-shortcut-action.entity";
import { KeyboardShortcutActionType } from "src/accounts/enums/keyboard-shortcut-action.enum";
import {MigrationInterface, QueryRunner} from "typeorm";

const actions: Partial<KeyboardShortcutAction>[] = [
    {
        action: KeyboardShortcutActionType.CREATE_FLASHCARD_SET,
        description: `Create a new flashcard set.`,
        defaultShortcut: `alt + f`
    },
    {
        action: KeyboardShortcutActionType.CREATE_TODO_LIST,
        description: `Create a new todo list.`,
        defaultShortcut: `alt + l`
    },
];

export class AddedShortcutsForFlashcardSetAndTodoLists1622296100111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        actions.forEach((a) => {
            queryRunner.query(`
                INSERT INTO keyboard_shortcut_action (created_at, updated_at, action, description, default_shortcut) 
                VALUES (NOW(), NOW(), '${a.action}', '${a.description}', '${a.defaultShortcut}')
            `);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        actions.forEach((a) => {
            queryRunner.query(`DELETE FROM keyboard_shortcut_action WHERE action = ${a.action}`);
        });
    }

}
