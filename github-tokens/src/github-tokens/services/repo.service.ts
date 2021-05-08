import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import {
  IRepoData,
  IRecordWithRepoInformationFromGithub,
  IContributorData,
} from 'src/types';
import { LanguageService } from './language.service';

@Injectable()
export class RepoService {
  private githubApiUrl: string = 'https://api.github.com/user/repos';
  constructor(
    private httpService: HttpService,
    private languageHandler: LanguageService,
  ) {}
  public async collectDataAboutRepos(
    userId: string,
    authToken: string,
  ): Promise<Array<IRepoData>> {
    const userRepos = await this.getUserRepos(authToken).toPromise();
    const procesedDataAboutRepos = this.processDataFromGithubApi(
      userId,
      userRepos,
    );
    return this.handleCollectingDataAboutContributorsAndLangugaes(
      authToken,
      procesedDataAboutRepos,
    );
  }

  private async handleCollectingDataAboutContributorsAndLangugaes(
    authToken: string,
    procesedDataAboutRepos: IRecordWithRepoInformationFromGithub[],
  ) {
    const accumulatorOfRepoData: Array<IRepoData> = [];
    for (const repo of procesedDataAboutRepos) {
      const {
        id,
        contributors_url,
        languages_url,
        userIsOwner,
        stargazers_count,
        forks,
      } = repo;
      const contributors = await this.getRepoContributors(
        contributors_url,
        authToken,
      );
      const repoLanguages = await this.languageHandler.getRepoLanguages(
        languages_url,
        authToken,
      );
      accumulatorOfRepoData.push({
        userIsOwner,
        repoLanguages,
        projectId: id,
        stargazers_count,
        forks,
        contributors,
      });
    }
    return accumulatorOfRepoData;
  }

  private getUserRepos(authToken: string) {
    return this.httpService
      .get(this.githubApiUrl, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${authToken}`,
        },
      })
      .pipe(map((result) => result.data));
  }

  p;

  private async getRepoContributors(
    contributors_url: string,
    authToken: string,
  ): Promise<Array<IContributorData>> {
    const contriubutorsData = await this.httpService
      .get(contributors_url, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${authToken}`,
        },
      })
      .pipe(map((result) => result.data))
      .toPromise();
    return contriubutorsData.map((el) => {
      const { id, login } = el;
      return { id, login };
    });
  }

  private processDataFromGithubApi(userId: string, dataFromGithubApi: any) {
    const arrWithResults: Array<IRecordWithRepoInformationFromGithub> = [];
    dataFromGithubApi.forEach((element) => {
      const repoId = element.id;
      const {
        stargazers_count,
        forks,
        contributors_url,
        languages_url,
        owner,
      } = element;
      const { id } = owner;
      const userIsOwner = id === userId ? true : false;
      arrWithResults.push({
        id: repoId,
        stargazers_count,
        forks,
        contributors_url,
        languages_url,
        userIsOwner,
      });
    });
    return arrWithResults;
  }
}
