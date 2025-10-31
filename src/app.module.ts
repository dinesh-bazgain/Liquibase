import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiquibaseModule } from './liquibase/liquibase.module';

@Module({
  imports: [LiquibaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
