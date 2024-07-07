import PostItemPage from "./PostItem/PostItemPage";
import { Wrapper, Textarea } from "./post.styles";

export default function PostPresenter(props) {
  return (
    <div>
      <Wrapper>
        <input
          type="text"
          placeholder="제목"
          onChange={(e) => props.setTitle(e.target.value)}
        />

        <Textarea
          type="text"
          placeholder="본문"
          onChange={(e) => props.setBody(e.target.value)}
        />
        <button
          style={{ marginLeft: "20px" }}
          onClick={props.AddPost}
          id={[props.title, props.body]}
        >
          작성하기
        </button>
      </Wrapper>
      <div>
        {props.data?.data.map((el, idx) => (
          <PostItemPage
            el={el}
            idx={idx}
            key={el.id}
            isEdit={props.isEdit}
            onClickDoneEdit={props.onClickDoneEdit}
            onClickEdit={props.onClickEdit}
            onClickDeletePost={props.onClickDeletePost}
            setTitle={props.setTitle}
            setBody={props.setBody}
          />
        ))}
      </div>
    </div>
  );
}
