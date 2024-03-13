import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './app.controller';
import { TransactionService } from './app.service';

describe('AppController', () => {
  let appController: TransactionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [TransactionService],
    }).compile();

    appController = app.get<TransactionController>(TransactionController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
