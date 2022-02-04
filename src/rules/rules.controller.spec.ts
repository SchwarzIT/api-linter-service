import { Test, TestingModule } from '@nestjs/testing';
import { RulesController } from './rules.controller';
import { StreamableFile } from '@nestjs/common';

declare type ResponseHeaders = {
  set: (headers: Record<string, string>) => void;
};

describe('RulesController', () => {
  let controller: RulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RulesController],
    }).compile();

    controller = module.get<RulesController>(RulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have getCompanyApiRules method defined', () => {
    expect(controller.getCompanyApiRules).toBeDefined();
  });

  it('should return spectral rules for "product_api" as StreamableFile', () => {
    const responseHeaders: ResponseHeaders = {
      set: jest.fn(),
    };
    expect(
      controller.getCompanyApiRules('product_api', responseHeaders),
    ).toBeInstanceOf(StreamableFile);
    expect(responseHeaders.set).toHaveBeenCalled();
  });
});
