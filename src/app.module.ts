import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { FeaturesModule } from './features/features.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CommonModule, FeaturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
