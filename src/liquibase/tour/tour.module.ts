import { Module } from '@nestjs/common';
import { TourController } from './tour.controller';
import { TourService } from './tour.service';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [TourController],
  providers: [TourService, PrismaService],
  exports: [TourService],
})
export class TourModule {}
