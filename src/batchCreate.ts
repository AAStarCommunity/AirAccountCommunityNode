import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WalletService } from './modules/wallet';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(AppModule);

  const command = process.argv[2];
  const createCount = process.argv[3];
  switch (command) {
    case 'batch-create':
      if (createCount === undefined) {
        console.log('Please input create count');
        await application.close();
        process.exit(0);
      }
      if (Number(createCount) <= 0) {
        console.log('Please input create count > 0');
        await application.close();
        process.exit(0);
      }
      const walletService = application.get(WalletService);

      await walletService.batchCreate(Number(createCount));
      break;
    default:
      console.log('Command not found');
      process.exit(1);
  }

  await application.close();
  process.exit(0);
}

bootstrap();
