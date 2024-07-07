import { Area } from "@ant-design/plots";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { data } from "./data";
dayjs.locale("ko");

const DoubleAreaGraph = () => {
  const config = {
    xField: (d: any) => dayjs(d.date).format("M.D(ddd)"),
    yField: "count",
    seriesField: "group",
    colorField: "group",
    shapeField: "smooth",
    stack: false,
    // normalize: true, // 비율
    // 축
    axis: {
      //   x: { title: "date" }, // 축 제목
      y: { labelFormatter: (d: number) => d.toLocaleString() },
    },
    tooltip: {
      channel: "y",
      valueFormatter: (d: number) => d.toLocaleString(),
    },

    // diff: true, // 차이나는 부분만 보여주는 옵션
    scale: {
      color: { range: ["#67a9cf", "#BFBFBF"] },
      //   x: { utc: true },
      y: {
        nice: true,
        // type: "linear",
        //  tickCount: 5
      },
    },

    style: {
      fillOpacity: 1,
      fill: (
        chart: {
          date: string;
          group: "지난주" | "이번주";
          count: number;
        }[]
      ) => {
        return chart[0].group === "이번주"
          ? "linear-gradient(-90deg, white 0%, #64b5f6 100%)"
          : "transparent";
      },
      lineWidth: 1,
      // lineJoin: "round",
    },

    // ! hover 시 색상 변경
    state: {
      inactive: { opacity: 0.8 },
      active: {
        fill: "#51a8ff",
        opacity: 0.8,
        stroke: "white",
        strokeWidth: 2,
      },
    },
    interaction: {
      elementHighlightByColor: {
        link: true,
      },
    },

    // ! 애니메이션
    // https://ant-design-charts.antgroup.com/en/options/plots/animation/overview
    animate: { enter: { type: "growInX" } },

    // ! 라벨
    // label: {
    //   text: "group",
    //   selector: "last",
    //   style: {
    //     fontSize: 10,
    //   },
    // },

    // line: {
    //   style: {
    //     stroke: "white",
    //     strokeWidth: 2,
    //   },
    // },

    // ! 툴팁 커스텀
    // interaction: {
    //   tooltip: {
    //     render: (
    //       event: any,
    //       {
    //         title,
    //         items,
    //       }: {
    //         title: string;
    //         items: {
    //           date: string;
    //           group: "지난주" | "이번주";
    //           count: number;
    //         };
    //       }
    //     ) => <div>Your custom render content here.</div>,
    //   },
    // },
  };

  return (
    <div className="">
      <Area data={data} {...config} />
    </div>
  );
};

export default DoubleAreaGraph;
