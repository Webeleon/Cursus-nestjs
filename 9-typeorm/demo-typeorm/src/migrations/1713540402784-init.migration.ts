import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1713540402784 implements MigrationInterface {
  name = 'Init1713540402784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ingredient" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "recipeUuid" uuid, CONSTRAINT "PK_d2b6c1f63c9611fb5c142c92df4" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "recipe" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_550393ff21c21af9084c2e82d60" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying, CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient" ADD CONSTRAINT "FK_c362913f9a994876a517e929842" FOREIGN KEY ("recipeUuid") REFERENCES "recipe"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ingredient" DROP CONSTRAINT "FK_c362913f9a994876a517e929842"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "recipe"`);
    await queryRunner.query(`DROP TABLE "ingredient"`);
  }
}
