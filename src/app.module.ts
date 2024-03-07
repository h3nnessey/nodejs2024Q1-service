import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ParseUUIDv4Pipe } from './utils/parse-uuidv4-pipe';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, ParseUUIDv4Pipe],
})
export class AppModule {}
