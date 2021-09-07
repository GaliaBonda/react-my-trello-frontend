import React from 'react';

export default function Board(props: { title: string }): JSX.Element {
  const { title } = props;
  return <div>{title}</div>;
}
