import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  max-height: 475px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 450px;
  ::after {
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    z-index: 2;
    content: '';
    width: 100vw;
    height: 100vh;
    transform: scale(2.5);
  }
`;

export const Content = styled.div`
  position: absolute;
  left: 0;
  right: 25%;
  top: 0;
  bottom: 25%;
  margin: auto;
  border-radius: 4px;
  background: white;
  width: 100%;
  height: max-content;
  margin-top: -10px;
  z-index: 3;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 24px;
  p {
    font-size: 16px;
    color: #666;
    line-height: 1.63;
    padding: 0 14px;
  }
  span {
    font-size: 20px;
    color: black;
    font-weight: bold;
    margin-bottom: 10px;
    padding: 5px 10px;
    text-transform: uppercase;
  }
  button {
    align-self: center;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    min-width: 390px;
    min-height: 45px;
    border-radius: 4px;
    color: #fff;
    background: #7159c1;
    margin-top: 30px;
  }
`;
