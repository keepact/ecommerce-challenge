import styled from 'styled-components';
import { darken } from 'polished';
import PerfectScrollbar from 'react-perfect-scrollbar';

interface Props {
  visible?: boolean;
}

export const Container = styled.div`
  position: relative;
  display: ${(props: Props) => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 40px);
    top: 18px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(255, 255, 255, 0.7);
  }

  @media (min-width: 1280px) {
    display: none;
  }

  footer {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 15px;
  }
`;

export const Content = styled.div`
  display: grid;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 10px;
  grid-template-columns: 60% auto;
  grid-gap: 15px;
  padding-bottom: 10px;

  .qty {
    margin-top: 3px;
    font-size: 10px;
  }

  div:first-child {
    display: flex;
    flex-direction: row;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
  div:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Total = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;

  button {
    background: #7159c1;
    color: #fff;
    border: 0;
    border-radius: 4px;
    margin-top: 10px;
    padding: 12px 20px;
    font-weight: bold;
    font-size: 10px;
    text-transform: uppercase;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.03, '#7159c1')};
    }
  }

  span {
    color: #999;
    font-size: 12px;
    font-weight: bold;
  }
  strong {
    font-size: 16px;
    margin-left: 5px;
  }
`;

export const CartBasket = styled.div`
  position: absolute;
  width: 320px;
  left: calc(50% - 300px);
  top: calc(100% + 30px);
  background: #fff;
  border-radius: 4px;
  padding: 15px 5px;

  p {
    padding: 5px;
    font-weight: bold;
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  border-top: 1px solid #dfdfdf;
  max-height: 260px;
  padding: 5px 15px;
`;
