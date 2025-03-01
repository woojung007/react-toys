import { FilterGroup } from "components/filter/FilterGroup.type";
import { useEffect, useState } from "react";

type Props = {
  filterGroup: FilterGroup;
  totalCount: number;
  setTotalCount: (count: number) => void;
  isChildSelectAll: boolean;
  setChildrenAllSelect: (label: string, select: boolean) => void;
  updateFilterDatas: (label: string, checkOptions: FilterGroup[]) => void;
};

export default function useFilterChild({
  filterGroup,
  totalCount = 0,
  setTotalCount,
  isChildSelectAll,
  setChildrenAllSelect,
  updateFilterDatas,
}: Props) {
  const [checkOptions, setCheckOptions] = useState<FilterGroup[]>(
    filterGroup.children
  );
  const [allChecked, setAllChecked] = useState(false);

  const updateTotalCount = (count: number) => {
    if (setTotalCount) {
      setTotalCount(count);
    }
  };

  const onClickAll = (isCheck: boolean) => {
    const count = checkOptions.filter(
      (i) => (isCheck ? !i.checked : i.checked) && !i.disabled
    ).length;
    checkOptions.forEach(
      (value) => value.disabled || (value.checked = isCheck)
    );
    if (updateFilterDatas) {
      updateFilterDatas(filterGroup.label, checkOptions);
    }
    updateTotalCount((totalCount += isCheck ? count : -count));
    setAllChecked(isCheck);
  };

  /**
   * 전체를 클릭한다.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const onChangeHead = (e: React.ChangeEvent<HTMLInputElement>) => {
    onClickAll(e?.target.checked);
    if (setChildrenAllSelect) {
      setChildrenAllSelect(filterGroup.label, e?.target.checked);
    }
  };

  /**
   * 자식을 클릭한다.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const onChangeChild = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedList = checkOptions.map((opt) =>
      opt.label === e.target.value
        ? { ...opt, checked: e?.target.checked }
        : opt
    );
    setCheckOptions(updatedList);
    updateTotalCount((totalCount += e?.target.checked ? 1 : totalCount - 1));
    if (updateFilterDatas) {
      updateFilterDatas(filterGroup.label, updatedList);
    }
    setAllChecked(
      updatedList.filter((i) => i.checked).length ===
        updatedList.filter((i) => !i.disabled).length
    );
  };

  useEffect(() => {
    setCheckOptions(filterGroup.children);
  }, [filterGroup.children]);

  useEffect(() => {
    setAllChecked(isChildSelectAll);
  }, [isChildSelectAll]);

  return {
    checkOptions,
    allChecked,
    onChangeHead,
    onChangeChild,
  };
}
