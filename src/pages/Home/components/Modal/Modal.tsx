import React from 'react';
import './modal.scss';

export default function Modal(props: { isVisible: boolean }): JSX.Element | null {
  const { isVisible } = props;
  if (!isVisible) return null;
  return (
    <div className="modal-container">
      <div className="modal">
        <h2>Создать новую доску</h2>
        <form action="">
          <input type="text" name="input" />
          <button type="submit">Отправить</button>
          <button>Закрыть</button>
        </form>
      </div>
    </div>
  );
}
