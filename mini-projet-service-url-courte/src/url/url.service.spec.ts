import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { Repository } from 'typeorm';
import { moveDefaultProjectToStart } from '@nestjs/cli/lib/utils/project-utils';

describe('UrlService', () => {
  let module: TestingModule;
  let service: UrlService;
  let urlRepository: Repository<Url>;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: ':memory:',
          entities: [Url],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Url]),
      ],
      providers: [
        UrlService
      ],
    }).compile();

    service = module.get<UrlService>(UrlService);
    urlRepository = module.get<Repository<Url>>(getRepositoryToken(Url));
  });

  afterEach(async () => {
    await module.close();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    const url = await service.create({ target: 'https://webeleon.dev'})
    expect(url.target).toBe('https://webeleon.dev');
    expect(url.uuid).toBeDefined()
    expect(url.id).toBeDefined()

    expect(await urlRepository.find()).toHaveLength(1);
  })
});
