import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { postedAt } from "../utils";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import ThreadCommentInput from "./ThreadCommentInput";
import { userShape, commentItemShape } from "./ThreadCommentItem";
import ThreadCommentList from "./ThreadCommentList";

function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  comments,
  authUser,
  onChangeVoteThreadDetail,
  onAddThreadComment,
  onChangeVoteComment,
}) {
  const isUpVotes = upVotesBy.includes(authUser);
  const isDownVotes = downVotesBy.includes(authUser);

  const handlerUpVote = (event) => {
    event.stopPropagation();
    const voteType = isUpVotes ? 0 : 1;
    onChangeVoteThreadDetail(voteType);
  };

  const handlerDownVote = (event) => {
    event.stopPropagation();
    const voteType = isDownVotes ? 0 : -1;
    onChangeVoteThreadDetail(voteType);
  };

  return (
    <div
      id={id}
      className="card row-hover pos-relative py-3 px-3 mb-3 border-primary border-top-0 border-right-0 border-bottom-0 rounded-0"
    >
      <div className="row align-items-center">
        <div className="col-12">
          <h3 className="text-primary">{title}</h3>
          <hr />
          <div className="text-sm op-5">
            <Link
              className="btn btn-sm btn-outline-secondary mr-2"
              to={`/threads/category/${category}`}
            >
              {`#${category}`}
            </Link>
          </div>
          <div>{body}</div>
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
          <hr />
          <div>
            <ThreadCommentInput onAddThreadComment={onAddThreadComment} />
          </div>
          <div>
            <ThreadCommentList
              comments={comments}
              authUser={authUser}
              onChangeVoteComment={onChangeVoteComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const threadDetail = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  authUser: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  ...threadDetail,
  onChangeVoteThreadDetail: PropTypes.func,
  onAddThreadComment: PropTypes.func,
  onChangeVoteComment: PropTypes.func,
};

ThreadDetail.defaultProps = {
  onChangeVoteThreadDetail: null,
  onAddThreadComment: null,
  onChangeVoteComment: null,
};

export default ThreadDetail;
