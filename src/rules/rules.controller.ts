import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Response,
  StreamableFile,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { createReadStream, ReadStream } from 'fs';
import { join } from 'path';
import { ApiType } from '../helpers/enum.api-type';

declare type ResponseHeaders = {
  set: (headers: Record<string, string>) => void;
};

@Controller('/api-linting/api/v1/rules')
export class RulesController {
  @ApiOperation({
    description: 'Get company API linting rules for Spectral as YAML.',
  })
  @ApiOkResponse({
    description: 'Provides company API linting rules as stream download.',
  })
  @ApiBadRequestResponse({
    description: '"apiType" query param is missing.',
  })
  @ApiTags('rules')
  @ApiQuery({
    name: 'apiType',
    enum: Object.keys(ApiType),
    allowEmptyValue: false,
  })
  @Get()
  getCompanyApiRules(
    @Query('apiType') apiType: keyof typeof ApiType,
    @Response({ passthrough: true }) res: ResponseHeaders,
  ): StreamableFile {
    if (!ApiType[apiType]) {
      throw new BadRequestException(
        'Query param "apiType" not provided in query params.',
      );
    }
    const companyRules: ReadStream = createReadStream(
      join(`${process.cwd()}/dist`, `spectral-${ApiType[apiType]}.yml`),
    );
    res.set({
      'Content-Type': 'text/vnd.yaml',
      'Content-Disposition': `attachment; filename="spectral-${apiType}.yml"`,
    });
    return new StreamableFile(companyRules);
  }
}
