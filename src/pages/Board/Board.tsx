/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import IBoard from 'src/common/interfaces/IBoard';
// import ICard from '../../common/interfaces/ICard';
import { getBoard } from 'src/store/modules/board/actions';
// import IList from 'src/common/interfaces/IList';
import ID from '../../common/interfaces/ID';
// import List from './components/List/List';
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

// interface IMyComponentState {
//   title: string;
//   lists: { id: number; title: string; cards: ICard[] }[];
// }

// const data = {
//   title: 'Моя тестовая доска',
//   lists: [
//     {
//       id: 1,
//       title: 'Планы',
//       cards: [
//         { id: 1, title: 'помыть кота' },
//         { id: 2, title: 'приготовить суп' },
//         { id: 3, title: 'сходить в магазин' },
//       ],
//     },
//     {
//       id: 2,
//       title: 'В процессе',
//       cards: [{ id: 4, title: 'посмотреть сериал' }],
//     },
//     {
//       id: 3,
//       title: 'Сделано',
//       cards: [
//         { id: 5, title: 'сделать домашку' },
//         { id: 6, title: 'погулять с собакой' },
//       ],
//     },
//   ],
// };

type PropsType = {
  board: IBoard;
  getBoard: (id: number) => Promise<void>;
};

type StateType = {
  board: IBoard;
};

let boardID: ID;

class Board extends React.Component<RouteComponentProps<TParams> & PropsType, StateType> {
  // constructor(props: RouteComponentProps<TParams> & PropsType) {
  //   super(props);
  //   this.state = data;
  // }

  async componentDidMount(): Promise<void> {
    // await this.props.postBoard();
    // eslint-disable-next-line react/destructuring-assignment
    await this.props.getBoard(boardID);
  }

  render(): JSX.Element {
    const { match } = this.props;
    const { board_id } = match.params;
    if (board_id) boardID = Number.parseInt(board_id, 10);

    const { board } = this.props;
    // eslint-disable-next-line no-console
    console.log('board', board);
    // const boardLists: IList[] = [];
    // eslint-disable-next-line no-restricted-syntax
    // for (const item of board.lists) boardLists.push(item);
    // const items = boardLists.map((item) => <List title={item.title} cards={item.cards} key={item.id} />);
    return (
      <div>{JSON.stringify(board)}</div>
      // <div className="board-container">
      //   <h1 className="board-title">{`${board.title} ${board_id}`}</h1>
      //   <div className="lists">
      //     {items}
      //     <button className="board-btn">Создать список</button>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state: StateType): unknown => {
  return state.board;
  // eslint-disable-next-line no-console
  // console.log(state);
  // const currentBoard = state.boards.find((item) => item.id === boardID);
  // return currentBoard;
};

const connectedBoard = connect(mapStateToProps, { getBoard })(Board as any);
export default withRouter(connectedBoard);
