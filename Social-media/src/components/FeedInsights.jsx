import { useContext } from "react";
import { FiHash } from "react-icons/fi";
import { PostList } from "../store/post-list-context";

const FeedInsights = () => {
  const { postList } = useContext(PostList);
  const totalReactions = postList.reduce((total, post) => {
    const likes =
      typeof post.reactions === "object" && post.reactions !== null
        ? Number(post.reactions.likes) || 0
        : Number(post.reactions) || 0;
    return total + likes;
  }, 0);

  const counts = new Map();
  postList.forEach((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        const normalizedTag = String(tag).replace(/^#+/, "").trim();
        if (normalizedTag) {
          counts.set(normalizedTag, (counts.get(normalizedTag) || 0) + 1);
        }
      });
    }
  });
  const trendingTopics = [...counts.entries()]
    .sort((first, second) => second[1] - first[1] || first[0].localeCompare(second[0]))
    .slice(0, 4);

  return (
    <aside className="insights-column" aria-label="Community information">
      <section className="insight-card">
        <h2>Community pulse</h2>
        <div className="stats-grid">
          <div className="stat-tile">
            <strong>{postList.length}</strong>
            <span>posts in your feed</span>
          </div>
          <div className="stat-tile">
            <strong>{totalReactions.toLocaleString()}</strong>
            <span>community reactions</span>
          </div>
        </div>
      </section>
      <section className="insight-card">
        <h2>Topics to explore</h2>
        {trendingTopics.length > 0 ? (
          <div className="trending-list">
            {trendingTopics.map(([tag, count]) => (
              <div className="trending-item" key={tag}>
                <div className="trending-icon">
                  <FiHash aria-hidden="true" />
                </div>
                <div>
                  <strong>#{tag}</strong>
                  <span>
                    {count} {count === 1 ? "post" : "posts"} in your feed
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="insight-empty">
            Add a topic to a post and it will show up here.
          </p>
        )}
      </section>
      <section className="insight-card tip-card">
        <h2>Make it a good one</h2>
        <p>
          A little context helps people join in. Share what you learned, ask a
          clear question, and keep the conversation kind.
        </p>
      </section>
    </aside>
  );
};

export default FeedInsights;
