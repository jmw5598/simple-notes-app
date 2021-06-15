import {MigrationInterface, QueryRunner} from "typeorm";
import { Roles } from '../../authentication/models/roles.enum';

export class SeedRolesTable1623750095700 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        Object.keys(Roles).forEach((key) => {
            queryRunner.query(`
                INSERT INTO role (created_at, updated_at, name) 
                VALUES (NOW(), NOW(), '${Roles[key]}')
            `);
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM roles where id > 0;`);
    }
}
