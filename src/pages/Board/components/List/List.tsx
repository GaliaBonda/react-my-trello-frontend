import React from 'react';
import IList from 'src/common/interfaces/IList';
import Card from '../Card/Card';
import './list.scss';

// eslint-disable-next-line react/no-unused-prop-types
export default function List(props: IList): JSX.Element {
  const { title, cards } = props;
  const cardsArr = cards.map((item) => <Card title={item.title} key={item.id} id={item.id} />);
  return (
    <div className="list">
      <h2 className="list-title">{title}</h2>
      {cardsArr}
      <button className="list-btn">Создать карточку</button>
    </div>
  );
}
