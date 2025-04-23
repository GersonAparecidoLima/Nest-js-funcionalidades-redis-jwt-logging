import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class relacionaPedidoEItemPedido1685989050639 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criação da tabela, se ainda não existir
    const hasTable = await queryRunner.hasTable("itens_pedidos");
    if (!hasTable) {
      await queryRunner.createTable(
        new Table({
          name: "itens_pedidos",
          columns: [
            {
              name: "id",
              type: "uuid",
              isPrimary: true,
              default: "uuid_generate_v4()",
            },
            {
              name: "quantidade",
              type: "integer",
              isNullable: false,
            },
            {
              name: "preco_venda",
              type: "integer",
              isNullable: false,
            },
            {
              name: "pedidoId",
              type: "uuid",
              isNullable: true,
            },
          ],
        }),
        true
      );
    }

    const table = await queryRunner.getTable("itens_pedidos");
    const foreignKeyExists = table?.foreignKeys.some(fk => fk.name === "FK_aaa757efbf4f9fb222709a140b2");

    if (!foreignKeyExists) {
      await queryRunner.createForeignKey(
        "itens_pedidos",
        new TableForeignKey({
          name: "FK_aaa757efbf4f9fb222709a140b2",
          columnNames: ["pedidoId"],
          referencedColumnNames: ["id"],
          referencedTableName: "pedidos",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("itens_pedidos");
    const fk = table?.foreignKeys.find(fk => fk.name === "FK_aaa757efbf4f9fb222709a140b2");
    if (fk) {
      await queryRunner.dropForeignKey("itens_pedidos", fk);
    }

    await queryRunner.dropTable("itens_pedidos", true);
  }
}
