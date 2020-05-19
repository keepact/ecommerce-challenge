import React from 'react';

import { Container, Content, Wrapper } from './styles';
import Animation from '../Animation';

interface Props {
  animation: object;
  title: string;
  text: string;
  onClick:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  buttonLabel: string;
}

const Modal: React.FC<Props> = ({
  onClick,
  title,
  text,
  animation,
  buttonLabel,
}: Props): JSX.Element => {
  return (
    <Container>
      <Content>
        <Wrapper>
          <Animation
            containerHeight="20vh"
            animation={animation}
            width={100}
            height={100}
            autoplay
            loop
          />
          <span>{title}</span>
          <p>{text}</p>
          <button type="button" onClick={onClick}>
            {buttonLabel}
          </button>
        </Wrapper>
      </Content>
    </Container>
  );
};

export default Modal;
