import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { WallectModule } from './modules/wallet';
import { Wallet } from './entities/wallect.entity';

@Module({
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, `.env`],
    }),
    TypeOrmModule.forRoot({
      ssl: true,
      type: 'postgres',
      username: 'aa',
      host: 'dpg-cm1e3ga1hbls73ahg2qg-a.singapore-postgres.render.com',
      password: 'rjXML6xtktpJowB50lNTuWxihXuZIU4N',
      database: 'db_yg1a',
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
