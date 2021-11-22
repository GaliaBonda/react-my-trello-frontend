/* eslint-disable @typescript-eslint/naming-convention */
import React, { ChangeEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect, ConnectedProps } from 'react-redux';
import IBoard from 'src/common/interfaces/IBoard';
import {
  getBoard,
  openTitleInput,
  changeTitle,
  closeTitleInput,
  onKeyPress,
  deleteBoard,
} from 'src/store/modules/board/actions';
import ID from '../../common/interfaces/ID';
import List from './components/List/List';
import './components/Board/board.scss';

type TParams = { board_id: string | undefined };

type PropsType = {
  board: IBoard;
  isOnChange: boolean;
  id?: ID;
  getBoard?: (id: number) => Promise<void>;
  openTitleInput?: () => void;
  changeTitle?: (e: ChangeEvent) => void;
  onKeyPress?: () => Promise<void>;
  deleteBoard?: () => Promise<void>;
};

type StateType = {
  board: { board: IBoard };
  isOnChange: boolean;
  id: ID;
};

let boardID: ID;

class Board extends React.Component<
  RouteComponentProps<TParams> & PropsType & ConnectedProps<typeof boardConnector>,
  StateType
> {
  componentDidMount(): void {
    const { match } = this.props;
    const { board_id } = match.params;
    if (board_id) boardID = Number.parseInt(board_id, 10);
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getBoard(boardID);
  }

  render(): JSX.Element {
    const { board, isOnChange } = this.props;
    let items;
    if (board && board.lists && board.lists.length > 0) {
      items = board.lists.map((item) => <List title={item.title} cards={item.cards} key={item.id} id={item.id} />);
    }
    if (board) {
      return (
        <div className="board-container">
          {!isOnChange && <h1 className="board-title" onClick={openTitleInput}>{`${board.title} ${boardID}`}</h1>}
          {isOnChange && (
            <input
              className="board-title-input"
              type="text"
              name="input"
              data-id={boardID}
              onBlur={closeTitleInput}
              value={board.title}
              onChange={changeTitle}
              onKeyPress={onKeyPress}
            />
          )}
          <button className="board-btn delete-btn" onClick={deleteBoard} data-id={boardID}>
            Удалить доску
          </button>
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

const mapStateToProps = (state: StateType): PropsType => {
  return {
    isOnChange: state.isOnChange,
    ...state.board,
  };
};

const boardConnector = connect(mapStateToProps, {
  getBoard,
  openTitleInput,
  changeTitle,
  closeTitleInput,
  onKeyPress,
  deleteBoard,
});
export default withRouter(boardConnector(Board));
