import { Controller, Scope } from '@nestjs/common';

@Controller({ path: '/', scope: Scope.REQUEST })
export class AppController {}
