import PropTypes from "prop-types";
import ThreadItem, { threadItemShape } from "./ThreadItem";

function ThreadList({ threads, onChangeVote }) {
  return (
    <div>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} onChangeVote={onChangeVote} />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  onChangeVote: PropTypes.func.isRequired,
};

export default ThreadList;
