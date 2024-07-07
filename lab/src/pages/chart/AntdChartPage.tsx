import DoubleAreaGraph from "components/chart/DoubleAreaGraph";

const AntdChartPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <DoubleAreaGraph />

      {/* <CirclePackingGraph /> */}
    </div>
  );
};

export default AntdChartPage;
