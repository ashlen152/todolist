export const apiUrl =
  process.env.NODE_ENV !== "production" ? "http://localhost:3000/api" : "";

export const LOCAL_STORAGE_TOKEN_NAME = "learnit-mern";

export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";

export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";

export const POSTS_ADD_POST = "POSTS_ADD_POST";
export const POSTS_DELETED_POST = "POSTS_DELETED_POST";
export const POSTS_UPDATED_POST = "POSTS_UPDATED_POST";
export const POSTS_FINED_POST = "POSTS_FINED_POST";
