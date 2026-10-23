import { createContext } from "react";

export const PostList = createContext({
  postList: [],
  loading: true,
  loadError: "",
  reloadPosts: async () => {},
  addPost: () => {},
  deletePost: () => {},
});
