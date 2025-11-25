import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ThreadList from "../components/ThreadList";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import { asyncChangeVoteThread } from "../states/threads/action";
import { useParams } from "react-router-dom";
import ThreadPopularList from "../components/ThreadPopularList.jsx";
import LeaderboardList from "../components/LeaderboardList.jsx";

function HomePage() {
  const {
    users = [],
    threads = [],
    leaderboards = [],
    authUser,
  } = useSelector((states) => states);

  const { category } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onChangeVote = ({ threadId, voteType }) => {
    dispatch(asyncChangeVoteThread({ threadId, voteType }));
  };

  const categoryCount = {};
  threads.forEach((thread) => {
    const category = thread.category;
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });
  const categoryPopular = Object.keys(categoryCount).sort(
    (category1, category2) =>
      categoryCount[category1] - categoryCount[category2]
  );

  const threadList = threads
    .filter((thread) => !category || category === thread.category)
    .map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId),
      authUser: authUser.id,
    }));

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mb-3">
            <ThreadList threads={threadList} onChangeVote={onChangeVote} />
          </div>

          <div className="col-lg-3 mb-4 mb-lg-0 px-lg-0 mt-lg-0">
            <div>
              <div>
                <div className="bg-white mb-3">
                  <h5 className="px-3 py-4 op-5 m-0">Kategori Populer</h5>
                  <hr className="m-0" />
                  <div className="px-3 py-3">
                    <ThreadPopularList
                      categoryPopular={categoryPopular}
                      currentCategory={category}
                    />
                  </div>
                </div>
                <div className="bg-white text-sm pb-3">
                  <h5 className="px-3 py-4 op-5 m-0 roboto-bold">
                    Klasmen Pengguna Aktif
                  </h5>
                  <hr className="my-0" />
                  <div>
                    <LeaderboardList leaderboards={leaderboards} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
