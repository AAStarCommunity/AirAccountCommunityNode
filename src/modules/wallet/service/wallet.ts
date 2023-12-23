import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {IsNull, Repository} from 'typeorm';
import {Wallet} from '../../../entities/wallect.entity';
import {PrimeSdk} from '@etherspot/prime-sdk';
import {ethers} from 'ethers';

interface Response {
  status: number;
  message: string;
  data: any;
}
@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}
  //'asthma prize volume artefact mule gentle drastic amused general wait barrel student';
  async create() {
    const mnemonic =
      'asthma prize volume artefact mule gentle drastic amused general wait barrel student';
    // create HD wallet
    const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);

    // generate path：m / purpose' / coin_type' / account' / change / address_index
    const basePath = "m/44'/60'/0'/0";
    const hdNodeNew = hdNode.derivePath(basePath + '/' + 8);
    // const walletNew = new ethers.Wallet(hdNodeNew.privateKey);
    // Create AA Wallet with HD Wallet
    console.log(hdNodeNew);
    return '';
  }
  async batchCreate(numWallet: number): Promise<string> {
    //const wallets = [];
    // send five wallets
    console.log('batchCreate start ....');
    for (let i = 0; i < numWallet; i++) {
      await (async () => {
        // generate random mnemonic
        const mnemonic = ethers.Mnemonic.entropyToPhrase(
          ethers.randomBytes(32),
        );
        // create HD wallet
        const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
        const wallet = ethers.Wallet.fromPhrase(mnemonic);

        // The password used to encrypt json can be changed to something else
        const pwd = 'planckerDev';
        const json = await wallet.encrypt(pwd);

        // generate path：m / purpose' / coin_type' / account' / change / address_index
        // const basePath = "m/44'/60'/0'/0";
        // const hdNodeNew = hdNode.derivePath(basePath + '/' + i);

        // const walletNew = new ethers.Wallet(hdNodeNew.privateKey);
        // Create AA Wallet with HD Wallet
        const primeSdk = new PrimeSdk(
          {
            privateKey: hdNode.privateKey,
          },
          {
            chainId: Number(process.env.CHAIN_ID) || 11155111,
            projectKey: '',
            rpcProviderUrl: process.env.CHAIN_PROVIDER || 'https://sepolia-bundler.etherspot.io/',
          },
        );
        const address: string = await primeSdk.getCounterFactualAddress();

        // save sqllite
        await this.walletRepository.save({
          address: address,
          password: JSON.stringify(json),
        });
        console.log(`create wallet: ${i + 1} ${address}`);
      })();
    }
    return '';
  }
  async bind(certificate: string): Promise<Response> {
    // check the phone number
    // check the phone number is bind
    // create hash
    // go to bind
    try {
      const existsWallet: Wallet = await this.walletRepository.findOne({
        where: {
          certificate: certificate,
        },
      });
      if (!existsWallet) {
        const FindWallet: Wallet = await this.walletRepository.findOne({
          where: {
            certificate: IsNull(),
          },
        });

        if (!FindWallet) {
          return {
            status: 404,
            message: 'no wallet',
            data: null,
          };
        } else {
          const rlt = await this.walletRepository.update(
            { id: FindWallet.id },
            { certificate: certificate },
          );
          console.log(rlt)
        }

        return {
          status: 200,
          message: 'success',                    
          data: null,
        };
      } else {
        // using interface  Response return result
        return {
          status: 409,
          message: 'this certificate is bind',
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: 'bind error',
        data: null,
      };
    }
  }
  async check(certificate: string): Promise<Response> {
    const result = await this._check(certificate);

    return result
      ? {
          status: 200,
          message: 'ok',
          data: null,
        }
      : {
          status: 404,
          message: 'no wallet',
          data: null,
        };
  }
  async _check(certificate: string): Promise<boolean> {
    const FindWallet: Wallet = await this.walletRepository.findOne({
      where: {
        certificate: certificate,
      },
    });

    return !!FindWallet;
  }
  async clearBind(certificate: string): Promise<Response> {
    const FindWallet: Wallet = await this.walletRepository.findOne({
      where: {
        certificate: certificate,
      },
    });

    try {
      if (!FindWallet) {
        return {
          status: 404,
          message: 'no wallet',
          data: null,
        };
      } else {
        await this.walletRepository.update(
          { id: FindWallet.id },
          { certificate: null },
        );
      }
    } catch (error) {
      return {
        status: 500,
        message: 'bind error',
        data: null,
      };
    }

    return {
      status: 200,
      message: 'ok',
      data: null,
    };
  }

  async transfer(
    fromCertificate: string,
    toCertificate: string,
    value: string,
  ): Promise<Response | undefined> {
    /**
     * from 0x1eaCDaB310f44dbFDe3DaAa6c663A2818843388B
     * to 0x1eaCDaB310f44dbFDe3DaAa6c663A2818843388B
     * value 0.01
     */
    //** example

    // get from wallet
    const fromWallets: Wallet[] = await this.walletRepository.findBy({});
    let fromWallet: Wallet
    for (let i = 0; i < fromWallets.length; i++) {
      if (fromWallets[i].certificate === fromCertificate){
        fromWallet = fromWallets[i]
        break
      }
    }
    // const fromWallet: Wallet = await this.walletRepository.findOne({
    //   where: {
    //     certificate: fromCertificate,
    //   },
    // });
    // get recipient wallet
    // const recipientWallet: Wallet = await this.walletRepository.findOne({
    //   where: {
    //     certificate: toCertificate,
    //   },
    // });
    const recipientWallets: Wallet[] = await this.walletRepository.findBy({});
    let recipientWallet: Wallet
    for (let i = 0; i < recipientWallets.length; i++) {
      if (recipientWallets[i].certificate === toCertificate){
        recipientWallet = recipientWallets[i]
        break
      }
    }
    if (!fromWallet || !recipientWallet) {
      return {
        status: 404,
        message: 'no wallet',
        data: null,
      };
    }
    const recipient = recipientWallet.address;
    const primeSdk = await this._createPrimeSdk(fromWallet.certificate);

    const address: string = await primeSdk.getCounterFactualAddress();
    //0x1eaCDaB310f44dbFDe3DaAa6c663A2818843388B
    console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);
    await primeSdk.clearUserOpsFromBatch();
    const transactionBatch = await primeSdk.addUserOpsToBatch({
      to: recipient,
      value: ethers.parseEther(value),
    });
    console.log('transactions: ', transactionBatch);
    //get balance of the account address
    const balance = await primeSdk.getNativeBalance();

    console.log('balances: ', balance);

    // balance > value
    if (balance < value) {
      return {
        status: 400,
        message: 'balance is not enough',
        data: null,
      };
    }
    // estimate transactions added to the batch and get the fee data for the UserOp
    const op = await primeSdk.estimate();

    //console.log(`Estimate UserOp: ${await printOp(op)}`);

    // sign the UserOp and sending to the bundler...
    const uoHash = await primeSdk.send(op);
    console.log(`UserOpHash: ${uoHash}`);

    return {
      status: 200,
      message: 'success',
      data: uoHash,
    };
  }

  async checkOp(op: string): Promise<Response | undefined> {
    try {
      const primeSdk = await this._createPrimeSdk('');

      //0x11782af2acd41bf5573d587ff866546eb2e53ea354af6607001fbcd0a28f3ae6
      const userOpsReceipt = await primeSdk.getUserOpReceipt(op["op"]);

      if (userOpsReceipt.success) {
        return {
          status: 200,
          message: 'success',
          data: null,
        };
      } else {
        return {
          status: 400,
          message: 'fail',
          data: null,
        };
      }
    } catch (error) {
      return {
        status: 400,
        message: 'fail',
        data: null,
      };
    }
  }
  async _createPrimeSdk(certificate: string): Promise<PrimeSdk> {
    let privateKey = null;
    if (certificate === '') {
      // generate random mnemonic
      const mnemonic = ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(32));
      // create HD wallet
      const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
      privateKey = hdNode.privateKey;
    } else {
      let wallet : Wallet
      const wallets: Wallet[] = await this.walletRepository.findBy({});
      for (let i = 0; i < wallets.length; i++) {
        if (typeof(certificate) === "string"){
          if (wallets[i].certificate === certificate){
            wallet = wallets[i]
            break
          }
        }else{
          if (wallets[i].certificate === certificate["Certificate"]){
            wallet = wallets[i]
            break
          }
        }
      }
      if (wallet!=null){
        const pwd = 'planckerDev';
        const wallet2 = await ethers.Wallet.fromEncryptedJson(
            JSON.parse(wallet.password),
            pwd,
        );
        const mnemonic = wallet2['mnemonic'].phrase;

        const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
        privateKey = hdNode.privateKey
      }
    }

    // Create AA Wallet with HD Wallet
    return new PrimeSdk(
        {
          privateKey: privateKey,
        },
        {
          chainId: Number(process.env.CHAIN_ID) || 11155111,
          projectKey: '',
          rpcProviderUrl: process.env.CHAIN_PROVIDER || 'https://sepolia-bundler.etherspot.io/',
        },
    );
  }
  async getBalance(certificate: string): Promise<Response | undefined> {
    try {
      const primeSdk = await this._createPrimeSdk(certificate);
      const balance = await primeSdk.getNativeBalance();

      console.log('balances: ', balance);
      return {
        status: 200,
        message: 'success',
        data: balance,
      };
    } catch (error) {
      return {
        status: 400,
        message: 'fail',
        data: null,
      };
    }
  }

  async getEmptyAddress(): Promise<number>{
    return await this.walletRepository.count({
      where:{
        "certificate": null
      }
    })
  }
}
