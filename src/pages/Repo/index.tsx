import React from 'react';
//Tudo relativo a rotas, vamos utilizar o react-router-dom
//useRouteMatch -> usar a rota que coincide ou a que eu espero
import { Link, useRouteMatch } from 'react-router-dom';
import { Header, RepoInfo, Issues } from './styles';
import logo from '../../assets/logo.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { api } from '../../services/api';

interface RepositoryParams {
  repository: string;
}

//essas são as informações que vou pegar na Api do Github. O resto, é para ignorar
interface GithubRepository {
  full_name: string;
  description: string;
  forks_count: number;
  open_issues_count: number;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface GithubIssue {
  id: number;
  title: string;
  html_url: string; //Quando a pessoa clicar em cima da issue, ela vai redirecionada para a página do Github no link específico daquela issue
  user: {
    login: string;
  };
}

export const Repo: React.FC = () => {
  //valor inicial null |null. Se não for null, será do tipo GithubRepository
  const [repository, setRepository] = React.useState<GithubRepository | null>(
    null,
  );

  const [issues, setIssues] = React.useState<GithubIssue[]>([]);

  //O params vai trazer o parâmetro que está sendo passado para essa página aqui
  //desestruturei apenas o params. Tenho outros recursos também a dar espaço e e dar um ctrl + espaço
  const { params } = useRouteMatch<RepositoryParams>();
  /*muitas informações vão ser buscadas na api do GitHub quando o componente for montado
  e quando o conteúdo de params.repository for alterado. Por isso a dependência dele está entre [] */
  React.useEffect(() => {
    api
      .get(`repos/${params.repository}`)
      .then(response => setRepository(response.data)); //essa rota busca os repositórios

    api
      .get(`repos/${params.repository}/issues`)
      .then(response => setIssues(response.data)); //essa rota busca as issues
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logo} alt="GitCollection" />
        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Header>

      {repository && ( //se o repository for nulo, <RepoInfo></RepoInfo> estará oculto... Caso contrario, o que estiver entre <RepoInfo></RepoInfo> sera renderizado
        <RepoInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>

          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepoInfo>
      )}

      <Issues>
        {issues.map(
          (
            issue, // como vou ter que acessar uma página extrena, vou ter que usar o <a></a> ao invés de <Link></Link>
          ) => (
            <a href={issue.html_url} key={issue.id}>
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>
              <FiChevronRight size={20} />
            </a>
          ),
        )}
      </Issues>
    </>
  );
};
