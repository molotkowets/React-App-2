import { NestExpressApplication } from '@nestjs/platform-express';
import { DataSource } from 'typeorm';

export const clearAllTables = async (app: NestExpressApplication) => {
  const dataSource = app.get(DataSource);
  const tables = (
    await dataSource
      .createQueryBuilder()
      .select('table_name', 'tableName')
      .from('information_schema.tables', 't')
      .where('t.table_schema = :schema', { schema: 'public' })
      .andWhere('t.table_type = :tableType', { tableType: 'BASE TABLE' })
      .andWhere('t.table_name != :migrationTableName', {
        migrationTableName:
          dataSource.options.migrationsTableName ?? 'migrations',
      })
      .getRawMany()
  ).map(({ tableName }) => tableName);

  if (tables.length) {
    await dataSource.query(`TRUNCATE "${Object.values(tables).join('","')}"`);
  }
};
