import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { IProjectLanguages } from 'src/types';

@Injectable()
export class LanguageService {
  constructor(private httpService: HttpService) {}

  public async getRepoLanguages(
    languages_url: string,
    authToken: string,
  ): Promise<Array<IProjectLanguages>> {
    return this.requestRepoLanguages(languages_url, authToken);
  }

  private requestRepoLanguages(
    languages_url: string,
    authToken: string,
  ): Promise<Array<IProjectLanguages>> {
    return this.httpService
      .get(languages_url, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${authToken}`,
        },
      })
      .pipe(map((result) => result.data))
      .toPromise()
      .then((repoLangs) => {
        return Object.entries(repoLangs).map((entry: [string, number]) => {
          return { language: entry[0], languageValue: entry[1] };
        });
      });
  }
}
