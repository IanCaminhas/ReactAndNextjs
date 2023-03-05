import React from 'react';
import { Title, Form, Repos } from './styles';
import logo from '../../assets/logo.svg';
//Através da segiunte biblioteca, consigo importar icones do Font Awesome, Material UI, bootstrap, etc... tudo compilado dentro de uma lib: npm install react-icons
//aqui estão todos os icones do fader icon. Fazendo react-icons/ preciso informar a fonte dos ícones
import { FiChevronRight } from 'react-icons/fi';

import { api } from '../../services/api';

//essas são as informações que vou pegar na Api do Github. O resto, é para ignorar
interface GithubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const Dashboard: React.FC = () => {
  //é estado inicial da lista de repositórios. Inicialmente recebe um [], ou seja, um array vazio.
  //Prciso informar o tipo que o estado vai manipular. No caso é o GithubRepository[]
  const [repos, setRepos] = React.useState<GithubRepository[]>([]);

  //pegar o que foi digitado(username/repository_name), juntar na url e mandar o axios buscar pra mim.
  //Para pegar a informação do formulário, eu também preciso de um estado para lidar com o input. Assim, o campo também precisa de um estado.
  //Esse estado vai armazenar o valor informado no input
  //O resultado desse campo vai alimentar o const [repos, setRepos] no caso
  //'' significa que o estado inicial é sem valor(vazio)
  const [newRepo, setNewRepo] = React.useState('');

  //React.ChangeEvent<HTMLInputElement> -> qual tipo de elemento hmtl esse evento está atrelado ?
  //pego onde o evento gera alteração: ChangeEvent... Alteração em que ? um elemento input HTML -> HTMLInputElement
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    //Quando esse elemento se modificar, vou pegar o valor alocado e redefinir o estado. a função setNewRepo atualiza o estado newRepo
    setNewRepo(event.target.value);
  }

  //Com estado alterado, ou seja, com o novo valor adquirido consigo fazer a chamada no axios. Vou pegar o newRepo hehehe
  //O evento onSubmit tenta faz a requisição e um reload da página. Quero evitar isso passando um tipo de evento chamado React.FormEvent<HtmlFormElement>
  async function handleAddRepo(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    //não executar a ação padrão do onSubmit de fazer reload
    event.preventDefault();
    //Ao fazer o get, o axios já sabe o que vai retornar: await api.get<GithubRepository>
    //Nós informamos a url base, não é necessário informá-la mais: 'https://api.github.com'. Está em services/api.ts
    const response = await api.get<GithubRepository>(`repos/${newRepo}`);

    /* apenas um teste de exemplo hehehe
    console.log(response);
    return;
    */

    const repository = response.data;
    //. estou pegando todos os elementos do array atual mais o repositório buscado.
    //...repos é o spread que pega todos os elementos atuais
    //estou atualizando a lista de repositórios
    setRepos([...repos, repository]);

    //depois de atualizar a lista, vou esvaziar o input
  }

  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catálago de repositórios do Github</Title>

      <Form onSubmit={handleAddRepo}>
        <input
          placeholder="username/repository_name"
          onChange={handleInputChange} //quando o input for alterado, executar algo nessa função. Qualquer alteração, jogo no newRepo
        />
        <button type="submit">Buscar</button>
      </Form>

      <Repos>
        {repos.map(repository => (
          <a href="/repositories" key={repository.full_name}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repos>
    </>
  );
};
