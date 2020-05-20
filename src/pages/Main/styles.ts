import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

export const Screen = styled.div`
  flex: 1;
  max-width: 1800px;
  padding: 0 20px;
  margin: 20px auto;
`;

export const Container = styled.div`
  display: flex;
`;

export const PokemonList = styled.div`
  @media (max-width: 699px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex-basis: 100%;
  }

  @media (min-width: 700px) {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    list-style: none;
  }

  @media (max-width: 699px) {
    div + div {
      margin-top: 10px;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
    }
    > strong {
      font-size: 16px;
      text-transform: capitalize;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }
    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs({
  type: 'button',
})`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: 0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: auto;
  display: flex;
  align-items: center;
  transition: background 0.2s;
  &:hover {
    background: ${props => darken(0.03, props.theme.colors.primary)};
  }
  div[class='spinner'] {
    svg {
      animation: ${rotate} 2s linear infinite;
    }
  }
  div {
    display: flex;
    align-items: center;
    padding: 12px;
    background: rgba(0, 0, 0, 0.1);
    svg {
      margin-bottom: 8px;
    }
  }
  > span {
    flex: 1;
    text-align: center;
    font-weight: bold;
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: white;
  padding: 20px;

  p {
    font-size: 20px;
    text-align: center;
    font-weight: bold;
  }
`;
