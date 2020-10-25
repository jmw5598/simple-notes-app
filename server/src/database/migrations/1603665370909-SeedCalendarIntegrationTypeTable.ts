import { query } from "express";
import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedCalendarIntegrationTypeTable1603665370909 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("INSERT INTO calendar_integration_type (created_at, updated_at, name) VALUES (NOW(), NOW(), 'Google Calendar')");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query("DELETE FROM calendar_integration_type WHERE id > 0");
    }
}
