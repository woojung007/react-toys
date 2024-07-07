import styled from "@emotion/styled";
import { useState } from "react";
import { useQuery } from "react-query";
import { getUsers } from "../api";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;

const Btn = styled.button`
  margin-top: 20px;
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data } = useQuery("getUsers", getUsers);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onClickLogin = () => {
    try {
      window.location.href = "/post";
      localStorage.setItem("login", JSON.stringify({ email, password }));
      alert("로그인 성공하였습니다.");
      console.log(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const moveToSignUp = () => {
    window.location.href = "/signup";
  };

  return (
    <div>
      <Form>
        <input type="text" placeholder="이메일" onChange={onChangeEmail} />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={onChangePassword}
        />

        <div>
          <Btn onClick={onClickLogin}>로그인 하기</Btn>
          <Btn
            type="button"
            style={{ marginLeft: "20px" }}
            onClick={moveToSignUp}
          >
            회원가입 하기
          </Btn>
        </div>
      </Form>
    </div>
  );
}
