/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
// import { connect } from 'react-redux';
import ICard from '../../common/interfaces/ICard';
import List from './components/List/List';
import './components/Board/board.scss';

// interface IMyComponentProps {
//   title?: string;
//   lists?: { id: number; title: string; cards: ICard[] }[];
//   match?: unknown;
// }

type TParams = { board_id: string | undefined };

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

class Board extends React.Component<RouteComponentProps<TParams>, IMyComponentState> {
  constructor(props: RouteComponentProps<TParams>) {
    super(props);
    this.state = data;
  }

  render(): JSX.Element {
    const { match } = this.props;
    const { board_id } = match.params;

    const boardState = this.state;
    const items = boardState.lists.map((item) => <List title={item.title} cards={item.cards} key={item.id} />);
    return (
      <div className="board-container">
        <h1 className="board-title">{`${boardState.title} ${board_id}`}</h1>
        <div className="lists">
          {items}
          <button className="board-btn">Создать список</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Board);
