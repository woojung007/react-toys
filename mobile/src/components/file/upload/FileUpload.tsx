import React, { useState, useEffect } from "react";

const FileUpload = () => {
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 이벤트 리스너를 설정
    const dropArea = document.getElementById("dropArea");

    const handleDrop = (event: any) => {
      event.preventDefault();
      setDragging(false);

      // 드래그된 파일 가져오기
      const files = event.dataTransfer.files;

      // 파일 업로드 처리
      handleFiles(files);
    };

    const handleDragOver = (event: any) => {
      event.preventDefault();
      setDragging(true);
    };

    const handleDragLeave = () => {
      setDragging(false);
    };

    dropArea?.addEventListener("drop", handleDrop);
    dropArea?.addEventListener("dragover", handleDragOver);
    dropArea?.addEventListener("dragleave", handleDragLeave);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      dropArea?.removeEventListener("drop", handleDrop);
      dropArea?.removeEventListener("dragover", handleDragOver);
      dropArea?.removeEventListener("dragleave", handleDragLeave);
    };
  }, []); // 빈 배열은 컴포넌트가 마운트될 때만 실행되도록 함

  const handleFiles = (files: any) => {
    // 파일 업로드 처리를 구현하는 코드
    for (let i = 0; i < files.length; i++) {
      console.log("업로드된 파일:", files[i].name);
      // 실제로 서버로 파일을 업로드하거나 다른 작업을 수행할 수 있습니다.
    }
  };

  return (
    <div
      id="dropArea"
      style={{
        width: "300px",
        height: "200px",
        border: `2px dashed ${dragging ? "blue" : "#ccc"}`,
        textAlign: "center",
        padding: "10px",
        margin: "50px auto",
      }}
    >
      <p>파일을 여기에 드래그하세요.</p>
    </div>
  );
};

export default FileUpload;
