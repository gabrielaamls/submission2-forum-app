import PropTypes from "prop-types";
import ThreadCommentItem, { commentItemShape } from "./ThreadCommentItem";

function ThreadList({ comments, authUser, onChangeVoteComment }) {
  return (
    <div>
      <h5>Komentar ({comments.length})</h5>
      {comments.map((comment) => (
        <ThreadCommentItem
          key={comment.id}
          {...comment}
          authUser={authUser}
          onChangeVoteComment={onChangeVoteComment}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  authUser: PropTypes.string.isRequired,
  onChangeVoteComment: PropTypes.func.isRequired,
};

export default ThreadList;
