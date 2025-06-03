import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ProducersModule } from './modules/producers/producers.module';
import { FarmsModule } from './modules/farm/farm.module';
import { CropsModule } from './modules/crops/crops.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    ProducersModule,
    FarmsModule,
    CropsModule,
    DashboardModule,
  ],
})
export class AppModule {}
