import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { pgMemDatasource } from './pg-mem.datasource';

export const getTestingModule = async () => {
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(DataSource)
    .useValue(pgMemDatasource())
    .compile();

  return testingModule;
};
