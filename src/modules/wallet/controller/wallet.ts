import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Post, Res, Body, Query } from "@nestjs/common";
import { Response } from "express";
import { WalletService } from "../service";
import { RequestModel } from "./request.model";
@ApiTags("Wallet")
@Controller("wallet")
export class WalletController {
  constructor(private readonly service: WalletService) {}
  @Get("/createOne")
  public async create(): Promise<string> {
    return this.service.create();
  }
  @Get("/healthz")
  public async healthz(): Promise<string> {
    return "ok";
  }

  @Post("/bind")
  public async bind(@Body() dto: RequestModel, @Res() res: Response) {
    console.log(`[POST] /bind: ${JSON.stringify(dto)}`);
    const result = await this.service.bind(dto.certificate);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }
  @Get("/check")
  public async check(
    @Query("certificate") certificate: string,
    @Res() res: Response,
  ) {
    console.log(`[GET] /check: ${JSON.stringify(certificate)}`);
    const result = await this.service.check(certificate);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }
  @Post("/clearBind")
  public async clearBind(@Body() model: RequestModel, @Res() res: Response) {
    const result = await this.service.clearBind(model.certificate);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }
  @Post("/transfer")
  public async transfer(
    @Body() dto: RequestModel,
    @Res() res: Response,
  ): Promise<undefined> {
    console.log(`[POST] /transfer: ${JSON.stringify(dto)}`);
    const result = await this.service.transfer(dto.from, dto.to, dto.value);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }

  @Get("/checkOp")
  public async checkOp(
    @Query("op") op: string,
    @Res() res: Response,
  ): Promise<undefined> {
    console.log(`[GET] /checkOp: ${JSON.stringify(op)}`);
    const result = await this.service.checkOp(op);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }
  @Get("/getBalance")
  public async getBalance(
    @Query("certificate") certificate: string,
    @Res() res: Response,
  ): Promise<undefined> {
    console.log(`[GET] /getBalance: ${JSON.stringify(certificate)}`);
    const result = await this.service.getBalance(certificate);
    console.log(`[GET] /getBalance: ${JSON.stringify(result)}`);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  }

  @Get("/batch-create")
  public async CreateWallet(
    @Query("sz") sz: string,
    @Res() res: Response,
  ): Promise<undefined> {
    console.log(`[GET] /batch-create: ${JSON.stringify(sz)}`);
    let status = 200;
    const num = Number(sz);
    if (num > 0 && num < 50) {
      await this.service.batchCreate(num);
    } else {
      status = 400;
    }

    const emptyAddr = await this.service.getEmptyAddress();
    console.log(`total available address: ${emptyAddr}`);

    res.status(status).json({ data: emptyAddr });
  }
}
