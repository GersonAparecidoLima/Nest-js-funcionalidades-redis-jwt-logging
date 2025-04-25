import { MigrationInterface, QueryRunner } from "typeorm";

export class AddValorToVeiculo1745578809551 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adicione aqui o código SQL para a migração
        await queryRunner.query(`
            ALTER TABLE veiculos ADD COLUMN valor DECIMAL(10, 2);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Adicione aqui o código para reverter a migração, caso necessário
        await queryRunner.query(`
            ALTER TABLE veiculos DROP COLUMN valor;
        `);
    }
}
