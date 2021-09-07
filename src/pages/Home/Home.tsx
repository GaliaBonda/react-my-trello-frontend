import React from 'react';
import Board from './components/Board/Board';

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
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(props: IMyComponentProp) {
    super(props);
    this.state = boards;
  }

  render(): JSX.Element {
    const boardsArr = this.state;
    // eslint-disable-next-line react/no-array-index-key
    const items = boardsArr.boards.map((item, index) => <Board title={item.title} key={index} />);
    return (
      <div>
        <div>
          {items}
          <button>Создать доску</button>
        </div>
      </div>
    );
  }
}
