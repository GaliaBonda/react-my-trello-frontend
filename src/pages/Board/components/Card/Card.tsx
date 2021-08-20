import React from 'react';
import './card.scss';

export default function Card(props: { title: string }): JSX.Element {
  const { title } = props;
  return <h3 className="card-title">{title}</h3>;
}
