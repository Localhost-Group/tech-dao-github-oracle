import { Injectable } from '@nestjs/common';
import { IDataForCalculateTokens } from 'src/types';
import { RepoService } from './repo.service';
import { UserService } from './user.service';

@Injectable()
export class GithubService {
  constructor(
    private readonly userService: UserService,
    private readonly repoService: RepoService,
  ) {}
  public async handleCreatingTokens(
    authToken: string,
  ): Promise<IDataForCalculateTokens> {
    const { email, id } = await this.userService.collectDataAboutUser(
      authToken,
    );
    const dataFromRepo = await this.repoService.collectDataAboutRepos(
      id,
      authToken,
    );
    return { user: { email, id }, reposData: dataFromRepo };
  }
}
