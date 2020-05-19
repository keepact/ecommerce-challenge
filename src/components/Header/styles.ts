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
  background: #7159c1;
  color: white;
  font-weight: bold;
  box-shadow: 10px 10px 50px 1px rgba(0, 0, 0, 0.2);
  height: 60px;
  flex: 1;
  margin-right: 10px;
  padding-left: 20px;
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

export const CartHeader = styled.div`
  background-color: #7159c1;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;

  img {
    width: 120px;
    height: 120px;
    margin-left: 20px;
  }

  h3 {
    color: white;
    margin-right: 20px;
  }
`;
