import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncAddComment,
  asyncChangeVoteComment,
  asyncChangeVoteThreadDetail,
  asyncReceiveThreadDetail,
} from "../states/threadDetail/action";
import ThreadDetail from "../components/ThreadDetail";

function DetailPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onChangeVoteThreadDetail = (voteType) => {
    dispatch(asyncChangeVoteThreadDetail(voteType));
  };

  const onAddThreadComment = (content) => {
    dispatch(asyncAddComment(content));
  };

  const onChangeVoteComment = ({ commentId, voteType }) => {
    dispatch(asyncChangeVoteComment({ commentId, voteType }));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mb-3">
          <ThreadDetail
            {...threadDetail}
            authUser={authUser.id}
            onChangeVoteThreadDetail={onChangeVoteThreadDetail}
            onAddThreadComment={onAddThreadComment}
            onChangeVoteComment={onChangeVoteComment}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
