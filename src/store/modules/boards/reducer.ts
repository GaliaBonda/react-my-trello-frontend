import IBoard from '../../../common/interfaces/IBoard';

const initialState = {
  boards: [
    { id: 1, title: 'покупки' },
    { id: 2, title: 'подготовка к свадьбе' },
    { id: 3, title: 'разработка интернет-магазина' },
    { id: 4, title: 'курс по продвижению в соцсетях' },
  ] as IBoard[],
};

export default function reducer(state = initialState, action: { type: string; payload?: IBoard }): unknown {
  switch (action.type) {
    case 'UPDATE_BOARDS':
      return {
        ...state,
        boards: action.payload,
      };
    default: {
      return { ...state, ...action.payload };
    }
  }
}
