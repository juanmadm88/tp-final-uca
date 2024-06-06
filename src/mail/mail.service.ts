import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Address, ISendMailOptions } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';

@Injectable()
export class MailService {
  private logger = new Logger(MailService.name);
  private sender: Address = {
    address: this.configService.get<string>('appConfig.mailSender.from'),
    name: this.configService.get<string>('appConfig.app_name')
  };
  constructor(private configService: ConfigService, private mailSender: MailerService) {}
  public send = async (emailOptions: ISendMailOptions, uniqueTraceId?: string): Promise<void> => {
    try {
      this.logger.log({
        level: 'info',
        message: `Sending Email with this configuration : ${JSON.stringify({ ...emailOptions, sender: this.sender })}`,
        method: this.send.name,
        'unique-trace-id': uniqueTraceId || ''
      });
      await this.mailSender.sendMail({
        sender: this.sender,
        to: emailOptions.to,
        subject: emailOptions.subject
      });
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'An Error occurred while trying to send an Email',
        method: this.send.name,
        err: error,
        'unique-trace-id': uniqueTraceId || ''
      });
    }
  };
}
