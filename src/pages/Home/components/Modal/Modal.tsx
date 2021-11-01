import React, { ChangeEvent, FormEvent } from 'react';
import './modal.scss';

export default function Modal(props: {
  isVisible: boolean;
  closeModal: () => void;
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent) => void;
}): JSX.Element | null {
  const { isVisible, closeModal, handleSubmit, handleChange } = props;
  // const { closeModal } = props;
  if (!isVisible) return null;
  return (
    <div className="modal-container">
      <div className="modal">
        <h2 className="modal-title">Создать новую доску</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="modal-label" htmlFor="boardName">
            Введите имя доски:
          </label>
          <input className="modal-input" type="text" name="input" id="boardName" onChange={handleChange} />
          <div className="modal-btns">
            <button className="modal-btn modal-submit" type="submit">
              Отправить
            </button>
            <button className="modal-btn modal-close" onClick={closeModal}>
              Закрыть
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
