import styled from 'styled-components';
import { shade } from 'polished';

//instância do style-components que foi importada
//fazendo styled. tenho todas as tags do html
//A pagina dashboard tem uma tag h1 lá dentro.
export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;
  margin-top: 80px;
`;

export const Form = styled.form`
  margin-top: 40px;
  max-width: 700px;
  display: flex; //manter o botao ao lado do form

  input {
    flex: 1; //ocupa 100% da largura
    height: 70px; //Independentemente do tamanho de tela, o input vai ter essa altura
    padding: 0 24px;
    border: 2px solid #fff; //borda com 2 pixels e cor
    border-radius: 5px 0px 0px 5px;
    color: #3a3a3a; //cor do texto que vou digitar
    border-right: 0;

    &::placeholder {
      color: #a8a8b3; //deixa o placeholder um pouco mais claro
    }
  }

  button {
    width: 160px; //tamanho do botão
    background: #04d361; //cor do botão
    border-radius: 0px 5px 5px 0px;
    border: 0;
    color: #fff; //cor do nome do botão
    font-weight: bold; //fonte do nome do botão
    transition: background-color 0.2s; //quando eu passar o mouse, vai levar 0.2s para trocar de uma cor e ir para outra

    /*quando eu passar o mouse, eu quero dar uma escurecida
    para isso, vou usar uma biblioteca: npm install polished
    */
    &:hover {
      //quero 20% da cor do botão, ou seja, o percentual de escurecimento da cor
      background-color: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Repos = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: flex;
    align-items: center;
    transition: transform 0.2s; //acontece alguma em 0.2 segundos quando passa o mouse por cima

    &:hover {
      //vai se mover pelo eixo x 6px em 0.2segundo. 0.2 segundos para ir e 0.2 segundos para voltar.
      transform: translateX(6px);
    }

    & + a {
      margin-top: 16px;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0 16px; //margem de 0px acima/abaixo e 16px esqueda/direita
      flex: 1;

      //esse strong é o título
      strong {
        font-size: 20px;
        color: #3d3d4d; //cinza
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    //representa o ícone
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;
