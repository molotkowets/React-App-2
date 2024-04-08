import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHistoryTable1712523660993 implements MigrationInterface {
    name = 'AddHistoryTable1712523660993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."history_action_enum" AS ENUM('create', 'update', 'delete')`);
        await queryRunner.query(`CREATE TYPE "public"."history_entity_name_enum" AS ENUM('task_entity', 'board_entity', 'task_lists_entity')`);
        await queryRunner.query(`CREATE TABLE "history" ("id" SERIAL NOT NULL, "action" "public"."history_action_enum" NOT NULL, "entity_name" "public"."history_entity_name_enum" NOT NULL, "data" jsonb NOT NULL, "entity_id" integer NOT NULL, CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "history"`);
        await queryRunner.query(`DROP TYPE "public"."history_entity_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."history_action_enum"`);
    }

}
