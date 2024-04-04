import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskListTableInit1711624834529 implements MigrationInterface {
    name = 'TaskListTableInit1711624834529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_lists" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_cc6852381026e4f7082bf50a885" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task_lists"`);
    }

}
