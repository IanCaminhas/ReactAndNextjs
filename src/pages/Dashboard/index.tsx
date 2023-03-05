import React from 'react';
import { Title, Form, Repos } from './styles';
import logo from '../../assets/logo.svg';
//Através da segiunte biblioteca, consigo importar icones do Font Awesome, Material UI, bootstrap, etc... tudo compilado dentro de uma lib: npm install react-icons
//aqui estão todos os icones do fader icon. Fazendo react-icons/ preciso informar a fonte dos ícones
import { FiChevronRight } from 'react-icons/fi';

export const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catálago de repositórios do Github</Title>

      <Form>
        <input placeholder="username/repository_name" />
        <button type="submit">Buscar</button>
      </Form>

      <Repos>
        <a href="/repositories">
          <img
            src="https://avatars.githubusercontent.com/u/31653925?v=4"
            alt="Repositorio"
          />
          <div>
            <strong>iancaminhas/name_repository</strong>
            <p>Repositório do mini curso gratuito de reactjs</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repos>
    </>
  );
};
