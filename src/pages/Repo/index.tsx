import React from 'react';
//Tudo relativo a rotas, vamos utilizar o react-router-dom
//useRouteMatch -> usar a rota que coincide ou a que eu espero
import { Link, useRouteMatch } from 'react-router-dom';
import { Header } from './styles';
import logo from '../../assets/logo.svg';
import { FiChevronLeft } from 'react-icons/fi';

interface RepositoryParams {
  repository: string;
}

export const Repo: React.FC = () => {
  //O params vai trazer o parâmetro que está sendo passado para essa página aqui
  //desestruturei apenas o params. Tenho outros recursos também a dar espaço e e dar um ctrl + espaço
  const { params } = useRouteMatch<RepositoryParams>();
  //Componente Header vai ter a imagem que é o compomente logo e um link para retornar à página raiz.

  return (
    <>
      <Header>
        <img src={logo} alt="GitCollection" />
        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Header>
    </>
  );
};
