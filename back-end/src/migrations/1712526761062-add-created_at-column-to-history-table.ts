import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtColumnToHistoryTable1712526761062 implements MigrationInterface {
    name = 'AddCreatedAtColumnToHistoryTable1712526761062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "created_at"`);
    }

}
