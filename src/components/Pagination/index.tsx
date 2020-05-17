import React from 'react';
import { List } from './styles';

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
      <li key={number} id={String(number)}>
        <button type="button" onClick={() => onChangePage(number)}>
          {number}
        </button>
      </li>
    );
  });

  return <List id="page-numbers">{renderPageNumbers}</List>;
};

export default Pagination;
