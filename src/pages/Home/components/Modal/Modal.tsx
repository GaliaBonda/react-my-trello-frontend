/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import './modal.scss';

export default function Modal(props: {
  handleSubmit: () => void;
  isVisible: boolean;
  closeModal: () => void;
}): JSX.Element | null {
  const [boardName, setBoardName] = useState('');
  const [nameIsValide, setValidationStatus] = useState(false);
  const dispatch = useDispatch();
  const { closeModal, handleSubmit, isVisible } = props;
  if (!isVisible) return null;
  function onNameChange(e: ChangeEvent): void {
    setBoardName((e.target as HTMLInputElement).value);
    const validationRegex = /^[a-z0-9а-я\s.-]+$/i;
    if (boardName && boardName.length > 0 && validationRegex.test(boardName)) {
      setValidationStatus(true);
    }
  }
  function createNewBoard(event: FormEvent<Element>): void {
    event.preventDefault();
    dispatch({ type: 'UPDATE_NEWBOARD_NAME', payload: boardName });
    handleSubmit();
    closeModal();
  }
  return (
    <div className="modal-container">
      <div className="modal">
        <h2 className="modal-title">Создать новую доску</h2>
        <form className="modal-form" onSubmit={createNewBoard}>
          <label className="modal-label" htmlFor="boardName">
            Введите имя доски:
          </label>
          <input className="modal-input" type="text" name="input" id="boardName" onChange={onNameChange} />
          <div className="modal-btns">
            {nameIsValide && (
              <button className="modal-btn modal-submit" type="submit">
                Создать
              </button>
            )}
            {!nameIsValide && <button className="modal-btn modal-submit">Создать</button>}
            <button className="modal-btn modal-close" onClick={closeModal}>
              Закрыть
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
