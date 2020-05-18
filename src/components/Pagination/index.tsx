import React from 'react';
import { PageActions } from './styles';

interface Props {
  disableBack: boolean;
  disableNext: boolean;
  pageLabel: number;
  currentPage: number;
  lastPage: number;
  refresh: (number: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  lastPage,
  disableBack,
  disableNext,
  pageLabel,
  refresh,
}: Props): JSX.Element => {
  const handleChange = (action: string): void => {
    const pageNumber = action === 'back' ? currentPage - 1 : currentPage + 1;
    refresh(pageNumber);
  };

  const handlePageShortcut = (action: string): void => {
    const pageNumber = action === 'last' ? lastPage : 1;
    refresh(pageNumber);
  };

  return (
    <PageActions>
      <button
        className="next-and-prev"
        type="button"
        disabled={disableBack}
        onClick={() => handleChange('back')}
      >
        Anterior
      </button>
      <button
        type="button"
        className="default"
        onClick={() => handlePageShortcut('first')}
      >
        <span>{`<<`}</span>
      </button>
      <span>{`Página ${pageLabel}`}</span>
      <button
        type="button"
        className="default"
        onClick={() => handlePageShortcut('last')}
      >
        <span>{`>>`}</span>
      </button>

      <button
        className="next-and-prev"
        type="button"
        disabled={disableNext}
        onClick={() => handleChange('next')}
      >
        Próximo
      </button>
    </PageActions>
  );
};

export default Pagination;
