/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { ChangeEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import IBoard from 'src/common/interfaces/IBoard';
// import ICard from '../../common/interfaces/ICard';
import { getBoard, openTitleInput, changeTitle } from 'src/store/modules/board/actions';
// import IList from 'src/common/interfaces/IList';
import ID from '../../common/interfaces/ID';
import List from './components/List/List';
import './components/Board/board.scss';

// interface IMyComponentProps {
//   title?: string;
//   lists?: { id: number; title: string; cards: ICard[] }[];
//   match?: unknown;
// }

type TParams = { board_id: string | undefined };

// type PropsType = {
//   boards?: IBoard[];
//   getBoards: () => Promise<void>;
//   postBoard: () => Promise<void>;
// };

type PropsType = {
  board: IBoard;
  isOnChange: boolean;
  getBoard: (id: number) => Promise<void>;
  openTitleInput: () => void;
  changeTitle: (e: ChangeEvent) => void;
};

type StateType = {
  board: IBoard;
  isOnChange: boolean;
};

let boardID: ID;

class Board extends React.Component<RouteComponentProps<TParams> & PropsType, StateType> {
  // constructor(props: RouteComponentProps<TParams> & PropsType) {
  //   super(props);
  //   this.state = data;
  // }

  componentDidMount(): void {
    // await this.props.postBoard();
    const { match } = this.props;
    const { board_id } = match.params;
    // console.log('I work');
    if (board_id) boardID = Number.parseInt(board_id, 10);
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getBoard(boardID);
  }

  render(): JSX.Element {
    // const { match } = this.props;
    // const { board_id } = match.params;
    // if (board_id) boardID = Number.parseInt(board_id, 10);

    const { board, isOnChange } = this.props;
    console.log('board', board);
    console.log('isOnChange', isOnChange);
    let items;
    if (board && board.lists && board.lists.length > 0) {
      items = board.lists.map((item) => <List title={item.title} cards={item.cards} key={item.id} />);
    }
    if (board) {
      return (
        // <div>{JSON.stringify(board)}</div>
        <div className="board-container">
          {!isOnChange && <h1 className="board-title" onClick={openTitleInput}>{`${board.title} ${boardID}`}</h1>}
          {isOnChange && (
            <input
              className="board-title-input"
              type="text"
              name="input"
              // onClick={openTitleInput}
              value={board.title}
              onChange={changeTitle}
            />
          )}
          <div className="lists">
            {items}
            <button className="board-btn">Создать список</button>
          </div>
        </div>
      );
    }
    return (
      <div className="board-container">
        <h1 className="board-title">Доска не найдена</h1>
        <div className="lists">
          <button className="board-btn">Создать список</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: StateType): unknown => {
  return {
    isOnChange: state.isOnChange,
    ...state.board,
  };
  // eslint-disable-next-line no-console
  // console.log(state);
  // const currentBoard = state.boards.find((item) => item.id === boardID);
  // return currentBoard;
};

const connectedBoard = connect(mapStateToProps, { getBoard, openTitleInput, changeTitle })(Board as any);
export default withRouter(connectedBoard);
