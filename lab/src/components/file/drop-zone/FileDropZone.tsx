/* eslint-disable jsx-a11y/alt-text */
import { useCallback, useEffect, useState } from "react";
import {
  ErrorCode,
  FileError,
  FileRejection,
  useDropzone,
} from "react-dropzone";

const FileDropZone = () => {
  const [file, setFile] = useState<any>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // 파일을 처리하는 로직을 여기에 작성합니다.
    console.log("acceptedFiles => ", acceptedFiles);

    acceptedFiles.forEach((file) => {
      // 확장자에 따른 최대 허용 크기 설정
      let maxSize;

      if (
        file.name.endsWith(".jpg") ||
        file.name.endsWith(".jpeg") ||
        file.name.endsWith(".png")
      ) {
        maxSize = 5 * 1024 * 1024; // 예: jpg 파일의 최대 크기를 5MB로 설정
      } else if (file.name.endsWith(".mp4")) {
        maxSize = 10 * 1024 * 1024; // 예: png 파일의 최대 크기를 10MB로 설정
      } else {
        maxSize = 2 * 1024 * 1024; // 기본적으로 2MB로 설정 (다른 확장자에 대한 기본값)
      }

      if (file.size <= maxSize) {
        // 파일 처리 로직
        console.log(`${file.name} is within the allowed size range.`);
      } else {
        console.error(`🍎 ${file.name} exceeds the allowed size.`);
        return;
      }
    });
  }, []);

  const returnThumb = () => {
    return (
      <div>
        <div>
          <img
            src={file && file?.preview}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file && file?.preview);
            }}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    return () => {
      setFile(URL.revokeObjectURL(file?.preview));
    };
  }, []);

  const onDropAccepted = (files: File[]) => {
    console.log("✅ 파일 업로드 성공");
    console.log("✅", files);
  };

  const onDropRejected = (fileRejections: FileRejection[]) => {
    fileRejections[0].errors.forEach(({ code }: FileError) => {
      switch (code) {
        case ErrorCode.FileInvalidType:
          console.log("🍎 파일 형식은 image/jpeg만 가능합니다.");
          break;

        case ErrorCode.FileTooSmall:
          console.log("🍎 파일 용량은 5MB를 넘어갈 수 없습니다.");
          break;

        case ErrorCode.FileTooLarge:
          console.log("🍎 파일 용량은 5MB를 넘어갈 수 없습니다.");
          break;

        case ErrorCode.TooManyFiles:
          console.log("🍎 파일을 최대 1개만 등록할 수 있습니다.");
          break;

        default:
          console.log("🍎 파일을 업로드할 수 없습니다.");

          break;
      }
    });
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    onDropAccepted,
    onDropRejected,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "video/mp4": [".mp4"],
    },
    // maxSize: convertToBite(megaBite),
    // minSize: 5 * 1024 * 1024,
    maxFiles: 1,
  });

  return (
    <div className="flex items-center justify-center w-screen h-full">
      <div
        {...getRootProps()}
        className="flex items-center justify-center w-1/2 text-sm text-center text-gray-400 border-2 border-dashed cursor-pointer h-1/3"
      >
        <input {...getInputProps()} />
        {isDragAccept && <p>파일을 여기에 놓아주세요!</p>}
        {isDragReject && <p>업로드할 수 없는 파일입니다.</p>}
        {!isDragActive && (
          <div>
            <p>파일을 드래그 앤 드롭하거나 클릭하여 파일을 선택하세요.</p>
            <p>(Only *.jpeg and *.png images will be accepted)</p>
          </div>
        )}
      </div>

      <aside className="w-20">{returnThumb()}</aside>
    </div>
  );
};

export default FileDropZone;

// 5MB를 바이트로 변환
const convertToBite = (megaBite: number) => {
  return megaBite * 1024 * 1024;
};

const isImage = (file: File) => {
  return file.type.startsWith("image/");
};

const isVideo = (file: File) => {
  return file.type.startsWith("video/");
};
