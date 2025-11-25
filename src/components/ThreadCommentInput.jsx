import { useState } from "react";
import PropTypes from "prop-types";

function ThreadCommentInput({ onAddThreadComment }) {
  const [content, setContent] = useState("");

  function addThreadComment() {
    if (content.trim()) {
      onAddThreadComment(content);
      setContent("");
    }
  }

  function handleContent({ target }) {
    if (target.value.length <= 350) {
      setContent(target.value);
    }
  }

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <h5>Komentar</h5>
          <span>{content.length}/350</span>
        </div>
        <textarea
          rows="5"
          id="inputBody"
          placeholder="Berikan komentar disini..."
          onChange={handleContent}
          value={content}
          className="form-control"
        ></textarea>
      </div>
      <div className="mb-4 mt-3 text-end">
        <button
          type="button"
          onClick={addThreadComment}
          className="btn btn-dark btn-block"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}

ThreadCommentInput.propTypes = {
  onAddThreadComment: PropTypes.func.isRequired,
};

export default ThreadCommentInput;
