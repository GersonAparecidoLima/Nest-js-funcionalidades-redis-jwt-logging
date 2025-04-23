import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProdutosTable1629092465368 implements MigrationInterface {
  name = 'CreateProdutosTable1629092465368';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Verifica se a tabela já existe
    const tableExists = await queryRunner.hasTable('produtos');

    if (!tableExists) {
      // Criação da tabela "produtos"
      await queryRunner.query(`
        CREATE TABLE "produtos" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "nome" VARCHAR(255) NOT NULL,
          "descricao" TEXT,
          "usuario_id" uuid,
          PRIMARY KEY ("id")
        );
      `);

      // Criação da chave estrangeira após a criação da tabela
      await queryRunner.query(`
        ALTER TABLE "produtos"
        ADD CONSTRAINT "FK_usuario_produto" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Exclui a tabela "produtos" ao reverter a migração
    await queryRunner.query(`DROP TABLE IF EXISTS "produtos";`);
  }
}
