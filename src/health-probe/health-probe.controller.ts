import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/.well-known/live')
export class HealthProbeController {
  @ApiOperation({
    description: 'Health probe endpoint.',
  })
  @ApiOkResponse({
    description: 'Service is live.',
  })
  @ApiTags('health-probe')
  @Get()
  returnLive() {
    return HttpStatus.OK;
  }
}
