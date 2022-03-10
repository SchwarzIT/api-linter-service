import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ISpectralDiagnostic } from '@stoplight/spectral-core';
import {
  JsonPath,
  IRange,
  DiagnosticSeverity,
  IDiagnosticRelatedInformation,
  IPosition,
} from '@stoplight/types';

export class SpectralResult implements ISpectralDiagnostic {
  @ApiProperty({
    description: 'The path of the error as JsonPath',
    isArray: true,
    type: 'string',
    example: ['paths', '/route', 'get'],
  })
  path: JsonPath;

  @ApiProperty({
    description:
      'The code of the rule, can be used to identify the rule that caused the issue',
    example: 'path-description-is-mandatory',
    oneOf: [{ type: 'string' }, { type: 'number' }],
  })
  code: string | number;

  @ApiProperty({
    type: () => SpectralResultRange,
    description: 'The range of the error inside the linted document',
    example: {
      start: { line: 14, character: 21 },
      end: { line: 84, character: 52 },
    } as SpectralResultRange,
  })
  range: IRange;

  @ApiPropertyOptional({
    description: 'The message associated with the issue',
    example:
      'Every route of an API should have a description; property: /route.description is missing',
  })
  message: string;

  @ApiProperty({
    description:
      'The severity of the issue. 0 = "Error", 1 = "Warning", 2 = "Information", 3 = "Hint"',
    enum: [0, 1, 2, 3],
  })
  severity: DiagnosticSeverity;

  @ApiPropertyOptional({
    description:
      'A human-readable string describing the source of this diagnostic, e.g. "typescript" or "super lint".',
  })
  source?: string;

  @ApiPropertyOptional({
    description: 'Additional metadata about the diagnostic.',
  })
  tags?: string[];

  relatedInformation?: IDiagnosticRelatedInformation[];
}

export class SpectralResultRange implements IRange {
  @ApiProperty({
    type: () => SpectralResultPosition,
    description:
      'The starting position of the issue inside the linted document',
  })
  start: IPosition;

  @ApiProperty({
    type: () => SpectralResultPosition,
    description: 'The ending position of the issue inside the linted document',
  })
  end: IPosition;
}

export class SpectralResultPosition implements IPosition {
  @ApiProperty({
    description: 'Line position in a document (zero-based)',
  })
  line: number;

  @ApiProperty({
    description:
      'Character offset on a line in a document (zero-based). Assuming that the line is represented as a string, the `character` value represents the gap between the `character` and `character + 1`. If the character value is greater than the line length it defaults back to the line length.',
  })
  character: number;
}
