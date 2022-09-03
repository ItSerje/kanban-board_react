import Comments from './CommentsList';
import { createComment, updateComment, deleteComment } from '../../api';
import { useAppContext } from '../../context/app-context';

const CommentsContainer = ({ comments, cardId }) => {
  const { currentUser } = useAppContext();

  const addCommentHandler = (text) => {
    createComment(cardId, text, currentUser);
  };
  const updateCommentHandler = (commentId, text) => {
    updateComment(cardId, commentId, text);
  };
  const deleteCommentHandler = (commentId) => {
    deleteComment(cardId, commentId);
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
