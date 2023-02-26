import PopupWithForm from './PopupWithForm';

function DeleteConfirmPopup( { isOpen, card, onCardDelete, onClose, onCloseOverlayClick } ) {

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
    onClose();
  } 

  return (
    <PopupWithForm 
      name="deleteCardForm"
      title="Вы уверены?"
      type="delete-card"
      submitButtonText="Да"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlayClick={onCloseOverlayClick}
    />
  );
}

export default DeleteConfirmPopup;