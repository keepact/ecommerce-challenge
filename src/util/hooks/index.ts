import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void,
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export const usePersistedState = <T>(
  key: string,
  initialState: any,
): Response<T> => {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) return JSON.parse(storageValue);
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
