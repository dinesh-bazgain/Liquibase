import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiquibaseModule } from './liquibase/liquibase.module';
import { TourModule } from './liquibase/tour/tour.module';

@Module({
  imports: [LiquibaseModule, TourModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
