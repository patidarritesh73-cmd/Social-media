import { mockPosts } from "./mock-posts";

const STORAGE_KEY = "smalltalk.mock-posts";

const readPosts = () => {
  const savedPosts = window.localStorage.getItem(STORAGE_KEY);
  if (savedPosts === null) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mockPosts));
    return mockPosts;
  }

  let posts;
  try {
    posts = JSON.parse(savedPosts);
  } catch (error) {
    throw new Error("Saved demo posts are invalid. Clear the app's local data to reset them.", {
      cause: error,
    });
  }

  if (!Array.isArray(posts)) {
    throw new Error("Saved demo posts have an invalid format.");
  }
  return posts;
};

export const listPosts = async () => readPosts();

export const createPost = async ({ author, title, body, tags }) => {
  const posts = readPosts();
  const post = {
    id: window.crypto?.randomUUID?.() ?? `post-${Date.now()}`,
    author,
    title,
    body,
    tags,
    reactions: { likes: 0, dislikes: 0 },
    createdAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([post, ...posts]));
  return post;
};

export const deletePost = async (postId) => {
  const posts = readPosts();
  const updatedPosts = posts.filter((post) => post.id !== postId);
  if (updatedPosts.length === posts.length) {
    throw new Error("That post could not be found. Refresh the feed and try again.");
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
};
