import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelacionamentoMarcaVeiculo1745430806625 implements MigrationInterface {
    name = 'AddRelacionamentoMarcaVeiculo1745430806625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criação da tabela "produtos"
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "produtos" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "nome" character varying(100) NOT NULL,
            "valor" integer NOT NULL,
            "quantidade_disponivel" integer NOT NULL,
            "descricao" character varying(255) NOT NULL,
            "categoria" character varying(100) NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP,
            CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id")
        )`);

        // Criação da tabela "produto_imagens"
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "produto_imagens" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "url" character varying(100) NOT NULL,
            "descricao" character varying(100) NOT NULL,
            "produtoId" uuid,
            CONSTRAINT "PK_d1cf326e8d58dbc469bd7fe2f32" PRIMARY KEY ("id"),
            CONSTRAINT "FK_eb1531605709dd94ec67b2141d0" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE
        )`);

        // Criação da tabela "produto_caracteristicas"
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "produto_caracteristicas" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "nome" character varying(100) NOT NULL,
            "descricao" character varying(255) NOT NULL,
            "produtoId" uuid,
            CONSTRAINT "PK_132816ff55e30a6bf554c9e2545" PRIMARY KEY ("id"),
            CONSTRAINT "FK_67339e59ab4b3ed091cf318f426" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE
        )`);

        // Criação da tabela "pedidos"
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "pedidos" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "valor_total" integer NOT NULL,
            "status" character varying NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP,
            "usuarioId" uuid,
            CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"),
            CONSTRAINT "FK_e60a655127c227b5e063e73165b" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        )`);

        // Criação da tabela "itens_pedidos"
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "itens_pedidos" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "quantidade" integer NOT NULL,
            "preco_venda" integer NOT NULL,
            "pedidoId" uuid,
            "produtoId" uuid,
            CONSTRAINT "PK_d93e780d333fe5d91e43797e8b5" PRIMARY KEY ("id"),
            CONSTRAINT "FK_aaa757efbf4f9fb222709a140b2" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT "FK_d07fbe9a1faab330529824f7fea" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        )`);

        // Criação da tabela "usuarios"
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "usuarios" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "nome" character varying(100) NOT NULL,
            "email" character varying(70) NOT NULL,
            "senha" character varying(255) NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP,
            CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id")
        )`);

        // Criação da tabela "marca"
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "marca" (
            "id" SERIAL NOT NULL,
            "descricao" character varying NOT NULL,
            CONSTRAINT "PK_d41856ffd597050edc69ea5188d" PRIMARY KEY ("id")
        )`);

        // Criação da tabela "veiculos"
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "veiculos" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "modelo" character varying(100) NOT NULL,
            "ano" integer NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP,
            "marca_id" integer,
            CONSTRAINT "PK_0c3daa1e5d16914bd9e7777cf77" PRIMARY KEY ("id"),
            CONSTRAINT "FK_04217ac689d23e5d0be173b585e" FOREIGN KEY ("marca_id") REFERENCES "marca"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover as restrições de chave estrangeira e tabelas na ordem inversa
        await queryRunner.query(`ALTER TABLE "veiculos" DROP CONSTRAINT "FK_04217ac689d23e5d0be173b585e"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_e60a655127c227b5e063e73165b"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_d07fbe9a1faab330529824f7fea"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_aaa757efbf4f9fb222709a140b2"`);
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" DROP CONSTRAINT "FK_67339e59ab4b3ed091cf318f426"`);
        await queryRunner.query(`ALTER TABLE "produto_imagens" DROP CONSTRAINT "FK_eb1531605709dd94ec67b2141d0"`);

        // Remover as tabelas na ordem inversa
        await queryRunner.query(`DROP TABLE "veiculos"`);
        await queryRunner.query(`DROP TABLE "marca"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "pedidos"`);
        await queryRunner.query(`DROP TABLE "itens_pedidos"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
        await queryRunner.query(`DROP TABLE "produto_caracteristicas"`);
        await queryRunner.query(`DROP TABLE "produto_imagens"`);
    }
}
