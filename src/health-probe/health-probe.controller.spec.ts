import { Test, TestingModule } from '@nestjs/testing';
import { HealthProbeController } from './health-probe.controller';

describe('HealthProbeController', () => {
  let controller: HealthProbeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthProbeController],
    }).compile();

    controller = module.get<HealthProbeController>(HealthProbeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have public "returnLive" method defined', () => {
    expect(controller.returnLive).toBeDefined();
  });

  it('should return with "HttpStatus.OK"', () => {
    expect(controller.returnLive()).toBe(200);
  });
});
