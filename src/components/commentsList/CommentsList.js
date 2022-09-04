import { useEffect, useState, useRef } from 'react';
import TextareaForm from '../textareaForm/TextareaForm';
import Comment from '../comment/Comment';
import { Container, Col, Row, Button, Spinner } from 'react-bootstrap';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useAppContext } from '../../context/app-context';
import { FaRegCommentDots } from 'react-icons/fa';
import './style.css';

const Comments = ({
  comments,
  addCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
}) => {
  const [isEditingMode, setIsEditingMode] = useState(false);

  const { currentUser } = useAppContext();

  const handleClickOutside = () => {
    setIsEditingMode(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <Container>
      <Row className='comments__row'>
        <Col className='card-form__icon-column'>
          <span className='card-form__icon-span'>
            <FaRegCommentDots className='full-card-icon' />
          </span>
        </Col>
        <Col>
          <Row>
            <h5>Comments</h5>
          </Row>
        </Col>
      </Row>
      {comments.map((comment) => {
        return (
          <Row key={comment.id} className='comments__row'>
            <Col className='card-form__icon-column'>
              <span className='comment-author-icon'>
                {comment.author.charAt(0).toUpperCase()}
              </span>
            </Col>
            <Col>
              <Row>
                <span>
                  Author:{' '}
                  <span className='full-card__card-author'>
                    {comment.author}
                    {currentUser === comment.author ? ' (You)' : ''}
                  </span>
                </span>
              </Row>
              <Row>
                <Comment
                  comment={comment}
                  addCommentHandler={addCommentHandler}
                  updateCommentHandler={updateCommentHandler}
                  deleteCommentHandler={deleteCommentHandler}
                />
              </Row>
            </Col>
          </Row>
        );
      })}

      <Row className='comments__row'>
        <Col className='card-form__icon-column'></Col>
        {!isEditingMode && (
          <Col>
            <Button
              variant='primary'
              className='textarea-autosize-btn'
              onClick={() => setIsEditingMode(true)}
            >
              Add Comment
            </Button>
          </Col>
        )}
        {isEditingMode && (
          <Col ref={ref} className='comments-list__add-comment-col'>
            <TextareaForm
              text=''
              placeholder='Write a comment'
              isEditingMode={isEditingMode}
              submitCallback={addCommentHandler}
              cancelCallback={() => setIsEditingMode(false)}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Comments;
