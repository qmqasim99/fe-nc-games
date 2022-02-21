import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { postComments } from '../utils/api';
import ErrorMessage from './ErrorMessage';
import TextField from '@mui/material/TextField';

const PostComment = ({ handleOnSubmit }) => {
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment) {
      setIsError(true);
      setErrorMessage('Please enter your coments');
    } else {
      try {
        setIsError(false);

        handleOnSubmit(user.username, newComment);

        // setUser(data);
        setErrorMessage('');
        setNewComment('');
      } catch (error) {
        setIsError(true);
        setNewComment(newComment);
        setErrorMessage(error);
      }
    }
  };

  return user.username ? (
    <>
      <form onSubmit={handleSubmit}>
        <label>Post new comments: </label>

        <input
          type="textarea"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button className="green-button">Post it</button>
      </form>

      {isError && <ErrorMessage msg={errorMessage} />}
    </>
  ) : (
    <p>Please login to post your comments</p>
  );
};

export default PostComment;
