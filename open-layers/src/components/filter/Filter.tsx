import classNames from "classnames";
import { FilterProps } from "components/filter/Filter.type";
import FilterGroup from "components/filter/FilterGroup";
import useFilter from "hooks/useFilter";
import styles from "./Filter.module.scss";

export default function Filter({
  filterGroups,
  setFilterGroups,
  clearButton = false,
  selectAllButton = false,
  showChips = false,
}: FilterProps) {
  const {
    totalCount,
    updateFilterDatas,
    setTotalCount,
    onClickSelectAll,
    updateAllSelect,
  } = useFilter({
    filterGroups,
    setFilterGroups,
  });
  return (
    <div className={styles["filter__container"]}>
      {/* 필터 버튼 */}
      {/* <FilterButton onClick={toggleDropdown} /> */}

      {/* 선택 드롭다운 */}
      <div
        className={classNames(styles["filter_content__container"], {
          [styles.show__chips]: showChips,
        })}
        // style={{ display: isOpenDropdown ? "inline-flex" : "none" }}
        style={{ display: "inline-flex" }}
      >
        <div className={styles["content__header"]}>
          <div className={styles["title__wrap"]}>
            {/* 필터 */}
            <span>필터</span>
            {/* 선택된 필터 수 */}
            <span className={styles["-total-count"]}>{totalCount}</span>
          </div>

          {/* 버튼들 */}
          <div className={styles["buttons__wrapper"]}>
            {/* 초기화 버튼 */}
            {clearButton && totalCount > 0 && (
              <button
                className={styles.button}
                onClick={() => onClickSelectAll(false)}
              >
                초기화
              </button>
            )}

            {/* 전체 선택 버튼 */}
            {selectAllButton && (
              <button
                className={styles.button}
                onClick={() => onClickSelectAll(true)}
              >
                전체 선택
              </button>
            )}
          </div>
        </div>

        {/* 필터 내부 */}
        <div className={styles["content__area"]}>
          <div className={styles["filter__grid"]}>
            {filterGroups.map((filter, i) => {
              return (
                <FilterGroup
                  key={i}
                  filterGroup={filter}
                  // isChildSelectAll={Boolean(filterOptionsMap.get(filter.label)?.checked)}
                  isChildSelectAll={filter.children
                    .filter((child) => !child.disabled)
                    .every((child) => child.checked)}
                  totalCount={totalCount}
                  setTotalCount={setTotalCount}
                  setChildrenAllSelect={updateAllSelect}
                  updateFilterDatas={updateFilterDatas}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* 칩 */}
      {/* {showChips && <Chip chips={checkedOptions} onRemove={removeChip} />} */}
    </div>
  );
}
