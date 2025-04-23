import { MigrationInterface, QueryRunner } from 'typeorm';

export class ajusteUsuarioIdPedidos1685988211555 implements MigrationInterface {
  name = 'ajusteUsuarioIdPedidos1685988211555';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Esta migração foi anulada pois a FK já existe
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Nenhuma ação reversa necessária
  }
}
