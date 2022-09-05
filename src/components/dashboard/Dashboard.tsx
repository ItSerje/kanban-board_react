import React from 'react';
import CardsListContainer from '../cardsList/CardsListContainer';
import './style.css';
import { Idashboard, Icolumn } from '../../models/dashboard.model';

interface IDashboardProps {
  columns: Icolumn[];
}

const Dashboard: React.FC<IDashboardProps> = ({ columns }): JSX.Element => {
  if (columns.length > 0) {
    return (
      <section className='dashboard'>
        {columns.map((column: Icolumn) => {
          const { id, name, cards } = column;
          return (
            <CardsListContainer
              cards={cards}
              key={id}
              name={name}
              columnId={id}
            />
          );
        })}
      </section>
    );
  }

  return <></>;
};

export default Dashboard;
