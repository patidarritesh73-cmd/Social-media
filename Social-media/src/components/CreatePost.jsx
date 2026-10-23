import { useContext, useState } from "react";
import { FiSend } from "react-icons/fi";
import { PostList } from "../store/post-list-context";

const CreatePost = ({ onPostCreated }) => {
  const { addPost } = useContext(PostList);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setSubmitError("");
    const parsedTags = [
      ...new Set(
        tags
          .split(/[,\s]+/)
          .map((tag) => tag.replace(/^#+/, "").trim().toLowerCase())
          .filter(Boolean)
      ),
    ];

    try {
      await addPost(author.trim(), title.trim(), body.trim(), parsedTags);
      onPostCreated();
    } catch (error) {
      console.error("Unable to create post:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Your post could not be saved."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="create-page">
      <div className="create-heading">
        <h1>Make a little noise.</h1>
        <p>
          Share something useful, celebrate a win, or start a conversation.
        </p>
      </div>
      <form className="create-card" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="post-author" className="form-label">
            Your name
          </label>
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className="form-control"
            id="post-author"
            placeholder="How should we credit you?"
            maxLength={40}
            autoComplete="name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="post-title" className="form-label">
            Give it a title
          </label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="form-control"
            id="post-title"
            placeholder="A few words to introduce your post"
            maxLength={100}
            required
          />
          <div className="field-help">
            <span>Make it clear and easy to scan.</span>
            <span>{title.length}/100</span>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="post-body" className="form-label">
            What would you like to share?
          </label>
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            className="form-control"
            id="post-body"
            placeholder="Tell the community a little more..."
            maxLength={2000}
            required
          />
          <div className="field-help">
            <span>Helpful context makes a great conversation.</span>
            <span>{body.length}/2000</span>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="post-tags" className="form-label">
            Topics <span className="text-secondary fw-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            className="form-control"
            id="post-tags"
            placeholder="design, learning, weekend"
          />
          <div className="field-help">
            <span>Separate topics with spaces or commas.</span>
          </div>
        </div>
        {submitError && (
          <div className="alert alert-danger" role="alert">
            {submitError}
          </div>
        )}
        <button type="submit" className="create-submit" disabled={isSaving}>
          <FiSend aria-hidden="true" />
          {isSaving ? "Saving your post..." : "Share with the community"}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
