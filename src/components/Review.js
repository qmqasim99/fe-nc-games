import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getReview } from '../utils/api';
import { convertApiDate, getApiDate } from '../utils/dates';
import Comments from './Comments';
import ErrorMessage from './ErrorMessage';
import LoadingMessage from './LoadingMessage';
import Votes from './Votes';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Review = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getReview(review_id)
      .then((data) => {
        setIsLoading(false);
        setReview(data);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.response.data.msg);
        setIsLoading(true);
      });
  }, [review_id]);

  return (
    <main>
      {isError ? (
        <>
          <ErrorMessage msg={errorMessage} />
        </>
      ) : isLoading ? (
        <LoadingMessage />
      ) : (
        <>
          <div className="review-wrapper">
            <div className="review">
              <h2>{review.title}</h2>

              <p>
                <AccountCircleIcon className="avatar" /> {review.owner} {'   '}
                <EventNoteIcon className="avatar" />
                {convertApiDate(review.created_at)}
              </p>

              <p>
                Category:{' '}
                <Link to={`/reviews/category/${review.category}`}>
                  {review.category}
                </Link>
              </p>
            </div>
            <div className="review">
              <p>
                <img
                  className="review-list-image"
                  src={review.review_img_url}
                  alt={review.title}
                />
              </p>
            </div>
          </div>
          <div className="main-review">
            <h3>Review: </h3>
            <p></p>
            <p style={{ textAlign: 'justify' }}>{review.review_body}</p>
            <div className="main-review">
              <Votes
                votingPath={'reviews'}
                id={review.review_id}
                currentVotes={review.votes}
              />
            </div>
            <p></p>
            <h3>Comment Count: {review.comment_count}</h3>
            <Comments review_id={review_id} />
          </div>
        </>
      )}
    </main>
  );
};

export default Review;
