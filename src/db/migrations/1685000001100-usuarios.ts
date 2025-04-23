import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1629092465368 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criação da tabela de usuários (se não existir)
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "usuarios" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "nome" VARCHAR(255) NOT NULL,
        "email" VARCHAR(255) NOT NULL UNIQUE,
        PRIMARY KEY ("id")
      );
    `);

    // Criação da tabela de produtos (se não existir)
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "produtos" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),  -- Usando UUID para produtos
        "nome" VARCHAR(255) NOT NULL,
        "descricao" TEXT,
        "usuario_id" uuid,  -- Relacionamento com usuário
        PRIMARY KEY ("id")
      );
    `);

    // Criação da tabela de pedidos (se não existir)
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

    // Criação da tabela de itens pedidos (se não existir)
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "itens_pedidos" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "quantidade" integer NOT NULL,
        "preco_venda" integer NOT NULL,
        "pedidoId" uuid,
        CONSTRAINT "PK_d93e780d333fe5d91e43797e8b5" PRIMARY KEY ("id")
      );
    `);

    // Adicionando a chave estrangeira na tabela "itens_pedidos" para "pedidos"
    await queryRunner.query(`
      ALTER TABLE "itens_pedidos"
      ADD CONSTRAINT "FK_aaa757efbf4f9fb222709a140b2" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    `);

    // Criação da tabela de imagens de produtos (se não existir)
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "produto_imagens" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "url" character varying(100) NOT NULL,
        "descricao" character varying(100) NOT NULL,
        "produtoId" uuid,
        CONSTRAINT "PK_d1cf326e8d58dbc469bd7fe2f32" PRIMARY KEY ("id"),
        CONSTRAINT "FK_eb1531605709dd94ec67b2141d0" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback da criação das tabelas e das chaves estrangeiras
    await queryRunner.query(`DROP TABLE IF EXISTS "produto_imagens"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "itens_pedidos"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "pedidos"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "produtos"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "usuarios"`);
  }
}
