import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { WallectModule } from './modules/wallet';
import { Wallet } from './entities/wallect.entity';
import * as process from "process";

@Module({
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, `.env`],
    }),
    TypeOrmModule.forRoot({
      ssl: process.env.PG_SSL == 'true',
      type: 'postgres',
      username: process.env.PG_USR,
      host: process.env.PG_URL,
      password: process.env.PG_PWD,
      database: process.env.PG_DAT,
      autoLoadEntities: true,
      entities: [Wallet],
      synchronize: true,
    }),
    TerminusModule,
    WallectModule,
  ],
  controllers: [],
})
export class AppModule {}
