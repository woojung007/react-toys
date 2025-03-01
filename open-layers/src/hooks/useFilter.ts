import { FilterProps } from "components/filter/Filter.type";
import { FilterGroup } from "components/filter/FilterGroup.type";
import { useEffect, useState } from "react";

export default function useFilter({
  filterGroups,
  setFilterGroups,
}: FilterProps) {
  const [isOpenDropdown, setOpenDropdown] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const [filterOptionsMap] = useState<Map<string, FilterGroup>>(new Map());

  const toggleDropdown = () => {
    setOpenDropdown(!isOpenDropdown);
  };

  const closeDropdown = () => {
    setOpenDropdown(false);
  };

  /**
   * 전체 선택으로 변경한다.
   * @param {string} filterKey 필터키
   * @param {boolean} isChecked 선택 여부
   */
  const updateAllSelect = (filterKey: string, isChecked: boolean) => {
    const findFilter = filterOptionsMap.get(filterKey);
    if (findFilter) {
      findFilter.checked = isChecked;
    }
  };

  /**
   * select all 버튼을 클릭한다.
   * @param {boolean} isCheck 선택 여부
   */
  const onClickSelectAll = (isCheck: boolean) => {
    const updatedFilterDatas = [...filterGroups];
    updatedFilterDatas.map((data) =>
      data.children.forEach(
        (e) => (e.checked = e.disabled ? e.checked : isCheck)
      )
    );
    setFilterGroups(updatedFilterDatas);

    for (const filterKey of Array.from(filterOptionsMap.keys())) {
      updateAllSelect(filterKey, isCheck);
    }
  };

  /**
   * 필터 데이터를 업데이트한다.
   * @param {string} title 라벨
   * @param options
   */
  const updateFilterDatas = (title: string, options: FilterGroup[]) => {
    const updatedFilterDatas = [...filterGroups];
    updatedFilterDatas.map((data) =>
      data.label === title ? (data.children = options) : data
    );
    setFilterGroups(updatedFilterDatas);
  };

  /**
   * 칩을 제거한다.
   * @param {string} title 라벨
   */
  const removeChip = (title: string) => {
    const updatedFilterOptions = [...filterGroups];
    updatedFilterOptions.forEach((section) => {
      section.children?.forEach((item) => {
        if (item.label === title) {
          item.checked = false;
        }
      });
    });
    setFilterGroups(updatedFilterOptions);
  };

  /**
   * @useEffect
   * filterOptionsMap 을 초기화한다.
   */
  useEffect(() => {
    if (filterOptionsMap.size === 0) {
      filterGroups.forEach((data) => filterOptionsMap.set(data.label, data));
    }
  }, [filterGroups]);

  /**
   * @useEffect
   * filterOptions 에 따라 total count 와 chip 을 업데이트한다.
   */
  useEffect(() => {
    if (!filterGroups) return;
    const checked = filterGroups.flatMap((section) =>
      section.children.filter((item) => item.checked)
    );
    setTotalCount(checked.length);
    setCheckedOptions(checked.map((item) => item.label));
  }, [filterGroups]);

  /**
   * @cleanup
   * filterOptionsMap 을 정리한다.
   */
  useEffect(() => {
    return () => {
      filterOptionsMap.clear();
    };
  }, []);

  return {
    isOpenDropdown,
    totalCount,
    checkedOptions,
    filterOptionsMap,
    onClickSelectAll,
    updateAllSelect,
    updateFilterDatas,
    setTotalCount,
    toggleDropdown,
    closeDropdown,
    removeChip,
  };
}
