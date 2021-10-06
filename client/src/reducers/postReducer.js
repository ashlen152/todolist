import {
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
  POSTS_ADD_POST,
  POSTS_DELETED_POST,
  POSTS_UPDATED_POST,
  POSTS_FINED_POST,
} from "../contexts/constants";

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };
    case POSTS_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postLoading: false,
      };
    case POSTS_ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    case POSTS_DELETED_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload._id),
      };
    case POSTS_UPDATED_POST:
      const newPosts = state.posts.map((post) =>
        post._id === payload._id ? payload : post
      );

      return {
        ...state,
        posts: newPosts,
      };
    case POSTS_FINED_POST:
      return {
        ...state,
        post: payload,
      };
    default:
      return state;
  }
};
