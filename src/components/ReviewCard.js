import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <Link to={`/reviews/${review.review_id}`}>
        <li key={review.review_id}>
          <img
            className="review-list-image"
            src={review.review_img_url}
            alt={review.title}
          />
          <h3>{review.title}</h3>
          <p></p>
          <p>
            <AccountCircleIcon
              style={{ verticalAlign: 'middle', margin: '3px' }}
            />{' '}
            {review.owner}
          </p>
          <p>
            <CommentIcon style={{ verticalAlign: 'middle', margin: '3px' }} />
            {review.comment_count} Comments
          </p>
        </li>
      </Link>
    </div>
  );
};

export default ReviewCard;
