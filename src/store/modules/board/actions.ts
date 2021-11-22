/* eslint-disable no-console */

import api from 'src/api';
import { Dispatch } from 'redux';
import store from 'src/store/store';
import { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent } from 'react';
import IBoard from 'src/common/interfaces/IBoard';

export const getBoard =
  (id: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const data = await api.get(`/board/${id}`);
      const boardData = { ...data, id };
      dispatch({ type: 'GET_BOARD', payload: boardData });
    } catch (e) {
      console.log(e);
      dispatch({ type: 'ERROR_ACTION_TYPE' });
    }
  };

export const openTitleInput = (): void => {
  store.dispatch({ type: 'SHOW_TITLE_INPUT' });
};

export const changeTitle = (e: ChangeEvent): void => {
  e.preventDefault();
  store.dispatch({ type: 'UPDATE_BOARD_TITLE', payload: (e.target as HTMLInputElement).value });
};

export const closeTitleInput = async (e: FocusEvent): Promise<void> => {
  e.preventDefault();
  store.dispatch({ type: 'CLOSE_TITLE_INPUT' });
  const currentBoard: { board: IBoard; isOnChange: boolean } = store.getState().board;
  const currentBoardTitle = currentBoard.board.title;
  const currentID = e.target.getAttribute('data-id');
  try {
    await api.put(`/board/${currentID}`, { title: currentBoardTitle });
    const data = await api.get(`/board/${currentID}`);
    store.dispatch({ type: 'GET_BOARD', payload: data });
  } catch (er) {
    console.log(er);
    store.dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
};

export const onKeyPress = async (e: KeyboardEvent): Promise<void> => {
  if (e.key === 'Enter') {
    e.preventDefault();
    store.dispatch({ type: 'CLOSE_TITLE_INPUT' });
    const currentBoard: { board: IBoard; isOnChange: boolean } = store.getState().board;
    const currentBoardTitle = currentBoard.board.title;
    const currentID = (e.target as Element).getAttribute('data-id');
    console.log('curr id', currentID);
    try {
      await api.put(`/board/${currentID}`, { title: currentBoardTitle });
      const data = await api.get(`/board/${currentID}`);
      const boardData = { ...data, currentID };
      store.dispatch({ type: 'GET_BOARD', payload: boardData });
    } catch (er) {
      console.log(er);
      store.dispatch({ type: 'ERROR_ACTION_TYPE' });
    }
  }
};

export const deleteBoard = async (e: MouseEvent): Promise<void> => {
  const currentID = (e.target as Element).getAttribute('data-id');
  try {
    await api.delete(`/board/${currentID}`);
    store.dispatch({ type: 'DELETE_BOARD', payload: currentID });
    const data = await api.get(`/board/${currentID}`);
    store.dispatch({ type: 'GET_BOARD', payload: data });
  } catch (er) {
    console.log(er);
    store.dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
};
