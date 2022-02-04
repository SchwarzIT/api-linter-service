import { Injectable } from '@nestjs/common';
import {
  Spectral,
  Ruleset,
  ISpectralDiagnostic,
} from '@stoplight/spectral-core';
import { ApiType } from '../helpers/enum.api-type';
import { CreateLintingDto } from './create-linting.dto';
import { CreatedLintingDto } from './created-linting.dto';
import { SeverityLevel } from './enum.severity-level';

@Injectable()
export class LintingsService {
  private spectral: Spectral;

  async validateApiSpec(
    createLintingDto: CreateLintingDto,
  ): Promise<CreatedLintingDto> {
    const apiType: ApiType = ApiType[createLintingDto.apiType];
    const rules: Ruleset = await import(`../spectral-${apiType}`);
    this.spectral = new Spectral();
    this.spectral.setRuleset(rules);
    const swaggerFile = this.getSwaggerFileAsString(
      createLintingDto.apiSpecAsBase64,
    );
    const lintingResult = await this.getLintingResult(swaggerFile);
    const hasNoLintingErrors = this.hasNoLintingErrors(lintingResult);
    return this.calculateResponse(hasNoLintingErrors, lintingResult);
  }

  private hasNoLintingErrors(lintingResult: ISpectralDiagnostic[]): boolean {
    let errors = 0;
    lintingResult.forEach((partialResult) => {
      if (
        partialResult.severity === 0 ||
        partialResult.code === 'unrecognized-format'
      ) {
        errors++;
      }
    });
    return errors === 0;
  }

  private getSwaggerFileAsString(swaggerFileAsBase64): string {
    return Buffer.from(swaggerFileAsBase64, 'base64').toString('ascii');
  }

  private calculateResponse(
    hasNoLintingErrors: boolean,
    lintingResult: ISpectralDiagnostic[],
  ): CreatedLintingDto {
    if (!hasNoLintingErrors) {
      const failedResponse: CreatedLintingDto = {
        isValidSpec: false,
        description: 'Given API Spec DOES NOT comply with company API rules.',
        linkApiRules:
          'https://onedirection.schwarz/architecture-best-practices/apis/',
        highestSeverityLevel: SeverityLevel[0],
        lintingResults: lintingResult,
      };
      return failedResponse;
    }
    const response: CreatedLintingDto = {
      isValidSpec: true,
      description: 'Given API Spec DOES comply with company API rules.',
      linkApiRules:
        'https://onedirection.schwarz/architecture-best-practices/apis/',
      lintingResults: lintingResult,
    };
    return response;
  }

  private async getLintingResult(swaggerFile): Promise<ISpectralDiagnostic[]> {
    return this.spectral.run(swaggerFile);
  }
}
