import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { GithubService } from './services/github.service';

@Controller()
export class GithubTokensController {
  constructor(private readonly githubService: GithubService) {}

  @EventPattern('github_token')
  async handleCollectingData(data: string): Promise<void> {
    const dataAboutUserRepos = await this.githubService.handleCreatingTokens(
      data,
    );
    console.log(dataAboutUserRepos.user);
    dataAboutUserRepos.reposData.forEach((repo) => console.log(repo));
  }
}
