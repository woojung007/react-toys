import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SelectAndUrl = () => {
  const [value, setValue] = useState("naver");

  const navigate = useNavigate();

  const { search } = useLocation();

  useEffect(() => {
    const email = new URLSearchParams(search).get("email");
    console.log("email ::", email);
  }, [search]);

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);

    navigate(`/select-url?email=${e.target.value}`);
  };

  return (
    <div className="flex items-center justify-center h-[700px]">
      <select
        onChange={handleChangeSelect}
        name="email"
        className="px-2 border appearance-none w-44 h-9"
        value={value}
      >
        <option value="google">구글</option>
        <option value="naver">네이버</option>
        <option value="daum">다음</option>
      </select>
    </div>
  );
};

export default SelectAndUrl;
