import styled from 'styled-components';

interface Props {
  containerHeight?: string;
}

export const AnimationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props: Props) => props.containerHeight ?? '50vh'};
`;
