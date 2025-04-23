import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelacionaPedidoEItemPedido1685989050639 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("itens_pedidos");
    const hasConstraint = table?.foreignKeys.find(
      fk => fk.name === "FK_aaa757efbf4f9fb222709a140b2"
    );

    if (!hasConstraint) {
      await queryRunner.createForeignKey(
        "itens_pedidos",
        new TableForeignKey({
          columnNames: ["pedidoId"],
          referencedColumnNames: ["id"],
          referencedTableName: "pedidos",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          name: "FK_aaa757efbf4f9fb222709a140b2"
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("itens_pedidos");
    const foreignKey = table?.foreignKeys.find(
      fk => fk.name === "FK_aaa757efbf4f9fb222709a140b2"
    );

    if (foreignKey) {
      await queryRunner.dropForeignKey("itens_pedidos", foreignKey);
    }
  }
}
