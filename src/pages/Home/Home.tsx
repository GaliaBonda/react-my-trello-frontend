import React from 'react';
import { Link } from 'react-router-dom';
import Board from './components/Board/Board';
import './home.scss';

interface IMyComponentState {
  boards: { id: number; title: string }[];
}

interface IMyComponentProp {
  boards?: { id: number; title: string }[];
}

const boards = {
  boards: [
    { id: 1, title: 'покупки' },
    { id: 2, title: 'подготовка к свадьбе' },
    { id: 3, title: 'разработка интернет-магазина' },
    { id: 4, title: 'курс по продвижению в соцсетях' },
  ],
};

export default class Home extends React.Component<IMyComponentProp, IMyComponentState> {
  constructor(props: IMyComponentProp) {
    super(props);
    this.state = boards;
  }

  render(): JSX.Element {
    const boardsArr = this.state;
    let randomColor;
    const items = boardsArr.boards.map((item) => {
      randomColor = `hsla(${Math.random() * 360}, 100%, 80%, 0.6)`;
      return (
        <Link to={`/board/board_${item.id}`}>
          <Board title={item.title} key={item.id} color={randomColor} />
        </Link>
      );
    });
    return (
      <div className="boards-container">
        <div className="boards">
          {items}
          <button className="new-board-btn">Создать доску</button>
        </div>
      </div>
    );
  }
}
