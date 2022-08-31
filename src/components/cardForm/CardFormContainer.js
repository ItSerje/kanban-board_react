import CardForm from './CardForm';

const CardFormContainer = ({
  dashboard,
  currentUser,
  refreshDashboard,
  currentCardId,
  currentColumnId,
  closeCardFormHandler,
}) => {
  const card = dashboard.columns
    .find((column) => column.id === currentColumnId)
    .cards.find((card) => card.id === currentCardId);

  return (
    <CardForm
      card={card}
      closeCardFormHandler={closeCardFormHandler}
    ></CardForm>
  );
};

export default CardFormContainer;
