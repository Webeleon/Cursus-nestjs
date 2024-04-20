import { DataSource } from 'typeorm';
import { DataType, newDb } from 'pg-mem';
import { v4 } from 'uuid';

export const pgMemDatasource = async () => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  });

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'version',
  });

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'obj_description',
  });

  db.registerExtension('uuid-ossp', (schema) => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: v4,
      impure: true,
    });
  });

  const ds: DataSource = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'], // utiliser le bon chemin pour trouver vos entities
  });
  await ds.initialize();
  await ds.synchronize();

  return ds;
};
