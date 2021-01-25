import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialDatabase1611549098021 implements MigrationInterface {
  name = 'InitialDatabase1611549098021';

  async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.createSchema('main5');
    await queryRunner.createTable(
      new Table({
        name: 'Users2',
        columns: [
          {
            name: 'Id',
            type: 'bigint',
            isPrimary: true,
          },
          {
            name: 'Email',
            type: 'nvarchar',
            length: '256',
            isNullable: true,
          },
          {
            name: 'PasswordHash',
            type: 'nvarchar',
            length: 'MAX',
            isNullable: true,
          },
          {
            name: 'EmailConfirmed',
            type: 'bit',
            default: 0,
          },
          {
            name: 'Name',
            type: 'nvarchar',
            length: '30',
          },
          {
            name: 'ImageUrl',
            type: 'nvarchar',
            length: 'MAX',
            isNullable: true,
          },
          {
            name: 'SocialType',
            type: 'tinyint',
            isNullable: true,
          },
          {
            name: 'SocialId',
            type: 'nvarchar',
            length: 'MAX',
            isNullable: true,
          },
          {
            name: 'CreatedAt',
            type: 'datetimeoffset',
            precision: 7,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'UpdatedAt',
            type: 'datetimeoffset',
            precision: 7,
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('Users2');
  }
}
