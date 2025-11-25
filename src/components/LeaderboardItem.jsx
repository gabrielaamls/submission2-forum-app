import PropTypes from 'prop-types';

function LeaderboardList({ leaderboard }) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <span>
                <img className="thread-avatar" src={leaderboard.user.avatar} alt={`avatar ${leaderboard.user.name}`}/>
                <span className="ps-2">{leaderboard.user.name}</span>
            </span>
            <span className="badge bg-success rounded-pill">{leaderboard.score}</span>
        </li>
    );
}

const userShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
};

const leaderboardItemShape = {
    user: PropTypes.shape(userShape).isRequired,
    score: PropTypes.number.isRequired,
};

LeaderboardList.propTypes = {
    leaderboard: PropTypes.shape(leaderboardItemShape).isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export {leaderboardItemShape};

export default LeaderboardList;
