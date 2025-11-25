import PropTypes from "prop-types";
import { postedAt } from "../utils";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";

function ThreadCommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  onChangeVoteComment,
}) {
  const isUpVotes = upVotesBy.includes(authUser);
  const isDownVotes = downVotesBy.includes(authUser);

  const handlerUpVote = (event) => {
    event.stopPropagation();
    const voteType = isUpVotes ? 0 : 1;
    onChangeVoteComment({ commentId: id, voteType });
  };

  const handlerDownVote = (event) => {
    event.stopPropagation();
    const voteType = isDownVotes ? 0 : -1;
    onChangeVoteComment({ commentId: id, voteType });
  };

  return (
    <div className="card">
      <hr />
      <div className="d-flex justify-content-between">
        <div>
          <div>{content}</div>
          <div>
            <button
              aria-label="onChangeVote"
              className={`btn btn-sm ${isUpVotes ? "text-primary" : ""}`}
              onClick={handlerUpVote}
            >
              <FaThumbsUp /> {upVotesBy.length}
            </button>
            <button
              aria-label="onChangeVote"
              className={`btn btn-sm ${isDownVotes ? "text-primary" : ""}`}
              onClick={handlerDownVote}
            >
              <FaThumbsDown /> {downVotesBy.length}
            </button>
          </div>
        </div>
        <div>
          <div className="text-sm mb-0 text-end">
            <span className="text-muted">{postedAt(createdAt)} by</span>
            <br />
            <img
              className="thread-avatar"
              src={owner.avatar}
              alt={`avatar ${owner.name}`}
            />
            <span className="ps-2">{owner.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadCommentItem.propTypes = {
  ...commentItemShape,
  authUser: PropTypes.string.isRequired,
  onChangeVoteComment: PropTypes.func,
};

ThreadCommentItem.defaultProps = {
  onChangeVoteComment: null,
};

// eslint-disable-next-line react-refresh/only-export-components
export { userShape, commentItemShape };

export default ThreadCommentItem;
