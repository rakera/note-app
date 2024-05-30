import { ConfigModuleOptions } from '@nestjs/config';
import securityConfig from '@app/config/security.config';

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env',
  load: [securityConfig],
};