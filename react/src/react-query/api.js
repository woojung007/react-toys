import axios from "axios";

export const getPosts = async () => {
  return await axios.get("http://localhost:9000/posts");
};

export const getPost = async (id) => {
  return await axios.get(`http://localhost:9000/posts/${id}`);
};

export const addPost = async (post) => {
  return await axios.post("http://localhost:9000/posts", post);
};

export const deletePost = async (id) => {
  return await axios.delete(`http://localhost:9000/posts/${id}`);
};

export const updatePost = async (id, put) => {
  return await axios.put(`http://localhost:9000/posts/${id}`, put);
};

export const createUser = async (post) => {
  return await axios.post("http://localhost:9000/profiles", post);
};

export const getUsers = async () => {
  return await axios.get("http://localhost:9000/profiles");
};
