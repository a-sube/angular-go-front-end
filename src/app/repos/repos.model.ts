export class Repo {
    constructor(
       public ID: number,
       public name: string,
       public full_name: string,
       public html_url: string,
       public description: string,
       public stargazers_count: number,
       public forks_count: number,
       public avatar_url: string,
       public readme: string,
       public modules: Repo[],
    ) {}
}