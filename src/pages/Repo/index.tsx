import React from 'react';
//Tudo relativo a rotas, vamos utilizar o react-router-dom
//useRouteMatch -> usar a rota que coincide ou a que eu espero
import { useRouteMatch } from 'react-router-dom';

interface RepositoryParams {
  repository: string;
}

export const Repo: React.FC = () => {
  //O params vai trazer o parâmetro que está sendo passado para essa página aqui
  const { params } = useRouteMatch<RepositoryParams>();
  return <h1>Repo: {params.repository}</h1>;
};
