import { Test, TestingModule } from '@nestjs/testing';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { Queue } from 'bull';

import { MailService } from '../mail.service';
import { MAIL_QUEUE, SEND_MAIL } from '../constants';

describe('MailService', () => {
  let service: MailService;
  let moduleRef: TestingModule;

  const exampleQueueMock = { add: jest.fn() };

  beforeEach(async () => {
    jest.resetAllMocks();
    moduleRef = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: MAIL_QUEUE,
        }),
      ],
      providers: [MailService],
    })
      .overrideProvider(getQueueToken(MAIL_QUEUE))
      .useValue(exampleQueueMock)
      .compile();

    service = moduleRef.get<MailService>(MailService);
  });

  it('should inject the queue', () => {
    const queue = moduleRef.get<Queue>(getQueueToken(MAIL_QUEUE));

    expect(queue).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should dispatch job', async () => {
    await service.sendMail('test@gmail.com');

    expect(exampleQueueMock.add).toHaveBeenCalledWith(SEND_MAIL, {
      email: 'test@gmail.com',
    });
  });
});
