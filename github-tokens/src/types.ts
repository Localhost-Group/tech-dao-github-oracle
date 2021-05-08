export interface IUserFromGithub {
  id: string;
  email: string;
}
export interface IProjectLanguages {
  language: string;
  languageValue: number;
}
export interface IContributorData {
  id: string;
  login: string;
}

export interface IDataForCalculateTokens {
  user: IUserFromGithub;
  reposData: Array<IRepoData>;
}

export interface IRepoData {
  projectId: string;
  stargazers_count: number;
  forks: number;
  contributors: Array<IContributorData>;
  userIsOwner: boolean;
  repoLanguages: Array<IProjectLanguages>;
}
export interface IProjectLanguages {
  language: string;
  languageValue: number;
}

export interface IRecordWithRepoInformationFromGithub {
  id: string;
  stargazers_count: number;
  forks: number;
  contributors_url: string;
  languages_url: string;
  userIsOwner: boolean;
}
