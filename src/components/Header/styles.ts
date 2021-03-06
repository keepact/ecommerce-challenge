import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  margin: 20px 0;
`;

export const TextInput = styled.input`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  font-weight: bold;
  box-shadow: 10px 10px 50px 1px rgba(0, 0, 0, 0.2);
  height: 60px;
  flex: 1;
  margin-right: 10px;
  padding-left: 20px;
  ::placeholder {
    color: ${props => props.theme.colors.text};
    opacity: 1;
  }
`;

export const Cart = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }

  button {
    position: relative;
  }

  span {
    background: ${props => props.theme.colors.primary};
    border-radius: 10px;
    color: #fff;
    font-size: 11px;
    position: absolute;
    padding: 2px;
    text-align: center;
    right: -8;
    top: -8;
    min-height: 18px;
    min-width: 18px;
  }
`;

export const CartHeader = styled.div`
  background-color: ${props => props.theme.colors.primary};
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
    color: ${props => props.theme.colors.text};
    margin-right: 20px;
    text-transform: uppercase;
  }
`;

export const GroupButtons = styled.div`
  div {
    padding: 20px;
    display: flex;
    justify-content: space-around;

    button {
      font-weight: bold;
      padding: 10px 10px;
      color: ${props => props.theme.colors.text};
    }

    button:first-child {
      background-color: #b5610d;
    }

    button:nth-child(2) {
      background-color: #524e3c;
    }

    button:nth-child(3) {
      background-color: #230a33;
    }

    button:last-child {
      background-color: #7159c1;
    }
  }
`;
