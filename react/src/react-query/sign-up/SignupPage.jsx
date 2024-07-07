import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "react-query";
import { createUser } from "../api";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;

const Error = styled.div`
  color: orange;
  font-size: 18px;
`;

const Btn = styled.button`
  margin-top: 20px;
`;

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email("이메일 형식이 적합하지 않습니다").required(),
  password: yup
    .string()
    .min(4, "비밀번호는 최소 4자리 입력해주세요.")
    .max(16, "비밀번호는 최대 16자리까지 입력해주세요.")
    .required(),
  age: yup.string(),
});

export default function SignUpPage() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema), // react-hook-form이랑 yup을 연결
    mode: "onChange", // 입력하면 바로 에러가 실행되게 설정
  });

  const queryClient = useQueryClient();

  const {
    mutate: CreateUser,
    isLoading,
    isError,
    error,
  } = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(); // 캐시가 있는 모든 쿼리 무효화
    },
  });

  const onClickSignUp = (data) => {
    try {
      CreateUser(data);
      alert("회원가입 완료되었습니다.");
      window.location.href = "/";
      console.log("data", data);
    } catch (error) {
      alert(error.message);
    }

    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    if (isError) {
      return <h2>{error.message}</h2>;
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onClickSignUp)}>
        <input type="text" placeholder="이름" {...register("name")} />
        <Error>{formState.errors.name?.message}</Error>
        <input type="text" placeholder="이메일" {...register("email")} />
        {/*  이메일 에러가 있다면 보여줘 */}
        <Error>{formState.errors.email?.message}</Error>
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password")}
        />
        <Error>{formState.errors.password?.message}</Error>
        <input type="number" placeholder="나이" {...register("age")} />
        <Error>{formState.errors.age?.message}</Error>
        {/* <Btn>로그인 하기</Btn> */}
        <Btn isActive={formState.isValid}>회원가입 하기</Btn>
      </Form>
    </div>
  );
}
