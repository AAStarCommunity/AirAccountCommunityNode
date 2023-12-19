# CommunityNode

## Description

A node running by the community, keeping the private key with encryption, executing all instructions send by gateway.

Get a quick way, use Etherspot SDK!!!

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

```
pnpm run start

> air-account-community-node@0.0.1 start /Users/jason/Dev/Community/CommunityNode
> nest start

[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [NestFactory] Starting Nest application...
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [InstanceLoader] AppModule dependencies initialized +154ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +1ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [InstanceLoader] ConfigHostModule dependencies initialized +0ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [InstanceLoader] TerminusModule dependencies initialized +0ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized +34ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +0ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [InstanceLoader] WallectModule dependencies initialized +1ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [RoutesResolver] WalletController {/wallet}: +19ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [RouterExplorer] Mapped {/wallet/createOne, GET} route +3ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [RouterExplorer] Mapped {/wallet/test, GET} route +0ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [RouterExplorer] Mapped {/wallet/bind, POST} route +1ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [RouterExplorer] Mapped {/wallet/check, GET} route +0ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [RouterExplorer] Mapped {/wallet/clearBind, POST} route +1ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [RouterExplorer] Mapped {/wallet/transfer, POST} route +0ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [RouterExplorer] Mapped {/wallet/checkOp, GET} route +1ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [RouterExplorer] Mapped {/wallet/getBalance, GET} route +0ms
[Nest] 72614  - 11/19/2023, 1:14:30 AM     LOG [NestApplication] Nest application successfully started +3ms
```

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
## create batch
$ pnpm execute batch-create {count}

ex
```bash
pnpm execute batch-create 10
```
## Support


## License

Nest is [MIT licensed](LICENSE).
