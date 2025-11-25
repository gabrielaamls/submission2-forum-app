import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { postedAt } from "../utils";
import { FaComments, FaThumbsUp, FaThumbsDown } from "react-icons/fa6";

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  downVotesBy,
  upVotesBy,
  totalComments,
  owner,
  authUser,
  onChangeVote,
}) {
  const isUpVotes = upVotesBy.includes(authUser);
  const isDownVotes = downVotesBy.includes(authUser);

  const handlerUpVote = (event) => {
    event.stopPropagation();
    const voteType = isUpVotes ? 0 : 1;
    onChangeVote({ threadId: id, voteType });
  };

  const handlerDownVote = (event) => {
    event.stopPropagation();
    const voteType = isDownVotes ? 0 : -1;
    onChangeVote({ threadId: id, voteType });
  };

  return (
    <div className="card row-hover pos-relative py-3 px-3 mb-3 border-primary border-top-0 border-right-0 border-bottom-0 rounded-0">
      <div className="row align-items-center">
        <div className="col-12">
          <h5>
            <Link to={`/threads/${id}`} className="text-primary">
              {title}
            </Link>
          </h5>
          <hr />
          <div className="text-sm op-5">
            <Link
              className="btn btn-sm btn-outline-secondary mr-2"
              to={`/threads/category/${category}`}
            >
              {`#${category}`}
            </Link>
          </div>
          <div>{body.slice(0, 150)}</div>
          <div className="d-flex justify-content-between mt-3">
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
              <span className="btn btn-sm cursor-default">
                <FaComments /> {totalComments}
              </span>
            </div>
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
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  onChangeVote: PropTypes.func,
};

ThreadItem.defaultProps = {
  onChangeVote: null,
};

// eslint-disable-next-line react-refresh/only-export-components
export { threadItemShape };

export default ThreadItem;
