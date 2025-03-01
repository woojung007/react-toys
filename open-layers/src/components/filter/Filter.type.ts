import { FilterGroup } from "components/filter/FilterGroup.type";

export type FilterProps = {
  filterGroups: FilterGroup[];
  setFilterGroups: (filterGroups: FilterGroup[]) => void;
  clearButton?: boolean;
  selectAllButton?: boolean;
  showChips?: boolean;
};
