import { MigrationInterface, QueryRunner, Repository, getRepository } from "typeorm";
import { KeyboardShortcutAction } from '../../accounts/entities/keyboard-shortcut-action.entity';
import { KeyboardShortcutActionType } from '../../accounts/enums/keyboard-shortcut-action.enum';

const actions: Partial<KeyboardShortcutAction>[] = [
    {
        action: KeyboardShortcutActionType.CREATE_DOCUMENT,
        description: `Create a new document.`,
        defaultShortcut: `alt + d`
    }
];

export class AddsCreateDocumentBuilderShortcut1607555318746 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const repository: Repository<KeyboardShortcutAction> = getRepository(KeyboardShortcutAction);
        actions.forEach((a) => {
            const action: KeyboardShortcutAction = repository.create({...a});
            repository.save(action);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM keyboard_shortcut_action WHERE id > 0`);
    }
}
