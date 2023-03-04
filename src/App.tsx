import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import { GlobalStyle } from './styles/global';

const App: React.FC = () => {
  return (
    /*
      O react exige que exista apenas um componente de nível raiz.
      No caso temos 2 componentes, o que fazer ?
      Envolver todos os componentes em fragment: <> </>
    */
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
};

export default App;
