import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LintingsService } from './lintings.service';
import { CreateLintingDto } from './create-linting.dto';
import { CreatedLintingDto } from './created-linting.dto';
import { ApiType } from '../helpers/enum.api-type';

@Controller('/api-linting/api/v1/lintings')
export class LintingsController {
  constructor(private readonly lintingsService: LintingsService) {}

  @ApiOperation({
    description: 'Create a new API linting.',
  })
  @ApiCreatedResponse({
    description: 'Created new API linting.',
    type: CreatedLintingDto,
  })
  @ApiBadRequestResponse({
    description: 'Provided request body is missing mandatory properties.',
  })
  @ApiTags('lintings')
  @Post()
  createLinting(
    @Body() createLintingDto: CreateLintingDto,
  ): Promise<CreatedLintingDto> {
    if (!ApiType[createLintingDto.apiType]) {
      throw new BadRequestException('Property "apiType" not provided in body.');
    }
    return this.lintingsService.validateApiSpec(createLintingDto);
  }
}
