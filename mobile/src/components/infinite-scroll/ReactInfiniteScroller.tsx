import InlineSpinner from "components/loader/inline/InlineSpinner";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import styles from "pages/infinite-scroll/ReactInfiniteScrollPage.module.css";
import TENANTS from "data/tenants.json";

const PAGE_SIZE = 10;

const ReactInfiniteScroll = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const onLoadMore = () => {
    console.log("fetch more");
    setCurrentPage((prev) => prev + 1); // ! 중요
  };

  return (
    <div className={styles.scroller_wrapper}>
      <InfiniteScroll
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={currentPage * PAGE_SIZE < TENANTS.length}
        loader={
          <div className="loader" key={"infinite-scroll-loader"}>
            {/* Loading ... */}
            <InlineSpinner />
          </div>
        }
        useWindow={false}
      >
        {TENANTS.slice(0, endIndex).map((item) => (
          <div key={item.guid} className={styles.item}>
            {item.name}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ReactInfiniteScroll;
