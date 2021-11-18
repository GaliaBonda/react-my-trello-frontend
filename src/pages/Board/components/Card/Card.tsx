import React from 'react';
import ICard from 'src/common/interfaces/ICard';
import './card.scss';

export default function Card(props: ICard): JSX.Element {
  const { title } = props;
  return <h3 className="card-title">{title}</h3>;
}
