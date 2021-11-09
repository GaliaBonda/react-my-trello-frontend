/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import api from 'src/api';
import config from 'src/common/constants/api';
import { Dispatch } from 'redux';
import store from 'src/store/store';
import { ChangeEvent } from 'react';

export const getBoard =
  (id: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const data = await api.get(`/board/${id}`);
      console.log('data', data);
      dispatch({ type: 'GET_BOARD', payload: data });
    } catch (e) {
      console.log(e);
      dispatch({ type: 'ERROR_ACTION_TYPE' });
    }
  };

export const openTitleInput = (): void => {
  store.dispatch({ type: 'SHOW_TITLE_INPUT' });
};

export const changeTitle = (e: ChangeEvent): void => {
  console.log('change title input');
  e.preventDefault();
  store.dispatch({ type: 'UPDATE_BOARD_TITLE', payload: (e.target as HTMLInputElement).value });
};
