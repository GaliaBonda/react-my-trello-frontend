import React from 'react';
import './modal.scss';

export default function Modal(props: { isVisible: boolean; closeModal: () => void }): JSX.Element | null {
  const { isVisible } = props;
  const { closeModal } = props;
  if (!isVisible) return null;
  return (
    <div className="modal-container">
      <div className="modal">
        <h2 className="modal-title">Создать новую доску</h2>
        <form className="modal-form" action="GET">
          <input className="modal-input" type="text" name="input" />
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
