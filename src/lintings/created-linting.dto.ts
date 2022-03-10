import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SpectralResult } from './spectralResult.dto';

export class CreatedLintingDto {
  @ApiProperty({
    description:
      'Information if your OpenApi Spec does comply with company rules.',
    example: 'Given API Spec DOES comply with company API rules.',
  })
  description: string;

  @ApiProperty({
    description: 'Link to Company API Best Practices',
    example:
      'https://press-release-demo.prod.sit.sys.odj.cloud/architecture-best-practices/apis/',
  })
  linkApiRules: string;

  @ApiPropertyOptional({
    description: 'Highest severity level during linting.',
    example: 'Warn',
    enum: ['Error', 'Warn', 'Info', 'Hint'],
  })
  highestSeverityLevel?: string;

  @ApiProperty({
    description:
      'Indicates if given OpenAPI Spec complies to company API best practices.',
    example: true,
  })
  isValidSpec: boolean;

  @ApiProperty({
    description: 'Example API linting result',
    type: () => SpectralResult,
    isArray: true,
    example: [],
  })
  lintingResults: SpectralResult[];
}
