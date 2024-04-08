import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBoardTable1712232086812 implements MigrationInterface {
  name = 'AddBoardTable1712232086812';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "boards" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`,
    );
    const [{ id: boardId }] = await queryRunner.query(
      `INSERT INTO "boards" (name) VALUES ('Board 1') RETURNING id`,
    );

    await queryRunner.query(`ALTER TABLE "tasks" ADD "board_id" integer`);
    await queryRunner.query(`ALTER TABLE "task_lists" ADD "board_id" integer`);

    await queryRunner.query('UPDATE "tasks" SET board_id = $1', [boardId]);
    await queryRunner.query('UPDATE "task_lists" SET board_id = $1', [boardId]);

    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "board_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "task_lists" ALTER COLUMN "board_id" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_2680b7f3ecd70b05030ce6b4aef" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task_lists" ADD CONSTRAINT "FK_d4bb3209b944dda6b987a1ae9f9" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task_lists" DROP CONSTRAINT "FK_d4bb3209b944dda6b987a1ae9f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_2680b7f3ecd70b05030ce6b4aef"`,
    );
    await queryRunner.query(`ALTER TABLE "task_lists" DROP COLUMN "board_id"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "board_id"`);
    await queryRunner.query(`DROP TABLE "boards"`);
  }
}
