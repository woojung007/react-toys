import Spinner1 from "components/loader/spinner1/Spinner1";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "pages/infinite-scroll/ReactInfiniteScrollPage.module.css";
import TENANTS from "data/tenants.json";

const PAGE_SIZE = 10;

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMoreData = () => {
    setCurrentPage((prev) => prev + 1); // ! 중요
  };

  const renderData = () => {
    console.log("render!!!!! ");

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    return TENANTS.slice(0, endIndex).map((item) => (
      <div key={item.guid} className={styles.item}>
        {item.name}
      </div>
    ));
  };

  return (
    <div className={styles.wrapper}>
      <InfiniteScroll
        dataLength={currentPage * PAGE_SIZE}
        next={fetchMoreData}
        hasMore={currentPage * PAGE_SIZE < TENANTS.length}
        loader={<Spinner1 />}
      >
        {renderData()}
      </InfiniteScroll>
    </div>
  );
};

export default MyComponent;
