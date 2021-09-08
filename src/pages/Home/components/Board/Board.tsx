import React from 'react';
import './board.scss';

export default function Board(props: { title: string; color: string }): JSX.Element {
  const { title } = props;
  const { color } = props;
  return (
    <h3 className="board" style={{ backgroundColor: color }}>
      {title}
    </h3>
  );
}
