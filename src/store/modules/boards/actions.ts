/* eslint-disable consistent-return */
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
      const data: any = await api.get('/board');
      const boardData: IBoard[] = await data.boards;

      dispatch({ type: 'UPDATE_BOARDS', payload: boardData });
      console.log('current state:', getState());
      console.log('data from board', boardData);
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

export const validateTitle = (title: string): boolean => {
  let isValide = false;
  const validationRegex = /^[a-z0-9а-я\s.-]+$/i;
  if (title && title.length > 0 && validationRegex.test(title)) {
    isValide = true;
    store.dispatch({ type: 'VALID_TITLE' });
  } else {
    store.dispatch({ type: 'INVALID_TITLE' });
    console.log('isInValide');
  }
  return isValide;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const handleSubmit = async (e: FormEvent): Promise<void> => {
  e.preventDefault();
  const currentState: {
    boards: {
      boards: IBoard[];
      isVisible: boolean;
      isValide: boolean;
      newBoardName: string;
    };
  } = store.getState();
  const { newBoardName, isValide } = currentState.boards;
  // const isValide = currentState.boards.isValide;
  if (isValide) {
    console.log('Time to post, board name is ', isValide);
    try {
      const board = {
        title: newBoardName,
      };
      // console.log('whyyy');
      await api.post(`/board`, board);
      store.dispatch({ type: 'POST_BOARD', payload: { ...board } });
      const data = await api.get('/board');
      store.dispatch({ type: 'UPDATE_BOARDS', payload: data });
      closeModal();
    } catch (er) {
      console.log(er);
      store.dispatch({ type: 'ERROR_ACTION_TYPE' });
    }
  }
  // if (isValide) {
  //   console.log('Time to post, board name is ', isValide);
  //   return async (dispatch: Dispatch): Promise<void> => {
  //     try {
  //       const board = {
  //         title: boardName,
  //       };
  //       console.log('whyyy');
  //       await api.post(`/board`, board);
  //       await dispatch({ type: 'POST_BOARD', payload: { ...board } });
  //     } catch (er) {
  //       console.log(er);
  //       dispatch({ type: 'ERROR_ACTION_TYPE' });
  //     }
  //   };
  // }
  // console.log("Can't post, board name is ", isValide);

  // if isValide
};

export const handleChange = (e: ChangeEvent): void => {
  e.preventDefault();
  store.dispatch({ type: 'UPDATE_NEWBOARD_NAME', payload: (e.target as HTMLInputElement).value });
  validateTitle((e.target as HTMLInputElement).value);
};
