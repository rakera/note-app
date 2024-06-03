import {
  AbstractLogger,
  LogLevel,
  LogMessage,
  QueryRunner,
} from 'typeorm';
import chalk from 'chalk';

export class CustomLogger extends AbstractLogger {
  /**
   * Write log to specific output.
   */
  protected writeLog(
    level: LogLevel,
    logMessage: LogMessage | LogMessage[],
    queryRunner?: QueryRunner,
  ) {
    const messages = this.prepareLogMessages(logMessage, {
      highlightSql: false,
    });

    for (let message of messages) {
      const formattedMessage = this.maskPassword(String(message.message));
      switch (message.type ?? level) {
        case 'log':
        case 'schema-build':
        case 'migration':
          console.log(chalk.white(formattedMessage));
          break;

        case 'info':
        case 'query':
          if (message.prefix) {
            console.info(message.prefix, chalk.blue(formattedMessage));
          } else {
            console.info(chalk.blue(formattedMessage));
          }
          break;

        case 'warn':
        case 'query-slow':
          if (message.prefix) {
            console.warn(message.prefix, chalk.yellow(formattedMessage));
          } else {
            console.warn(chalk.yellow(formattedMessage));
          }
          break;

        case 'error':
        case 'query-error':
          if (message.prefix) {
            console.error(message.prefix, chalk.red(formattedMessage));
          } else {
            console.error(chalk.red(formattedMessage));
          }
          break;
      }
    }
  }

  /**
   * Mask passwords in log messages.
   */
  private maskPassword(message: string): string {
    // Регулярное выражение для поиска пароля
    const passwordRegex = /(\$2b\$[^\s\"]+)/g;
    return message.replace(passwordRegex, '******');
  }
}
