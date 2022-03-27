import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "better-sqlite3",
          database: ":memory:",
          entities: [User],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));

  });

  afterEach(async () => {
    await module.close();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('list', async () => {

    await userRepository.insert([
      userRepository.create({
        name: 'coco'
      }),
      userRepository.create({
        name: 'titi'
      }),
    ])

    const page1 = await service.list(1, 1);
    expect(page1).toHaveLength(1);
    expect(page1[0].name).toBe('coco')

    const page2 = await service.list(2, 1);
    expect(page2).toHaveLength(1);
    expect(page2[0].name).toBe('titi')
  })

  it('create', async () => {
    const user = await service.create({
      name: 'foo',
    });

    expect(user).toBeInstanceOf(User);
    expect(user.uuid).toBeDefined();

    const users = await userRepository.find();
    expect(users).toHaveLength(1);
    expect(users[0].uuid).toBeDefined();
    expect(users[0].name).toBe('foo');
  })
});
