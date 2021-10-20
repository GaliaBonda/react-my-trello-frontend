import IBoard from '../../../common/interfaces/IBoard';

const initialState = {
  boards: [
    { id: 1, title: 'покупки' },
    { id: 2, title: 'подготовка к свадьбе' },
    { id: 3, title: 'разработка интернет-магазина' },
    { id: 4, title: 'курс по продвижению в соцсетях' },
  ] as IBoard[],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function reducer(state = initialState, action: { type: string; payload?: any }): unknown {
  switch (action.type) {
    case 'UPDATE_BOARDS':
      return {
        ...state,
        boards: action.payload.boards,
      };
    case 'POST_BOARD':
      return {
        ...state,
        boards: [...state.boards, action.payload],
      };
    case 'ERROR_ACTION_TYPE':
      return {
        ...state,
      };
    default: {
      return { ...state, ...action.payload };
    }
  }
}