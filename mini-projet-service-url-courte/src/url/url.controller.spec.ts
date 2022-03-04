import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

describe('UrlController', () => {
  let controller: UrlController;

  const urlServiceMock = {
    create: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UrlService,
          useValue: urlServiceMock,
        }
      ],
      controllers: [UrlController],
    }).compile();

    controller = module.get<UrlController>(UrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create', async () => {
    await controller.create({ target: 'https://webeleon.dev' });
    expect(urlServiceMock.create).toHaveBeenCalled();
  })
});
