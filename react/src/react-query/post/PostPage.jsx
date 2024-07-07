import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addPost, deletePost, getPosts } from "../api";
import PostPresenter from "./post.presenter";

export default function PostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Read
  const { data } = useQuery("getPosts", getPosts, {
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const { mutate: DeletePost } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  // Create
  const AddPost = (event) => {
    const temp = event.target.id.split(",");
    console.log("add temp", temp);
    const post = {
      title: temp[0],
      body: temp[1],
    };
    mutate(post);

    alert("게시글이 등록되었습니다.");

    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    if (isError) {
      return <h2>{error.message}</h2>;
    }
  };

  // Delete
  const onClickDeletePost = (event) => {
    DeletePost(event.target.id);
    alert("게시글이 삭제되었습니다.");
  };

  return (
    <PostPresenter
      setTitle={setTitle}
      setBody={setBody}
      AddPost={AddPost}
      title={title}
      body={body}
      data={data}
      onClickDeletePost={onClickDeletePost}
    />
  );
}
