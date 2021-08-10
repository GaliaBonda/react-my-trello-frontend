import React from 'react';

interface IMyComponentProps {
  title?: string;
  lists?: { id: number; title: string; cards: { id: number; title: string }[] }[];
}

interface IMyComponentState {
  title: string;
  lists: { id: number; title: string; cards: { id: number; title: string }[] }[];
}

const data = {
  title: 'Моя тестовая доска',
  lists: [
    {
      id: 1,
      title: 'Планы',
      cards: [
        { id: 1, title: 'помыть кота' },
        { id: 2, title: 'приготовить суп' },
        { id: 3, title: 'сходить в магазин' },
      ],
    },
    {
      id: 2,
      title: 'В процессе',
      cards: [{ id: 4, title: 'посмотреть сериал' }],
    },
    {
      id: 3,
      title: 'Сделано',
      cards: [
        { id: 5, title: 'сделать домашку' },
        { id: 6, title: 'погулять с собакой' },
      ],
    },
  ],
};

export default class Board extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: IMyComponentProps) {
    super(props);
    this.state = data;
  }

  render(): JSX.Element {
    const boardState = this.state;
    return <h1>{boardState.title}</h1>;
  }
}