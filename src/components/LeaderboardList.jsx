import PropTypes from "prop-types";
import LeaderboardItem, { leaderboardItemShape } from "./LeaderboardItem.jsx";

function LeaderboardList({ leaderboards }) {
  return (
    <ul className="list-group list-group-flush">
      {leaderboards.map((leaderboard, key) => (
        <LeaderboardItem key={key} leaderboard={leaderboard} />
      ))}
    </ul>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardItemShape))
    .isRequired,
};

export default LeaderboardList;
