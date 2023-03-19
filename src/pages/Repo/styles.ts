import styled from 'styled-components';

/*
  Nós utilizamos o Link como uma âncora, por isso o <a></a> na estilização
*/

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2;

    &:hover {
      color: #666666;
    }

    svg {
      margin-right: 4px;
    }
  }
`;
