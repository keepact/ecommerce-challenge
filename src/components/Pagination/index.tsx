import React from 'react';
import { Container } from './styles';

interface Props {
  pageNumbers: number[];
  onChangePage: (number: number) => void;
}

const Pagination: React.FC<Props> = ({
  pageNumbers,
  onChangePage,
}: Props): JSX.Element => {
  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <span key={number} id={String(number)}>
        <button type="button" onClick={() => onChangePage(number)}>
          {number}
        </button>
      </span>
    );
  });

  return (
    <Container>
      <div id="page-numbers">{renderPageNumbers}</div>
    </Container>
  );
};

export default Pagination;
