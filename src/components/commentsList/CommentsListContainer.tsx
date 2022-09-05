import React from 'react';
import Comments from './CommentsList';
import { createComment, updateComment, deleteComment } from '../../api';
import { useAppContext } from '../../context/app-context';
import { Icomment } from '../../models/dashboard.model';

interface ICommentsContainerProps {
  comments: Icomment[];
  cardId: string;
  refreshCard: () => void;
  activateCardSpinner: () => void;
}

const CommentsContainer: React.FC<ICommentsContainerProps> = ({
  comments,
  cardId,
  refreshCard,
  activateCardSpinner,
}): JSX.Element => {
  const { currentUser } = useAppContext();

  const addCommentHandler: (text: string) => Promise<void> = async (text) => {
    activateCardSpinner();
    await createComment(cardId, text, currentUser);
    refreshCard();
  };

  const updateCommentHandler: (
    commentId: string,
    text: string
  ) => Promise<void> = async (commentId, text) => {
    activateCardSpinner();
    await updateComment(cardId, commentId, text);
    refreshCard();
  };

  const deleteCommentHandler: (commentId: string) => Promise<void> = async (
    commentId
  ) => {
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
