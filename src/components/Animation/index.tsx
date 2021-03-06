import React from 'react';
import Lottie from 'react-lottie';

import { AnimationContainer } from './styles';

interface Props {
  animation: object;
  width?: number;
  height?: number;
  loop: boolean;
  autoplay: boolean;
  containerHeight?: string;
}

const LottieControl: React.FC<Props> = ({
  animation,
  width = 300,
  height = 300,
  loop = false,
  autoplay = true,
  containerHeight,
}: Props): JSX.Element => {
  const defaultOptions = {
    loop,
    autoplay,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <AnimationContainer containerHeight={containerHeight}>
      <Lottie
        options={defaultOptions}
        isClickToPauseDisabled
        height={height}
        width={width}
      />
    </AnimationContainer>
  );
};

export default LottieControl;
