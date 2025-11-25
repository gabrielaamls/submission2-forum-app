import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
    RECEIVE_THREAD_DETAIL: 'threadDetail/receive',
    CLEAR_THREAD_DETAIL: 'threadDetail/clear',
    CHANGE_VOTE_THREAD_DETAIL: 'threadDetail/changeVote',
    RECEIVE_COMMENTS: 'threadDetail/receiveComments',
    ADD_COMMENT: 'threadDetail/addComments',
    CHANGE_VOTE_COMMENT: 'threadDetail/changeVoteComments',
};

function receiveThreadDetailActionCreator(threadDetail) {
    return {
        type: ActionType.RECEIVE_THREAD_DETAIL,
        payload: {
            threadDetail,
        },
    };
}

function clearThreadDetailActionCreator() {
    return {
        type: ActionType.CLEAR_THREAD_DETAIL,
    };
}

function changeVoteThreadDetailActionCreator({ threadId, voteType, userId }) {
    return {
        type: ActionType.CHANGE_VOTE_THREAD_DETAIL,
        payload: {
            threadId,
            voteType,
            userId,
        },
    };
}

function asyncReceiveThreadDetail(threadId) {
    return async (dispatch) => {
        dispatch(showLoading());
        dispatch(clearThreadDetailActionCreator());
        try {
            const threadDetail = await api.getThreadDetail(threadId);
            dispatch(receiveThreadDetailActionCreator(threadDetail));
        } catch (error) {
            alert(error.message);
        }
        dispatch(hideLoading());
    };
}

function asyncChangeVoteThreadDetail(voteType ) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { threadDetail, authUser } = getState();
        dispatch(changeVoteThreadDetailActionCreator({ threadId: threadDetail.id, voteType, userId: authUser.id }));
        try {
            await api.changeVoteThread({ threadId: threadDetail.id, voteType });
        } catch (error) {
            alert(error.message);
            dispatch(changeVoteThreadDetailActionCreator({ threadId: threadDetail.id, voteType, userId: authUser.id }));
        }
        dispatch(hideLoading());
    };
}

function addCommentActionCreator(comment) {
    return {
        type: ActionType.ADD_COMMENT,
        payload: {
            comment,
        },
    };
}

function changeVoteCommentActionCreator({ commentId, voteType, userId }) {
    return {
        type: ActionType.CHANGE_VOTE_COMMENT,
        payload: {
            commentId,
            voteType,
            userId,
        },
    };
}

function asyncAddComment(content) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { threadDetail } = getState();
        try {
            const comment = await api.createComment({ threadId: threadDetail.id, content });
            dispatch(addCommentActionCreator(comment));
        } catch (error) {
            alert(error.message);
        }
        dispatch(hideLoading());
    };
}

function asyncChangeVoteComment({ commentId, voteType }) {
    return async (dispatch, getState) => {
        dispatch(showLoading());
        const { authUser, threadDetail } = getState();
        dispatch(changeVoteCommentActionCreator({ commentId, voteType, userId: authUser.id }));

        try {
            await api.changeVoteComment({ threadId: threadDetail.id, commentId, voteType });
        } catch (error) {
            alert(error.message);
            dispatch(changeVoteCommentActionCreator({ commentId, voteType, userId: authUser.id }));
        }
        dispatch(hideLoading());
    };
}

export {
    ActionType,
    receiveThreadDetailActionCreator,
    clearThreadDetailActionCreator,
    asyncReceiveThreadDetail,
    asyncChangeVoteThreadDetail,
    addCommentActionCreator,
    asyncChangeVoteComment,
    asyncAddComment,
};
