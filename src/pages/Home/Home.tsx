/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */

import React, { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import IBoards from 'src/common/interfaces/IBoard';
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
  boards: IBoards[];
  isVisible: boolean;
  newBoardName: string;
  isValide: boolean;
  getBoards: () => Promise<void>;
  postBoard: () => Promise<void>;
  showModal: () => void;
  onKeyPress: () => void;
  closeModal: () => void;
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent) => void;
};

type StateType = {
  boards: { boards: IBoards[]; isVisible: boolean; newBoardName: string; isValide: boolean };
};

class Home extends React.Component<PropsType, StateType> {
  componentDidMount(): void {
    document.addEventListener('keydown', onKeyPress);
    this.props.getBoards();
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', onKeyPress);
  }

  render(): JSX.Element {
    const { boards, isVisible, newBoardName, isValide } = this.props;
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
          isValide={isValide}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StateType): unknown => ({
  boards: state.boards.boards,
  isVisible: state.boards.isVisible,
  isValide: state.boards.isValide,
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
