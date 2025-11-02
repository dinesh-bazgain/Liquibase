import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateTourDto, UpdateTourDto } from './tour.dto';

@Injectable()
export class TourService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTourDto) {
    const tour = await this.prisma.tour.create({
      data: {
        name: dto.name,
        description: dto.description,
        location: dto.location,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      },
    });
    return tour;
  }

  async findAll() {
    return this.prisma.tour.findMany({ orderBy: { startDate: 'desc' } });
  }

  async findOne(id: string) {
    const tour = await this.prisma.tour.findUnique({
      where: { id: Number(id) },
    });
    if (!tour) throw new NotFoundException('Tour not found');
    return tour;
  }

  async update(id: string, dto: UpdateTourDto) {
    // ensure exists
    await this.findOne(id);
    const data: any = {};
    if (dto.name) data.name = dto.name;
    if (dto.description) data.description = dto.description;
    if (dto.location) data.location = dto.location;
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);

    const updated = await this.prisma.tour.update({
      where: { id: Number(id) },
      data,
    });
    return updated;
  }

  async remove(id: string) {
    // ensure exists
    await this.findOne(id);
    await this.prisma.tour.delete({ where: { id: Number(id) } });
  }
}
