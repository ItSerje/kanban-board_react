import { useState, useRef } from 'react';
import { Container, Col, Row, Button, Spinner } from 'react-bootstrap';
import TextareaForm from '../textareaForm/TextareaForm';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useAppContext } from '../../context/app-context';
import './style.css';

const Comment = ({
  comment,
  addCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
}) => {
  const [isEditingMode, setIsEditingMode] = useState(false);
  const { currentUser } = useAppContext();
  const isAuthor = currentUser === comment.author ? true : false;

  const handleCommentUpdate = (inputValue) => {
    updateCommentHandler(comment.id, inputValue);
  };

  const handleClickOutside = () => {
    setIsEditingMode(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <>
      <Row ref={ref} className='comments__textarea'>
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
