import { useContext, useMemo } from "react";
import { FiFileText, FiSearch } from "react-icons/fi";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-context";
import LoadingSpinner from "./LoadingSpinner";

const getLikes = (reactions) => {
  if (typeof reactions === "object" && reactions !== null) {
    return Number(reactions.likes) || 0;
  }
  return Number(reactions) || 0;
};

const PostList = ({ searchTerm, feedMode }) => {
  const { postList, loading, loadError, reloadPosts } =
    useContext(PostListData);

  const visiblePosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const matchingPosts = postList.filter((post) => {
      if (!query) {
        return true;
      }
      const searchableContent = [
        post.title,
        post.body,
        post.author,
        ...(Array.isArray(post.tags) ? post.tags : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return searchableContent.includes(query);
    });

    if (feedMode === "popular") {
      return matchingPosts.sort(
        (first, second) => getLikes(second.reactions) - getLikes(first.reactions)
      );
    }
    return matchingPosts;
  }, [feedMode, postList, searchTerm]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (loadError) {
    return (
      <div className="alert alert-danger" role="alert">
        <p>Posts couldn&apos;t be loaded. {loadError}</p>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={reloadPosts}
        >
          Retry
        </button>
      </div>
    );
  }

  if (visiblePosts.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon" aria-hidden="true">
          {searchTerm ? <FiSearch /> : <FiFileText />}
        </div>
        <h2>{searchTerm ? "No matching posts" : "A fresh start"}</h2>
        <p>
          {searchTerm
            ? "Try another word or topic to find what you are looking for."
            : "There are no posts here yet. Be the first to share something."}
        </p>
      </div>
    );
  }

  return (
    <div className="post-list">
      {visiblePosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
