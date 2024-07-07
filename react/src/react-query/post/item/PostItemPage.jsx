import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updatePost } from "../../api";
import * as S from "../post.styles";

export default function PostItemPage(props) {
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const {
    mutate: putPost,
    isLoading,
    isError,
    error,
  } = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeBody = (event) => {
    setBody(event.target.value);
  };

  const onClickEdit = () => {
    // editArr.push(el.id);
    setIsEdit((prev) => !prev);
    // console.log(editArr, editArr.includes(Number(el.id)));
  };

  // Update
  const editArr = [];
  const PutPost = (el) => (event) => {
    // editArr.filter((filterEl) => filterEl.id !== el.id);
    editArr.push(event.target.id);
    const temp = event.target.id.split(",");

    const updateVariables = {};
    // if (id) updateVariables.id = id;
    // if (userId) updateVariables.userId = userId;
    if (props.title) updateVariables.title = props.title;
    if (props.body) updateVariables.body = props.body;

    const put = {
      userId: 3,
      title: temp[0],
      body: temp[1],
      id: el.id,
    };
    putPost(el.id, put);

    setIsEdit((prev) => !prev);
    alert("게시글이 수정되었습니다.");

    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    if (isError) {
      return <h2>{error.message}</h2>;
    }
  };

  return (
    <S.PostWrapper key={props.el.id}>
      <S.Id>{props.idx + 1}</S.Id>
      <S.Id>{props.el.id}</S.Id>
      {isEdit && (
        <>
          <S.Input
            type="text"
            placeholder="제목"
            onChange={onChangeTitle}
            defaultValue={props.el?.title || title || ""}
          />

          <S.Textarea
            type="text"
            placeholder="본문"
            onChange={onChangeBody}
            defaultValue={props.el?.body || body || ""}
          ></S.Textarea>
        </>
      )}
      {!isEdit && (
        <>
          <S.Title>{props.el.title || title}</S.Title>
          <S.Body>{props.el.body || body}</S.Body>
        </>
      )}

      <S.BtnWrapper>
        <S.Btn
          onClick={isEdit ? PutPost(props.el) : onClickEdit}
          id={[title, body]}
        >
          {isEdit ? "수정완료" : "수정하기"}
        </S.Btn>
        <S.Btn id={props.el.id} onClick={props.onClickDeletePost}>
          삭제하기
        </S.Btn>
      </S.BtnWrapper>
    </S.PostWrapper>
  );
}
