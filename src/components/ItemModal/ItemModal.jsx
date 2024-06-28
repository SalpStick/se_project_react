  import "./ItemModal.css";

function ItemModal({ activeModal, card, closeActiveModal }) {
  const handleDeleteClose = () => {
    deleteCard(card._id);
  };
  
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__container modal__container_type_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          {" "}
        </button>
        <img src={card.link} alt="card image" className="modal__image" />
        <div className="modal__footer">
          <div>
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
              onClick={handleDeleteClose}
              className="modal__delete"
              type="button"
            >
              Delete Item
            </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
