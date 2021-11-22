import IBoards from 'src/common/interfaces/IBoards';
import IBoard from '../../../common/interfaces/IBoard';

const initialState = {
  boards: [] as IBoard[],
  isValide: false,
};

export default function reducer(state = initialState, action: { type: string; payload?: unknown }): unknown {
  switch (action.type) {
    case 'UPDATE_BOARDS':
      return {
        ...state,
        boards: (action.payload as { boards: IBoards[] }).boards,
      };
    case 'POST_BOARD':
      return {
        ...state,
        boards: [...state.boards, action.payload],
      };
    case 'SHOW_MODAL': {
      return {
        ...state,
        isVisible: true,
      };
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        isVisible: false,
      };
    }
    case 'UPDATE_NEWBOARD_NAME': {
      return {
        ...state,
        newBoardName: action.payload,
      };
    }
    case 'VALID_TITLE': {
      return {
        ...state,
        isValide: true,
      };
    }
    case 'INVALID_TITLE': {
      return {
        ...state,
        isValide: false,
      };
    }
    case 'ERROR_ACTION_TYPE':
      return {
        ...state,
      };
    default: {
      return { ...state };
    }
  }
}
