/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { approveNewName } from 'src/store/modules/boards/actions';
import './modal.scss';

export default function Modal(props: {
  newBoardName: string;
  isValide: boolean;
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent) => void;
  isVisible: boolean;
  onClick: () => void;
}): JSX.Element | null {
  const [boardName, setBoardName] = useState('');
  const [nameIsValide, setValidationStatus] = useState(false);
  const { onClick, handleSubmit, handleChange, newBoardName, isValide, isVisible } = props;
  if (!isVisible) return null;
  function onNameChange(e: ChangeEvent): void {
    setBoardName((e.target as HTMLInputElement).value);
    const validationRegex = /^[a-z0-9а-я\s.-]+$/i;
    if (boardName && boardName.length > 0 && validationRegex.test(boardName)) {
      setValidationStatus(true);
    }
    if (nameIsValide) approveNewName(boardName);
  }
  return (
    <div className="modal-container">
      <div className="modal">
        <h2 className="modal-title">Создать новую доску</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
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
            <button className="modal-btn modal-close" onClick={onClick}>
              Закрыть
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
