import React from 'react';
import { BasicIcon } from '@netmonk/design.icons.basic';
import { Button } from '@netmonk/design.ui.button';

export function Modal({ children, onAction, onClose, resetForm, show, title, type }) {
  if (!show) return null;

  const handleClose = () => {
    if (resetForm) resetForm();
    onClose();
  };

  function ModalContent({ children }) {
    if (type === 'add') {
      return (
        <form
          className="modal-default"
          onSubmit={(event) => {
            event.preventDefault();
            onAction();
          }}>
          {children}
        </form>
      );
    }
    if (type === 'detail') {
      return <div className="modal-default">{children}</div>;
    }
    if (type === 'update') {
      return (
        <form
          className="modal-default"
          onSubmit={(event) => {
            event.preventDefault();
            onAction();
          }}>
          {children}
        </form>
      );
    }
    return null;
  }

  const renderFooter = () => {
    if (type === 'add' || type === 'update') {
      return (
        <div className="modal-footer">
          <div className="flex justify-between gap-4 pt-5">
            <Button block type="button" color="default" label="Cancel" onClick={handleClose} />
            <Button block type="submit" label="Save" color="yale_blue" />
          </div>
        </div>
      );
    }
    if (type === 'detail') {
      return (
        <div className="modal-footer">
          <div className="flex justify-end gap-4 pt-5">
            <Button block type="button" color="yale_blue" label="Close" onClick={handleClose} />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
      style={{ zIndex: 1300 }}>
      <div className="fixed inset-0 bg-gunmetal opacity-50" style={{ zIndex: -1 }} />
      <div className="modal-inner mx-auto rounded-xl shadow-xl bg-secondary-white">
        <div className="flex justify-end">
          <button type="button" onClick={handleClose} className="focus:outline-none mr-4 mt-3 mb-1">
            <BasicIcon name="close" color="gunmetal" size={14} />
          </button>
        </div>
        <ModalContent>
          <div className="mb-4">
            <h2 className="modal-header-title">{title}</h2>
          </div>
          {children}
          {renderFooter()}
        </ModalContent>
      </div>
    </div>
  );
}

export default Modal;
