/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */

import React, { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import IBoard from 'src/common/interfaces/IBoard';
import Board from './components/Board/Board';
import './home.scss';
import {
  getBoards,
  postBoard,
  showModal,
  onKeyPress,
  closeModal,
  handleSubmit,
  handleChange,
} from '../../store/modules/boards/actions';
import Modal from './components/Modal/Modal';

type PropsType = {
  boards: IBoard[];
  isVisible: boolean;
  newBoardName: string;
  getBoards: () => Promise<void>;
  postBoard: () => Promise<void>;
  showModal: () => void;
  onKeyPress: () => void;
  closeModal: () => void;
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent) => void;
};

type StateType = {
  boards: {
    boards: IBoard[];
    isVisible: boolean;
    newBoardName: string;
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

  componentDidMount(): void {
    document.addEventListener('keydown', onKeyPress);
    // console.log(this.props.boards);
    // await this.props.postBoard();
    this.props.getBoards(); // await
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', onKeyPress);
  }

  render(): JSX.Element {
    const { boards, isVisible, newBoardName } = this.props;
    // console.log('boards', boards);
    // console.log(isVisible);
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
        </div>
        <Modal
          isVisible={isVisible}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          newBoardName={newBoardName}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StateType): unknown => ({
  boards: state.boards.boards,
  isVisible: state.boards.isVisible,
  newBoardName: state.boards.newBoardName,
});

export default connect(mapStateToProps, {
  getBoards,
  postBoard,
  showModal,
  onKeyPress,
  closeModal,
  handleSubmit,
  handleChange,
})(Home as any);
