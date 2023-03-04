import { createGlobalStyle } from 'styled-components';

import imgBackground from '../assets/background.svg';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    /*assim... para cada 1 rem, terei uma fonte de  93.75%...
      font-size 16px; === 1rem
      Quando a tela ficar toda cheia, que significa 1080px... a fonte deve corresponder a 93.75% de 16 px ou 1rem
    */
    //Correspondem às telas maiores
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
   //aqui já é para telas de tamanho mobile, por exemplo. Isso vai equivaler a 14px
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }
  //definindo a cor de fundo, imagem em url, 70% do tamanho da imagem e o alinhamento dela no topo
  body {
    background: #f0f0f5 url(${imgBackground}) no-repeat 70% top;
    -weki-font-smoothing: antialiased;
  }

  #root {
    //a div root vai ter tamanho máximo de 960px
    max-width: 960px;
    margin: 0 auto; //centralizar tudo. 0 em cima e em baixo; auto esquerda-direita
    padding: 2.5rem 1.25rem; //2.5 em cima e embaixo. 1.25rem esquerda-direita
  }

  button {
    //Quando o mouse parar em cima de um botão, fazer o cursor
    cursor: pointer;
  }

  a{
    color: inherit;
    text-decoration: none;
  }


`;
