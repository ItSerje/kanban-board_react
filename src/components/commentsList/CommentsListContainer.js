import Comments from './CommentsList';
import { createComment, updateComment, deleteComment } from '../../api';
import { useAppContext } from '../../context/app-context';

const CommentsContainer = ({
  comments,
  cardId,
  refreshCard,
  activateCardSpinner,
}) => {
  const { currentUser } = useAppContext();

  const addCommentHandler = async (text) => {
    activateCardSpinner();
    await createComment(cardId, text, currentUser);
    refreshCard();
  };
  const updateCommentHandler = async (commentId, text) => {
    await updateComment(cardId, commentId, text);
  };
  const deleteCommentHandler = async (commentId) => {
    activateCardSpinner();
    await deleteComment(cardId, commentId);
    refreshCard();
  };
  return (
    <Comments
      comments={comments}
      addCommentHandler={addCommentHandler}
      updateCommentHandler={updateCommentHandler}
      deleteCommentHandler={deleteCommentHandler}
    />
  );
};

export default CommentsContainer;
