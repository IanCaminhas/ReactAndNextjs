import React from 'react';
import { Title, Form, Repos, Error } from './styles';
import logo from '../../assets/logo.svg';
//Através da segiunte biblioteca, consigo importar icones do Font Awesome, Material UI, bootstrap, etc... tudo compilado dentro de uma lib: npm install react-icons
//aqui estão todos os icones do fader icon. Fazendo react-icons/ preciso informar a fonte dos ícones
import { FiChevronRight } from 'react-icons/fi';
//com Link, conseguimos navegar entre componentes da aplicação
import { Link } from 'react-router-dom';

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
  //A cada vez que fecho a aplicação, repos não existe mais. Solução: Local Storage
  const [repos, setRepos] = React.useState<GithubRepository[]>(() => {
    //Isso aqui é para preencher a lista de repos de cara, ou seja, quando o const Dashboard for carregado
    //se existe a chave, pego o conteúdo dela e armazeno em storageRepos
    const storageRepos = localStorage.getItem('@GitCollection:repositories');
    //se existe algo em storageRepos, faço um parse e coloco em repos
    if (storageRepos) {
      return JSON.parse(storageRepos);
    }
    //se não existe nada em storageRepos, retorno um array vazio
    return [];
  });

  //pegar o que foi digitado(username/repository_name), juntar na url e mandar o axios buscar pra mim.
  //Para pegar a informação do formulário, eu também preciso de um estado para lidar com o input. Assim, o campo também precisa de um estado.
  //Esse estado vai armazenar o valor informado no input
  //O resultado desse campo vai alimentar o const [repos, setRepos] no caso
  //'' significa que o estado inicial é sem valor(vazio)
  const [newRepo, setNewRepo] = React.useState('');

  //criar um estado para armazenar a mensagem de erro
  /*À medida que o usuário digitar um repositório que não existe, temos que informar algo:
  Exemplo: se não digitar nada, preciso exibir uma mensagem de erro solicitando uma username/repositoryname */
  //Vai compartar uma string dizendo para o usuário o que ele precisa fazer para usar a aplicação
  const [inputError, setInputError] = React.useState('');

  //valor inicial null. Pode ser um elemento formulário: HTMLFormElement, elemento genérico
  const formEl = React.useRef<HTMLFormElement>(null);

  //React.ChangeEvent<HTMLInputElement> -> qual tipo de elemento hmtl esse evento está atrelado ?
  //pego onde o evento gera alteração: ChangeEvent... Alteração em que ? um elemento input HTML -> HTMLInputElement
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    //Quando esse elemento se modificar, vou pegar o valor alocado e redefinir o estado. a função setNewRepo atualiza o estado newRepo
    setNewRepo(event.target.value);
  }

  /*Execução de função quando o efeito colateral ocorre. useEffect...
  Quando o componente é montado, posso ter a função do useEfec executada.
  Também posso configurar esse useEffect para ser chamado em otutro momento. exemplo:
  Quando o valor de um estado ou variável alterar.
  Pra que isso ? para salvar a lista de objetos atualizada e trabalhar essa lista junto com o local storage.
  useEffect é um hook do React
  A função executada quando o efeito colateral ocorrer. Arrow function.
  Isso é executado quando o componente é carregado:
     React.useEffect(()=>{}, [])

  Quando a variável que estiver estiver entre [] for alterada, a função ()=>{} é executada novamente
  */
  React.useEffect(() => {
    //Chave: @GitCollection:repositories. O recomendado é utilizar o nome da aplicação
    //Valor: a lista de repositórios atualizada
    localStorage.setItem('@GitCollection:repositories', JSON.stringify(repos));
    //Toda vez que o estado repos for modificado([repos]), o useEffect vai executar o trecho acima novamente.
    //A cada vez que repos é atualizada, isso é sobrescrito: '@GitCollection:repositories', JSON.stringify(repos)
  }, [repos]);

  //Com estado alterado, ou seja, com o novo valor adquirido consigo fazer a chamada no axios. Vou pegar o newRepo hehehe
  //O evento onSubmit tenta faz a requisição e um reload da página. Quero evitar isso passando um tipo de evento chamado React.FormEvent<HtmlFormElement>
  async function handleAddRepo(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    //não executar a ação padrão do onSubmit de fazer reload
    event.preventDefault();

    //Se não tiver nada em newRepo, informo um erro e paro a aplicação com o return
    if (!newRepo) {
      setInputError('Informe o username/repositório');
      return;
    }

    try {
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
      //Depois que o repositorio for encontrado, retirar a mensagem 'Repositorio nao encontrado no Github'. Se pesquisar um repo que não existe, a mensagem fica settada
      setInputError('');
    } catch {
      setInputError('Repositorio nao encontrado no Github');
    }

    //depois de atualizar a lista, vou esvaziar o input
    //? para os casos em que o current não exista. Por que a inclusão do ?... Porque formEl também pode ser um null
    formEl.current?.reset();
  }

  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catálago de repositórios do Github</Title>

      <Form
        ref={formEl}
        hasError={Boolean(inputError)}
        onSubmit={handleAddRepo}
      >
        <input
          placeholder="username/repository_name"
          onChange={handleInputChange} //quando o input for alterado, executar algo nessa função. Qualquer alteração, jogo no newRepo
        />
        <button type="submit">Buscar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repos>
        {repos.map(repository => (
          <Link
            //{`/repositories/${repository.full_name} está servindo path="/repositories/:repository" no arquivo dashboard/index.tsx
            //Antes era assim: href="/repositories"... Foi transformado para href={`/repositories/${repository.full_name}`} para comportar o param
            to={`/repositories/${repository.full_name}`}
            key={repository.full_name}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repos>
    </>
  );
};
