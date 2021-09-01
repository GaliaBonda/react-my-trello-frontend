import React from 'react';
import ICard from '../../common/interfaces/ICard';
import List from './components/List/List';
import './components/Board/board.scss';

interface IMyComponentProps {
  title?: string;
  lists?: { id: number; title: string; cards: ICard[] }[];
}

interface IMyComponentState {
  title: string;
  lists: { id: number; title: string; cards: ICard[] }[];
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
    // eslint-disable-next-line react/no-array-index-key
    const items = boardState.lists.map((item, index) => <List title={item.title} cards={item.cards} key={index} />);
    return (
      <div className="board-container">
        <h1 className="board-title">{boardState.title}</h1>
        <div className="lists">
          {items}
          <button className="board-btn">Создать список</button>
        </div>
      </div>
    );
  }
}
