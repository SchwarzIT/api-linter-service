import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
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
  @ApiUnauthorizedResponse({
    description: 'API call was not authenticated.',
  })
  @ApiTags('lintings')
  @ApiBasicAuth()
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
