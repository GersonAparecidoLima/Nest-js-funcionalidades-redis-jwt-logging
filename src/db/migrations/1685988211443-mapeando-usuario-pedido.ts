import { MigrationInterface, QueryRunner } from "typeorm";

export class mapeandoUsuarioPedido1685988211443 implements MigrationInterface {
  name = 'mapeandoUsuarioPedido1685988211443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "pedidos" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "valor_total" integer NOT NULL,
        "status" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "usuarioId" uuid,
        CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "pedidos"`);
  }
}
