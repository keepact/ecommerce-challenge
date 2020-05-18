import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  margin: 50px 0;
`;

export const TextInput = styled.input`
  background: red;
  height: 60px;
  flex: 1;
  margin-right: 10px;
`;

export const Cart = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }
  div {
    text-align: right;
    padding-right: 10px;
    strong {
      display: block;
    }
    span {
      font-size: 12px;
    }
  }
`;
