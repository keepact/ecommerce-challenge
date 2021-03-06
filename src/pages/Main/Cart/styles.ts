import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { darken } from 'polished';

export const Container = styled.div`
  @media (max-width: 1279px) {
    display: none;
  }

  padding: 30px;
  margin-left: 10px;
  background: #fff;
  border-radius: 4px;

  footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.text};
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;
      &:hover {
        background: ${props => darken(0.03, props.theme.colors.primary)};
      }
    }
  }
`;

export const ProductTable = styled.table`
  width: 100%;

  .display {
    opacity: 0;
  }

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;

    svg {
      color: ${props => props.theme.colors.primary};
    }
  }

  img {
    height: 100px;
  }

  strong {
    color: #333;
    text-transform: capitalize;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 16px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 6px;
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 28px;
    margin-left: 5px;
  }
`;

export const CartTitle = styled.div`
  h2 {
    padding: 20px;
  }
`;

export const EmptyCart = styled.div`
  h2 {
    text-align: center;
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  border-top: 1px solid #dfdfdf;
  max-height: 650px;
  height: auto;
  padding: 5px 15px;
`;
