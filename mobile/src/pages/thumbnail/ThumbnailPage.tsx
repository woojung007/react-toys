import React, { useState } from "react";

const rows = [
  {
    id: 1,
    name: "고양이 1",
    type: "IMAGE",
    thumbnailUrl:
      "https://image.newsis.com/2023/07/12/NISI20230712_0001313626_web.jpg",
  },
  {
    id: 2,
    name: "고양이 2",
    type: "IMAGE",
    thumbnailUrl:
      "https://image.dongascience.com/Photo/2022/12/cfa35ae6776d633dd5752500c86b062b.jpg",
  },
  {
    id: 3,
    name: "고양이 3",
    type: "VIDEO",
    thumbnailUrl:
      "https://vod-progressive.akamaized.net/exp=1701365846~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4044%2F16%2F420224623%2F1814595305.mp4~hmac=446af79aacb7e3778137671d8a6743e83b27fd289ee531f153aa23143063c9e0/vimeo-prod-skyfire-std-us/01/4044/16/420224623/1814595305.mp4?filename=file.mp4",
  },
];

const TableWithThumbnails = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 마우스를 올린 행에 대한 이벤트 핸들러
  const handleMouseEnter = (index: number, e: React.MouseEvent) => {
    setHoveredRow(index);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // 마우스를 뗀 행에 대한 이벤트 핸들러
  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  return (
    <>
      <table className="w-full">
        <colgroup>
          <col width="10%" />
          <col width="70%" />
          <col width="20%" />
        </colgroup>
        <thead className="h-10 border-b border-black bg-gray-50">
          <tr>
            <th>No.</th>
            <th>이름</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => (
            <tr
              key={item.id}
              className="h-10 border cursor-pointer border-b-gray-100"
            >
              <td className="border-r">{item.id}</td>
              <td className="border-r">
                <div
                  onMouseEnter={(e) => handleMouseEnter(index, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span>{item.name}</span>
                  {hoveredRow === index && (
                    <div
                      className="border-2 border-red-400 w-30"
                      style={{
                        position: "fixed",
                        top: mousePosition.y + 10,
                        left: mousePosition.x + 10,
                        zIndex: 1000,
                      }}
                    >
                      {item.type === "IMAGE" ? (
                        <img
                          src={item.thumbnailUrl}
                          alt={`Thumbnail for ${item.name}`}
                        />
                      ) : (
                        <video autoPlay muted src={item.thumbnailUrl}>
                          <source />
                        </video>
                      )}
                    </div>
                  )}
                </div>
              </td>
              <td>
                <div className="text-xs leading-3 text-[#444] whitespace-nowrap">
                  2023-12-01
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableWithThumbnails;
