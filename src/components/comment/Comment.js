import { useState, useRef } from 'react';
import { Container, Col, Row, Button, Spinner } from 'react-bootstrap';
import TextareaForm from '../textareaForm/TextareaForm';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useAppContext } from '../../context/app-context';

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
      <Row ref={ref}>
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
              style={{ cursor: 'pointer' }}
            >
              Edit
            </span>
            {' | '}
            <span
              onClick={() => {
                deleteCommentHandler(comment.id);
              }}
              style={{ cursor: 'pointer' }}
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
