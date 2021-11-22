const initialState = {
  board: {},
  isOnChange: false,
};

export default function reducer(state = initialState, action: { type: string; payload?: unknown }): unknown {
  switch (action.type) {
    case 'GET_BOARD': {
      return {
        ...state,
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
    case 'DELETE_BOARD': {
      return {
        ...state,
        // delete
      };
    }
    default: {
      return { ...state };
    }
  }
}
