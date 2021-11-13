const initialState = {
  board: {},
  isOnChange: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function reducer(state = initialState, action: { type: string; payload?: any }): unknown {
  switch (action.type) {
    case 'GET_BOARD': {
      return {
        // ...state,
        board: action.payload,
      };
    }
    case 'SHOW_TITLE_INPUT': {
      return {
        ...state,
        isOnChange: true,
      };
    }
    case 'CLOSE_TITLE_INPUT': {
      return {
        ...state,
        isOnChange: false,
      };
    }
    case 'UPDATE_BOARD_TITLE': {
      return {
        ...state,
        board: {
          ...state.board,
          title: action.payload,
        },
      };
    }
    default: {
      return { ...state, ...action.payload };
    }
  }
}
