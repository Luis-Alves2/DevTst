import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './app.controller';
import { ClientService } from '../services/app.service';

describe('AppController', () => {
  let appController: ClientController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService],
    }).compile();

    appController = app.get<ClientController>(ClientController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
