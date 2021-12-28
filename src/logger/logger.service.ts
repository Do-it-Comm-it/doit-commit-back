import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  /**
   * Write a 'log' level log.
   */
  log(message: any) {
    // eslint-disable-next-line prefer-rest-params
    super.log(message);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any) {
    super.error(message);
  }
}
