import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Res, Body, Query } from '@nestjs/common';
import { Response } from 'express';
import { WalletService } from '../service';
import { RequestModel } from './request.model';
import {Wallet} from "../../../entities/wallect.entity";
@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly service: WalletService) {}
  @Get('/createOne')
  public async create(): Promise<string> {
    return this.service.create();
  }
  @Get('/test')
  public async test(): Promise<string> {
    return '123';
  }
  // @Get('/batchCreate')
  // public async batchCreate(): Promise<string> {
  //   return this.service.batchCreate();
  // }
  @Post('/bind')
  public async bind(@Body() dto: RequestModel, @Res() res: Response) {
    const result = await this.service.bind(dto.certificate);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }
  @Get('/check')
  public async check(@Query() certificate: string, @Res() res: Response) {
    const result = await this.service.check(certificate);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }
  @Post('/clearBind')
  public async clearBind(@Body() model: RequestModel, @Res() res: Response) {
    const result = await this.service.clearBind(model.certificate);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }
  @Post('/transfer')
  public async transfer(
    @Body() dto: RequestModel,
    @Res() res: Response,
  ): Promise<undefined> {
    const result = await this.service.transfer(dto.from, dto.to, dto.value);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }
  @Get('/checkOp')
  public async checkOp(
    @Query() op: string,
    @Res() res: Response,
  ): Promise<undefined> {
    const result = await this.service.checkOp(op);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }
  @Get('/getBalance')
  public async getBalance(
    @Query() certificate: string,
    @Res() res: Response,
  ): Promise<undefined> {
    const result = await this.service.getBalance(certificate);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }

  @Get('/batch-create')
  public async CreateWallet(
      @Query("sz") sz:string,
      @Res() res: Response
  ):Promise<undefined>{
    let status = 200
    const num = Number(sz)
    if (num > 0 && num < 50){
      await this.service.batchCreate(num);
    } else {
      status = 400
    }

    const emptyAddr = await this.service.getEmptyAddress()
    res.status(status).json({data: emptyAddr})
  }
}
