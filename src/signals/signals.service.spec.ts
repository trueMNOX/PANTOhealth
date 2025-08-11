import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SignalsService } from './signals.service';
import { Signal } from './schemas/signal.schema';

describe('SignalsService', () => {
  let service: SignalsService;
  let mockSignalModel: any;

  beforeEach(async () => {
    mockSignalModel = {
      save: jest.fn(),
      find: jest.fn().mockReturnValue({ exec: jest.fn() }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignalsService,
        {
          provide: getModelToken(Signal.name),
          useValue: jest.fn(() => mockSignalModel),
        },
      ],
    }).compile();

    service = module.get<SignalsService>(SignalsService);
  });

  it('should process and save signal correctly', async () => {
    const rawData = {
      device123: {
        data: [[1, [10, 20, 1]], [2, [30, 40, 2]]],
        time: 1735683480000,
      },
    };

    mockSignalModel.save.mockResolvedValue({ _id: 'abc123' });

    const result = await service.saveSignal(rawData);

    expect(result).toHaveProperty('_id', 'abc123');
    expect(mockSignalModel.save).toHaveBeenCalled();
  });
});
