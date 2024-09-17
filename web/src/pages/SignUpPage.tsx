import { FieldErrors, useForm } from "react-hook-form";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    mode: "onChange", // 입력 시마다 유효성 검사를 즉시 수행
  });

  /**
   * 성공했을 경우
   * @param data
   */
  const onSubmit = (data: FormData) => {
    console.log("회원가입 정보:", data);
  };

  /**
   * 실패했을 경우
   * @param errors
   */
  const onError = (errors: FieldErrors<FormData>) => {
    const formData = watch(); // 현재 폼 데이터를 가져온다.
    console.log("유효성 검사 실패:", formData);
    console.log("에러:", errors);
  };

  // 비밀번호 확인 필드에서 사용자가 입력한 비밀번호와 기존 비밀번호가 일치하는지 검증하기 위해 비밀번호를 계속 확인한다.
  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <label>아이디</label>
        <input
          type="text"
          {...register("username", { required: "아이디를 입력하세요" })}
        />
        {errors.username && <span>{errors.username.message}</span>}
      </div>

      <div>
        <label>이메일</label>
        <input
          type="email"
          {...register("email", {
            required: "이메일을 입력하세요.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "유효한 이메일을 입력하세요.",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>비밀번호</label>
        <input
          type="password"
          {...register("password", { required: "비밀번호를 입력하세요." })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <label>비밀번호 확인</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "비밀번호 확인을 입력하세요.",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          })}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </div>

      <div>
        <label>닉네임</label>
        <input
          type="text"
          {...register("nickname", { required: "닉네임을 입력하세요." })}
        />
        {errors.nickname && <span>{errors.nickname.message}</span>}
      </div>

      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignUpPage;
