import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  div {
    font-size: 12px;
    display: flex;
    span {
      font-weight: bold;
      font-size: 18px;
      padding: 20px;
    }
  }

  button {
    padding: 10px;
  }
`;
