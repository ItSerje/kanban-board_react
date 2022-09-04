import { useState, useRef } from 'react';
import { Container, Col, Row, Button, Spinner } from 'react-bootstrap';
import TextareaForm from '../textareaForm/TextareaForm';
import useOutsideClick from '../../hooks/useOutsideClick';

const Comment = ({
  comment,
  addCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
}) => {
  const [isEditingMode, setIsEditingMode] = useState(false);
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
      {!isEditingMode && (
        <Row>
          <Col>
            <span
              onClick={() => {
                setIsEditingMode(true);
              }}
            >
              Edit
            </span>
          </Col>
          <Col>
            <span
              onClick={() => {
                deleteCommentHandler(comment.id);
              }}
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
