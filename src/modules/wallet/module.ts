import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "../../entities/wallect.entity";
import { WalletController } from "./controller";
import { WalletService } from "./service";
@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  exports: [],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WallectModule {}
