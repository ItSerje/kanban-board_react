import React, { useState, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import TextareaForm from '../textareaForm/TextareaForm';
import UseOutsideClick from '../../hooks/useOutsideClick';
import { useAppContext } from '../../context/app-context';
import { Icomment } from '../../models/dashboard.model';
import './style.css';

interface ICommentProps {
  comment: Icomment;
  updateCommentHandler: (commentId: string, text: string) => Promise<void>;
  deleteCommentHandler: (commentId: string) => Promise<void>;
}

const Comment: React.FC<ICommentProps> = ({
  comment,
  updateCommentHandler,
  deleteCommentHandler,
}): JSX.Element => {
  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);
  const { currentUser } = useAppContext();
  const isAuthor: boolean = currentUser === comment.author ? true : false;

  const handleCommentUpdate: (inputValue: string) => void = (inputValue) => {
    updateCommentHandler(comment.id, inputValue);
  };

  const handleClickOutside: () => void = () => {
    setIsEditingMode(false);
  };

  const rowDivRef = useRef<HTMLDivElement>(null);
  UseOutsideClick(rowDivRef, handleClickOutside);

  return (
    <>
      <Row ref={rowDivRef} className='comments__textarea'>
        <TextareaForm
          text={comment.comment}
          placeholder='Enter a comment'
          cancelCallback={() => {
            setIsEditingMode(false);
          }}
          submitCallback={handleCommentUpdate}
          isEditingMode={isEditingMode}
        />
      </Row>
      {!isEditingMode && isAuthor && (
        <Row>
          <Col>
            <span
              onClick={() => {
                setIsEditingMode(true);
              }}
              className='comments__comment-control'
              title='Edit comment'
            >
              Edit
            </span>
            {'  |  '}
            <span
              onClick={() => {
                deleteCommentHandler(comment.id);
              }}
              className='comments__comment-control comments__comment-control-del'
              title='Delete comment'
            >
              Delete
            </span>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Comment;
