import { useContext, useState } from "react";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import { PostList } from "../store/post-list-context";

const getReactions = (reactions) => {
  if (typeof reactions === "number" || typeof reactions === "string") {
    return { likes: Number(reactions) || 0, dislikes: null };
  }
  return {
    likes: Number(reactions?.likes) || 0,
    dislikes:
      reactions?.dislikes === undefined ? null : Number(reactions.dislikes) || 0,
  };
};

const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { likes, dislikes } = getReactions(post.reactions);
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const author = post.author || "Community member";
  const initials = author
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
  const createdAt = post.createdAt ? new Date(post.createdAt) : null;
  const createdLabel =
    createdAt && !Number.isNaN(createdAt.getTime())
      ? new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(createdAt)
      : "From the community";

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError("");
    try {
      await deletePost(post.id);
    } catch (error) {
      console.error("Unable to delete post:", error);
      setDeleteError(
        error instanceof Error ? error.message : "This post could not be removed."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article className="post-card">
      <div className="post-author-row">
        <div className="avatar" aria-hidden="true">
          {initials || "C"}
        </div>
        <div className="post-author">
          <strong>{author}</strong>
          <span>{createdLabel}</span>
        </div>
        <button
          type="button"
          className="delete-post"
          onClick={handleDelete}
          disabled={isDeleting}
          aria-label={`Remove post: ${post.title}`}
          title="Remove post"
        >
          <FiTrash2 />
        </button>
      </div>
      {deleteError && (
        <div className="alert alert-danger post-error" role="alert">
          {deleteError}
        </div>
      )}
      <h3>{post.title}</h3>
      <p className="post-body">{post.body}</p>
      {tags.length > 0 && (
        <div className="post-tags" aria-label="Post topics">
          {tags.map((tag, index) => (
            <span key={`${tag}-${index}`} className="post-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div className="post-reactions">
        <FiHeart aria-hidden="true" />
        <strong>{likes.toLocaleString()}</strong>
        {dislikes === null ? (
          <span>people found this worth reacting to</span>
        ) : (
          <span>
            likes <span aria-hidden="true">·</span> {dislikes.toLocaleString()}{" "}
            dislikes
          </span>
        )}
      </div>
    </article>
  );
};

export default Post;
