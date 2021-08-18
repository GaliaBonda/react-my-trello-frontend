import React from 'react';
import ICard from '../../../../common/interfaces/ICard';

// eslint-disable-next-line react/no-unused-prop-types
export default function List(props: { title: string; cards: ICard[] }): JSX.Element {
  // eslint-disable-next-line react/destructuring-assignment
  return <h2>{props.title}</h2>;
}
