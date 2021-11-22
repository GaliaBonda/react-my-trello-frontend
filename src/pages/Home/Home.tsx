import React, { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import IBoards from 'src/common/interfaces/IBoard';
import Board from './components/Board/Board';
import './home.scss';
import { getBoards, postBoard, handleSubmit, handleChange } from '../../store/modules/boards/actions';
import Modal from './components/Modal/Modal';

type PropsType = {
  boards: IBoards[];
  newBoardName: string;
  isValide: boolean;
  getBoards?: () => Promise<void>;
  postBoard?: () => Promise<void>;
  handleSubmit?: (e: FormEvent) => void;
  handleChange?: (e: ChangeEvent) => void;
};

type StateType = {
  boards: { boards: IBoards[]; newBoardName: string; isValide: boolean };
  modalIsVisible: boolean;
};

class Home extends React.Component<PropsType & ConnectedProps<typeof homeConnector>, StateType> {
  constructor(props: PropsType & ConnectedProps<typeof homeConnector>) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      boards: { boards: [], newBoardName: '', isValide: false },
      modalIsVisible: false,
    };
  }

  componentDidMount(): void {
    // document.addEventListener('keydown', onKeyPress);
    document.addEventListener('keydown', this.closeModalOnEsc);
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getBoards();
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.closeModalOnEsc);
  }

  closeModalOnEsc = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.setState({
        modalIsVisible: false,
      });
    }
  };

  closeModalOnClick = (): void => {
    this.setState({
      modalIsVisible: false,
    });
  };

  openModalOnClick = (): void => {
    this.setState({
      modalIsVisible: true,
    });
  };

  render(): JSX.Element {
    const { boards, newBoardName, isValide } = this.props;
    const { modalIsVisible } = this.state;
    let randomColor;
    let items;
    if (boards && boards.length > 0) {
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
          <button className="new-board-btn" onClick={this.openModalOnClick}>
            Создать доску
          </button>
        </div>
        <Modal
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          newBoardName={newBoardName}
          isValide={isValide}
          isVisible={modalIsVisible}
          onClick={this.closeModalOnClick}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StateType): PropsType => ({
  boards: state.boards.boards,
  isValide: state.boards.isValide,
  newBoardName: state.boards.newBoardName,
});

const homeConnector = connect(mapStateToProps, {
  getBoards,
  postBoard,
  handleSubmit,
  handleChange,
});

export default homeConnector(Home);
