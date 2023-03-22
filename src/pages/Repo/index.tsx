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

export const Repo: React.FC = () => {
  //O params vai trazer o parâmetro que está sendo passado para essa página aqui
  //desestruturei apenas o params. Tenho outros recursos também a dar espaço e e dar um ctrl + espaço
  const { params } = useRouteMatch<RepositoryParams>();
  /*muitas informações vão ser buscadas na api do GitHub quando o componente for montado
  e quando o conteúdo de params.repository for alterado. Por isso a dependência dele está entre [] */
  React.useEffect(() => {
    api
      .get(`repos/${params.repository}`)
      .then(response => console.log(response.data));

    api
      .get(`repos/${params.repository}/issues`)
      .then(response => console.log(response.data));
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

      <RepoInfo>
        <header>
          <img src="" alt="Ian Pereira Caminhas" />
          <div>
            <strong>IanCaminhas/ReactAndNextjs</strong>
            <p>Repositório do mini curso gratuito de reactjs</p>
          </div>
        </header>

        <ul>
          <li>
            <strong>2330</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>210</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>79</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepoInfo>

      <Issues>
        <Link to="/">
          <div>
            <strong>dnfdfngdrgioegh dgiodrhgidrhgdro</strong>
            <p>dfdfgdfgdfgdfg dfgkldnfgkldn nsflkdngfl</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  );
};
