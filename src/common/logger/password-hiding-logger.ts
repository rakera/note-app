import { AdvancedConsoleLogger } from 'typeorm/logger/AdvancedConsoleLogger';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';

class PasswordHidingLogger extends AdvancedConsoleLogger {
  constructor(options?: LoggerOptions) {
    super(options);
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): void {
    const params = parameters ? [...parameters] : [];

    if (query.toLowerCase().includes('password') && params.length) {
      // Find the indices of parameters corresponding to 'password'
      const valuesIndex = query.toUpperCase().indexOf('VALUES') + 'VALUES'.length;
      const valuesString = query.substring(valuesIndex).trim();

      const valueGroups = valuesString.split(/\s*,\s*/);
      valueGroups.forEach((group, index) => {
        if (group.toLowerCase().includes('password')) {
          params[index] = '********';
        }
      });
    }

    super.logQuery(query, params, queryRunner);
  }
}

export { PasswordHidingLogger };
