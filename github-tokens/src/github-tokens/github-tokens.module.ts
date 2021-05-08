import { HttpModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GithubTokensController } from './github-tokens.controller';
import rabbitMqLink from './links';
import { GithubService } from './services/github.service';
import { LanguageService } from './services/language.service';
import { RepoService } from './services/repo.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'Tokens_Service',
        transport: Transport.RMQ,
        options: {
          urls: [rabbitMqLink],
          queue: 'github-auth',
        },
      },
    ]),
  ],
  controllers: [GithubTokensController],
  providers: [UserService, RepoService, LanguageService, GithubService],
})
export class GithubTokensModule {}
