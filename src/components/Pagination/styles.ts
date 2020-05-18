import styled from 'styled-components';

export const PageActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  max-width: 800px;
  margin: 30px auto 0;
  span {
    font-weight: bold;
    font-size: 18px;
  }
  button {
    background: #7159c1;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    transition: opacity 0.25s ease-out;
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;
    &[disabled] {
      opacity: 0.35;
      cursor: not-allowed;
    }
    &[disabled]:hover {
      opacity: 0.35;
    }
    &:hover {
      opacity: 0.7;
    }
  }
`;
