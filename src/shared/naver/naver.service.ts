import { HttpService, Injectable, Logger } from '@nestjs/common';
import Moment from 'moment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface NaverSMSMessage {
  to: string;
  subject?: string;
  content?: string;
}

interface NaverSMSReq {
  type: 'SMS' | 'LMS' | 'MMS';
  countryCode?: string;
  from: string;

  /**
   * SMS < 80byte
   * LMS, MMS < 2000byte
   */
  content: string;
  messages: NaverSMSMessage[];
  reserveTime?: string; // yyyy-MM-dd HH:mm
  // TZ database name from `https://en.wikipedia.org/wiki/List_of_tz_database_time_zones`
  reserveTimeZone?: string;
}

@Injectable()
export default class NaverService {
  constructor(private httpService: HttpService) {}

  sendSMS(content: string, toNumbers: string[], countryCode?: string): void {
    if (
      !process.env.NAVER_CLOUD_SECRET_KEY ||
      !process.env.NAVER_CLOUD_SERVICE_ID ||
      !process.env.NAVER_SMS_FROM_NUMBER
    ) {
      return;
    }

    const messages = toNumbers.map(
      (number) =>
        ({
          to: number,
        } as NaverSMSMessage),
    );
    const req: NaverSMSReq = {
      type: 'SMS',
      from: process.env.NAVER_SMS_FROM_NUMBER,
      countryCode,
      content,
      messages,
    };

    this.httpService
      .post(`https://sens.apigw.ntruss.com/sms/v2/services/${process.env.NAVER_CLOUD_SERVICE_ID}/messages`, req, {
        headers: {
          'Content-Type': 'application/json',
          'x-ncp-apigw-timestamp': Moment(),
          'x-ncp-iam-access-key': process.env.NAVER_CLOUD_SECRET_KEY,
          'x-ncp-apigw-signature-v2': this.makeSignature(process.env.NAVER_CLOUD_SECRET_KEY),
        },
      })
      .pipe(
        catchError((error) => {
          Logger.error(`NaverService.sendSMS: ${error.toString()}`);

          return throwError(error);
        }),
      );
  }

  private makeSignature(secretKey: string): string {
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    const hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
  }
}
