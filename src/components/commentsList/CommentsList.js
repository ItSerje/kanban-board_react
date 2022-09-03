import { useEffect, useState } from 'react';
import TextareaForm from '../textareaForm/TextareaForm';
import Comment from '../comment/Comment';
import { Container, Col, Row, Button, Spinner } from 'react-bootstrap';

const Comments = ({
  comments,
  addCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
}) => {
  const [isEditingMode, setIsEditingMode] = useState(false);

  return (
    <Container>
      <Row>
        <Col className='card-form__icon-column'>
          <span>ic</span>
        </Col>
        <Col>
          <Row>
            <h5>Comments</h5>
          </Row>
        </Col>
      </Row>
      {comments.map((comment) => {
        return (
          <Row key={comment.id}>
            <Col className='card-form__icon-column'>
              <span>ic</span>
            </Col>
            <Col>
              <Comment
                comment={comment}
                addCommentHandler={addCommentHandler}
                updateCommentHandler={updateCommentHandler}
                deleteCommentHandler={deleteCommentHandler}
              />
            </Col>
          </Row>
        );
      })}

      <Row>
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
          <Col>
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
