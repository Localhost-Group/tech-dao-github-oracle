import { Module } from '@nestjs/common';
import { GithubTokensModule } from './github-tokens/github-tokens.module';

@Module({
  imports: [GithubTokensModule],
})
export class AppModule {}
