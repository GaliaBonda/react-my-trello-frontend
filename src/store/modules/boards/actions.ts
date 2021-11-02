/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import api from 'src/api';
// import config from 'src/common/constants/api';
import { Dispatch } from 'redux';
import IBoard from 'src/common/interfaces/IBoard';
// import IUser from 'src/common/interfaces/IUser';
import store from 'src/store/store';
import { ChangeEvent, FormEvent } from 'react';

export const getBoards =
  () =>
  async (dispatch: Dispatch, getState: () => unknown): Promise<void> => {
    try {
      const data = await api.get('/board');
      await dispatch({ type: 'UPDATE_BOARDS', payload: data });
      console.log('current state:', getState());
    } catch (e) {
      console.log(e);
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
      console.log(e);
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

export const handleSubmit = (e: FormEvent): void => {
  e.preventDefault();
  const currentState: {
    boards: {
      boards: IBoard[];
      isVisible: boolean;
      newBoardName: string;
    };
  } = store.getState();
  const boardName = currentState.boards.newBoardName;
  let isValide = false;
  if (boardName && boardName.length > 0 && boardName.match(/[\w\u0430-\u044f.-]+[\w\u0430-\u044f\s.-]*/i)) {
    isValide = true;
  }
  console.log('board name is ', isValide);
  if (isValide) {
    // store.dispatch({ type: 'POST_BOARD' });
    console.log('Time to post, board name is ', isValide);
  } else {
    // store.dispatch({ type: 'VALIDATION_ERROR' });
    console.log("Can't post, board name is ", isValide);
  }
  // if isValide
};

export const handleChange = (e: ChangeEvent): void => {
  e.preventDefault();
  store.dispatch({ type: 'UPDATE_NEWBOARD_NAME', payload: (e.target as HTMLInputElement).value });
};
