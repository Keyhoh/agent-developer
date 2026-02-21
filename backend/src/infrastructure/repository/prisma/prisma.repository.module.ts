import { Module } from '@nestjs/common';
import { PrismaRepository } from './prisma.repository';

@Module({
  providers: [PrismaRepository],
})
export class InfrastructureModule {}
