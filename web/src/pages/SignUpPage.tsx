import React, { useState } from "react";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
    };
    if (!formData.username) newErrors.username = "아이디를 입력하세요.";
    if (!formData.email) newErrors.email = "이메일을 입력하세요.";
    if (!formData.password) newErrors.password = "비밀번호를 입력하세요.";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    if (!formData.nickname) newErrors.nickname = "닉네임을 입력하세요.";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // 폼 제출 로직
      console.log("회원가입 정보:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>아이디</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <span>{errors.username}</span>}
      </div>

      <div>
        <label>이메일</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>

      <div>
        <label>비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>

      <div>
        <label>닉네임</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
        />
        {errors.nickname && <span>{errors.nickname}</span>}
      </div>

      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignUpPage;
