/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import IBoard from 'src/common/interfaces/IBoard';
import Board from './components/Board/Board';
import './home.scss';
import { getBoards, postBoard, showModal, onKeyPress } from '../../store/modules/boards/actions';
import Modal from './components/Modal/Modal';

type PropsType = {
  boards: IBoard[];
  isVisible: boolean;
  getBoards: () => Promise<void>;
  postBoard: () => Promise<void>;
  showModal: () => void;
  onKeyPress: () => void;
};
type StateType = {
  boards: {
    boards: IBoard[];
    isVisible: boolean;
  };
};

// interface IMyComponentState {
//   boards: { id: number; title: string }[];
// }

// interface IMyComponentProp {
//   boards?: { id: number; title: string }[];
// }

// const boards = {
//   boards: [
//     { id: 1, title: 'покупки' },
//     { id: 2, title: 'подготовка к свадьбе' },
//     { id: 3, title: 'разработка интернет-магазина' },
//     { id: 4, title: 'курс по продвижению в соцсетях' },
//   ],
// };

// let modalIsVisible: boolean;

class Home extends React.Component<PropsType, StateType> {
  // constructor(props: PropsType) {
  //   super(props);
  //   this.state = boards;
  // }

  async componentDidMount(): Promise<void> {
    document.addEventListener('keydown', onKeyPress);
    // console.log(this.props.boards);
    // await this.props.postBoard();
    await this.props.getBoards();
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', onKeyPress);
  }

  render(): JSX.Element {
    const { boards } = this.props;
    console.log('boards', boards);
    const { isVisible } = this.props;
    console.log(isVisible);
    let randomColor;
    let items;
    if (boards) {
      items = boards.map((item) => {
        randomColor = `hsla(${Math.random() * 360}, 100%, 80%, 0.6)`;
        return (
          <Link to={`/board/${item.id}`} key={item.id}>
            <Board title={item.title} key={item.id} color={randomColor} />
          </Link>
        );
      });
    }
    return (
      // <div>{JSON.stringify(boards)}</div>
      <div className="boards-container">
        <div className="boards">
          {items}
          <button className="new-board-btn" onClick={showModal}>
            Создать доску
          </button>
          <Modal isVisible={isVisible} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: StateType): unknown => ({
  boards: state.boards.boards,
  isVisible: state.boards.isVisible,
});

export default connect(mapStateToProps, { getBoards, postBoard, showModal, onKeyPress })(Home as any);
