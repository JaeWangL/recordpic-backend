import { Controller, Get } from '@nestjs/common';
import {
  DNSHealthIndicator,
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export default class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private dns: DNSHealthIndicator,
  ) {}

  @Get('db')
  @HealthCheck()
  async checkDatabase(): Promise<HealthCheckResult> {
    return await this.health.check([async () => this.db.pingCheck('typeorm')]);
  }

  @Get('dns')
  @HealthCheck()
  async checkDns(): Promise<HealthCheckResult> {
    if (!process.env.DOCS_DNS_URL) {
      return { status: 'error' } as HealthCheckResult;
    }

    // @ts-ignore
    return await this.health.check([() => this.dns.pingCheck('dns', process.env.DOCS_DNS_URL)]);
  }
}
