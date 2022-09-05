import React, { useState, useRef } from 'react';
import TextareaForm from '../textareaForm/TextareaForm';
import Comment from '../comment/Comment';
import { Container, Col, Row, Button } from 'react-bootstrap';
import UseOutsideClick from '../../hooks/useOutsideClick';
import { useAppContext } from '../../context/app-context';
import { FaRegCommentDots } from 'react-icons/fa';
import { Icomment } from '../../models/dashboard.model';
import './style.css';

interface ICommentsProps {
  comments: Icomment[];
  addCommentHandler: (text: string) => Promise<void>;
  updateCommentHandler: (commentId: string, text: string) => Promise<void>;
  deleteCommentHandler: (commentId: string) => Promise<void>;
}

const Comments: React.FC<ICommentsProps> = ({
  comments,
  addCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
}): JSX.Element => {
  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);

  const { currentUser } = useAppContext();

  const handleClickOutside: () => void = () => {
    setIsEditingMode(false);
  };

  const ref = useRef<HTMLDivElement>(null);

  UseOutsideClick(ref, handleClickOutside);

  return (
    <Container>
      <Row className='comments__row'>
        <Col className='full-card__icon-column'>
          <span className='full-card__icon-span'>
            <FaRegCommentDots className='full-card__icon' />
          </span>
        </Col>
        <Col>
          <Row>
            <h5>Comments</h5>
          </Row>
          <Row>
            <p className='comments__edit-del-notice'>
              (only comment author can edit or delete a comment)
            </p>
          </Row>
        </Col>
      </Row>
      {comments.map((comment) => {
        return (
          <Row key={comment.id} className='comments__row'>
            <Col className='full-card__icon-column'>
              <span className='comments__author-icon'>
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
                  updateCommentHandler={updateCommentHandler}
                  deleteCommentHandler={deleteCommentHandler}
                />
              </Row>
            </Col>
          </Row>
        );
      })}

      <Row className='comments__row'>
        <Col className='full-card__icon-column'></Col>
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
          <Col ref={ref} className='comments__add-comment-col'>
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
