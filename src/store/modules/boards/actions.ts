/* eslint-disable no-console */
import api from 'src/api';
import { Dispatch } from 'redux';
import IBoards from 'src/common/interfaces/IBoards';
import store from 'src/store/store';
import { ChangeEvent, FormEvent } from 'react';

export const getBoards =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const boardData = await api.get('/board');
      dispatch({ type: 'UPDATE_BOARDS', payload: boardData });
    } catch (e) {
      dispatch({ type: 'ERROR_ACTION_TYPE' });
    }
  };

export const postBoard =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const board = {
        title: 'notodos',
      };

      await api.post(`/board`, board);
      await dispatch({ type: 'POST_BOARD', payload: { ...board } });
    } catch (e) {
      dispatch({ type: 'ERROR_ACTION_TYPE' });
    }
  };

export const showModal = (): void => {
  store.dispatch({ type: 'SHOW_MODAL' });
};

export const onKeyPress = (e: KeyboardEvent): void => {
  if (e.key === 'Escape') {
    e.preventDefault();
    store.dispatch({ type: 'CLOSE_MODAL', payload: e });
  }
};

export const closeModal = (): void => {
  store.dispatch({ type: 'CLOSE_MODAL' });
};

export const validateTitle = (title: string): boolean => {
  let isValide = false;
  const validationRegex = /^[a-z0-9а-я\s.-]+$/i;
  if (title && title.length > 0 && validationRegex.test(title)) {
    isValide = true;
    store.dispatch({ type: 'VALID_TITLE' });
  } else {
    store.dispatch({ type: 'INVALID_TITLE' });
  }
  return isValide;
};

export const handleSubmit = async (e: FormEvent): Promise<void> => {
  e.preventDefault();
  const currentState: {
    boards: {
      boards: IBoards[];
      isValide: boolean;
      newBoardName: string;
    };
  } = store.getState();
  const { newBoardName } = currentState.boards;
  console.log(newBoardName);
  // if (isValide) {
  try {
    const board = {
      title: newBoardName,
    };
    await api.post(`/board`, board);
    store.dispatch({ type: 'POST_BOARD', payload: { ...board } });
    const boardData = await api.get('/board');
    store.dispatch({ type: 'UPDATE_BOARDS', payload: boardData });
    closeModal();
  } catch (er) {
    store.dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
  // }
};

export const approveNewName = (name: string): void => {
  store.dispatch({ type: 'UPDATE_NEWBOARD_NAME', payload: name });
};

export const handleChange = (e: ChangeEvent): void => {
  e.preventDefault();
  store.dispatch({ type: 'UPDATE_NEWBOARD_NAME', payload: (e.target as HTMLInputElement).value });
  validateTitle((e.target as HTMLInputElement).value);
};
