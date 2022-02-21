import { useEffect, useState, useContext } from 'react';
import { deleteComment, getReviewComments, postComments } from '../utils/api';
import CommentCard from './CommentCard';
import ErrorMessage from './ErrorMessage';
import LoadingMessage from './LoadingMessage';
import PostComment from './PostComment';
import { UserContext } from '../contexts/UserContext';

const Comments = ({ review_id }) => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getReviewComments(review_id)
      .then((data) => {
        setIsLoading(false);

        setComments(data);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.response.data.msg);
        setIsLoading(true);
      });
  }, [review_id]);

  const handleDeleteComment = (e) => {
    const id = parseInt(e.target.value);
    setComments(comments.filter((comment) => comment.comment_id !== id));

    deleteComment(id).catch((error) => {
      setIsError(true);
      setErrorMessage(error.response.data.msg);
    });
  };

  const handleOnSubmit = (username, newComment) => {
    //let allComments = [];
    postComments(review_id, user.username, newComment)
      .then((data) => {
        setErrorMessage('');

        const allComments = [data, ...comments];
        setComments(allComments);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.message);
      });
  };

  return (
    <section>
      {isError ? (
        <>
          <ErrorMessage msg={errorMessage} />
        </>
      ) : isLoading ? (
        <LoadingMessage />
      ) : (
        <>
          <PostComment handleOnSubmit={handleOnSubmit} />
          <ul className="review-card-wrapper">
            {comments.map((comment) => {
              return (
                <CommentCard
                  key={comment.comment_id}
                  comment={comment}
                  deleteComment={handleDeleteComment}
                />
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};

export default Comments;
