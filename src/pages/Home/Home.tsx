/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import IBoard from 'src/common/interfaces/IBoard';
import Board from './components/Board/Board';
import './home.scss';
import { getBoards, postBoard } from '../../store/modules/boards/actions';

type PropsType = {
  boards?: IBoard[];
  getBoards: () => Promise<void>;
  postBoard: () => Promise<void>;
};
type StateType = {
  boards?: IBoard[];
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

class Home extends React.Component<PropsType, StateType> {
  // constructor(props: PropsType) {
  //   super(props);
  //   this.state = boards;
  // }
  async componentDidMount(): Promise<void> {
    // await this.props.postBoard();
    await this.props.getBoards();
  }

  render(): JSX.Element {
    const { boards } = this.props;
    console.log(boards);
    // let randomColor;
    // const items = boardsArr.boards.map((item) => {
    //   randomColor = `hsla(${Math.random() * 360}, 100%, 80%, 0.6)`;
    //   return (
    //     <Link to={`/board/board_${item.id}`}>
    //       <Board title={item.title} key={item.id} color={randomColor} />
    //     </Link>
    //   );
    // });
    let randomColor;
    let items;
    if (boards) {
      items = boards.map((item) => {
        randomColor = `hsla(${Math.random() * 360}, 100%, 80%, 0.6)`;
        return (
          <Link to={`/board/board_${item.id}`} key={item.id}>
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
          <button className="new-board-btn">Создать доску</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: StateType): unknown => ({
  ...state.boards,
});
export default connect(mapStateToProps, { getBoards, postBoard })(Home);
