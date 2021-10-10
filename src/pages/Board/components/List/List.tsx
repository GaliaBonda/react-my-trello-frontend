import React from 'react';
import ICard from '../../../../common/interfaces/ICard';
import Card from '../Card/Card';
import './list.scss';

// eslint-disable-next-line react/no-unused-prop-types
export default function List(props: { title: string; cards: ICard[] }): JSX.Element {
  const { title, cards } = props;
  const cardsArr = cards.map((item) => <Card title={item.title} key={item.id} />);
  return (
    <div className="list">
      <h2 className="list-title">{title}</h2>
      {cardsArr}
      <button className="list-btn">Создать карточку</button>
    </div>
  );
}
