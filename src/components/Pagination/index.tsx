import React from 'react';
import { PageActions } from './styles';

interface Props {
  disableBack: boolean;
  disableNext: boolean;
  pageLabel: number;
  currentPage: number;
  refresh: (number: number) => void;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  disableBack,
  disableNext,
  pageLabel,
  refresh,
}: Props): JSX.Element => {
  const handleChange = (action: string) => {
    const pageNumber = action === 'back' ? currentPage - 1 : currentPage + 1;
    refresh(pageNumber);
  };

  return (
    <PageActions>
      <button
        type="button"
        disabled={disableBack}
        onClick={() => handleChange('back')}
      >
        Anterior
      </button>
      <span>
        Página
        {pageLabel}
      </span>
      <button
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
