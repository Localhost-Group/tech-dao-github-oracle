import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { IUserFromGithub } from 'src/types';

@Injectable()
export class UserService {
  private githubApiUrl: string = 'https://api.github.com/user';
  constructor(private httpService: HttpService) {}
  public async collectDataAboutUser(
    authToken: string,
  ): Promise<IUserFromGithub> {
    const { email, id } = await this.httpService
      .get(this.githubApiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .pipe(map((result) => result.data))
      .toPromise();
    return { email, id };
  }
}
