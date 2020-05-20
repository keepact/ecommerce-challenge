import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0 20px 20px 20px;
  margin-top: 20px;
`;

export const EmptyCart = styled.div`
  h2 {
    text-align: center;
  }
`;

export const ProductList = styled.div`
  max-width: 720px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 10px;
`;

export const Product = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;

  svg {
    color: ${props => props.theme.colors.primary};
  }

  img {
    width: 100px;
    height: 80px;
  }

  div {
    flex: 1;
    justify-content: center;
    padding: 0 10px;

    p {
      font-size: 18px;
      text-transform: capitalize;
      margin-bottom: 5px;
    }

    span {
      font-size: 14px;
      font-weight: bold;
      margin-top: auto;
    }
  }
  button {
    align-items: center;
    justify-content: center;
  }
`;

export const Amount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #eee;
  padding: 10px;
  margin-top: 10px;

  svg {
    color: ${props => props.theme.colors.primary};
  }

  div:first-child {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }

  input {
    background: #fff;
    width: 50px;
    padding: 4px;
    margin: 0 5px;
  }

  button {
    border: none;
  }
`;

export const Total = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 30px;

  span {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    color: gray;
    margin-bottom: 5px;
  }

  strong {
    font-size: 18px;
    text-align: center;
  }

  button {
    background: ${props => darken(0.03, props.theme.colors.primary)};
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.text};
    width: 250px;
    height: 40px;
    margin-top: 20px;

    span {
      color: ${props => props.theme.colors.text};
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      padding: 10px;
    }
  }
`;

export const BackButton = styled.div`
  align-self: flex-start;

  button {
    background: ${props => darken(0.03, props.theme.colors.primary)};
    color: ${props => props.theme.colors.text};
    align-items: center;
    justify-content: center;
    height: 40px;
    margin-bottom: 20px;
    margin-top: 0;
    width: 100px;
    font-weight: bold;
  }
`;

export const CartTitle = styled.div`
  h2 {
    padding: 20px;
  }
`;
