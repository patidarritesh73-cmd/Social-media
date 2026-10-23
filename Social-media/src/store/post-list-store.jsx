import { useCallback, useEffect, useMemo, useReducer } from "react";
import { createPost, deletePost, listPosts } from "../services/posts-api";
import { PostList } from "./post-list-context";

const initialState = {
  postList: [],
  loading: true,
  loadError: "",
};

const postListReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, loadError: "" };
    case "LOAD_SUCCESS":
      return { postList: action.posts, loading: false, loadError: "" };
    case "LOAD_ERROR":
      return { ...state, loading: false, loadError: action.message };
    case "ADD_POST":
      return { ...state, postList: [action.post, ...state.postList] };
    case "DELETE_POST":
      return {
        ...state,
        postList: state.postList.filter((post) => post.id !== action.postId),
      };
    default:
      return state;
  }
};

const PostListProvider = ({ children }) => {
  const [state, dispatchPostList] = useReducer(postListReducer, initialState);

  const reloadPosts = useCallback(async () => {
    dispatchPostList({ type: "LOAD_START" });
    try {
      const posts = await listPosts();
      dispatchPostList({ type: "LOAD_SUCCESS", posts });
    } catch (error) {
      console.error("Unable to load posts:", error);
      dispatchPostList({
        type: "LOAD_ERROR",
        message:
          error instanceof Error ? error.message : "Unable to load posts.",
      });
    }
  }, []);

  useEffect(() => {
    reloadPosts();
  }, [reloadPosts]);

  const addPost = useCallback(async (author, title, body, tags) => {
    const post = await createPost({ author, title, body, tags });
    dispatchPostList({ type: "ADD_POST", post });
  }, []);

  const removePost = useCallback(async (postId) => {
    await deletePost(postId);
    dispatchPostList({ type: "DELETE_POST", postId });
  }, []);

  const contextValue = useMemo(
    () => ({
      postList: state.postList,
      loading: state.loading,
      loadError: state.loadError,
      reloadPosts,
      addPost,
      deletePost: removePost,
    }),
    [state, reloadPosts, addPost, removePost]
  );

  return (
    <PostList.Provider value={contextValue}>{children}</PostList.Provider>
  );
};

export default PostListProvider;
