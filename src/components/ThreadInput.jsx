import { useState } from "react";
import PropTypes from "prop-types";

function ThreadInput({ onAddThread }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  function addThread() {
    if (title.trim() && body.trim()) {
      onAddThread({ title, body, category });
    }
  }

  function handleTitle({ target }) {
    if (target.value.length <= 50) {
      setTitle(target.value);
    }
  }

  function handleBody({ target }) {
    if (target.value.length <= 1000) {
      setBody(target.value);
    }
  }

  function handleCategory({ target }) {
    setCategory(target.value);
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="ps-2">Buat Thread</h3>
        <hr />
        <div className="form">
          <div className="mb-3">
            <label htmlFor="inputTitle" className="form-label">
              Judul
            </label>
            <div className="input-group">
              <input
                type="text"
                id="inputTitle"
                onChange={handleTitle}
                value={title}
                className="form-control"
              />
              <span className="input-group-text">{title.length}/50</span>
            </div>
          </div>
          <div>
            <label htmlFor="inputBody" className="form-label">
              Konten
            </label>
            <textarea
              rows="5"
              id="inputBody"
              onChange={handleBody}
              className="form-control"
            ></textarea>
            <div className="text-end">
              <span>{body.length}/1000</span>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputCategory" className="form-label">
              Kategori
            </label>
            <input
              type="text"
              id="inputCategory"
              onChange={handleCategory}
              className="form-control"
            />
          </div>
          <div className="mb-4 text-end">
            <button
              type="button"
              onClick={addThread}
              className="btn btn-dark btn-block"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ThreadInput.propTypes = {
  onAddThread: PropTypes.func.isRequired,
};

export default ThreadInput;
