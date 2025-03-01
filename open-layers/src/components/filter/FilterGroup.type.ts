/* eslint-disable @typescript-eslint/no-explicit-any */
export type FilterGroup = {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  data?: any;
  children: FilterGroup[];
};

export type FilterGroupProps = {
  filterGroup: FilterGroup;
  totalCount: number;
  setTotalCount: (count: number) => void;
  isChildSelectAll: boolean;
  setChildrenAllSelect: (label: string, select: boolean) => void;
  updateFilterDatas: (title: string, options: FilterGroup[]) => void;
};
