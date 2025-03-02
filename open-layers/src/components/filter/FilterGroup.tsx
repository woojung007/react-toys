/* eslint-disable @typescript-eslint/no-unused-vars */
import useFilterChild from "hooks/useFilterChild";
import styles from "./FilterGroup.module.scss";
import { FilterGroupProps } from "components/filter/FilterGroup.type";

export default function FilterGroup({
  filterGroup,
  totalCount = 0,
  setTotalCount,
  isChildSelectAll,
  setChildrenAllSelect,
  updateFilterDatas,
}: FilterGroupProps) {
  const { checkOptions, onChangeChild } = useFilterChild({
    filterGroup,
    totalCount,
    setTotalCount,
    isChildSelectAll,
    setChildrenAllSelect,
    updateFilterDatas,
  });

  return (
    <div className={styles["filter-row__container"]}>
      {/* 전체(제목) */}
      {/* <Checkbox
                disabled={filterOptions.disabled}
                id={filter${filterOptions.label}}
                label={filterOptions.label}
                onChange={onChangeHead}
                checked={allChecked || false}
            /> */}

      <div>{filterGroup.label}</div>

      {/* 자식 */}
      <div className={styles["filter-row-values__wrap"]}>
        {checkOptions.map((value, i) => {
          return (
            // <Checkbox
            //     key={i}
            //     label={value.label}
            //     height={36}
            //     id={value.label}
            //     checked={value.checked || false}
            //     onChange={onChangeChild}
            //     disabled={filterOptions.disabled || value.disabled}
            // />

            <div key={value.id}>{value.label}</div>
          );
        })}
      </div>
    </div>
  );
}
