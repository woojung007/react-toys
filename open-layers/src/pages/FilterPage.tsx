import Filter from "components/filter/Filter";
import { FilterGroup } from "components/filter/FilterGroup.type";
import { useState } from "react";

export default function FilterPage() {
  const FILTERS = [
    {
      id: "1",
      label: "Detection Result",
      checked: true,
      children: [
        {
          id: "1-1",
          label: "빌딩",
          checked: true,
          children: [],
        },
      ],
    },
    {
      id: "2",
      label: "지리 데이터",
      checked: true,
      children: [
        {
          id: "2-1",
          label: "개발제한구역",
          checked: true,
          children: [],
        },
        {
          id: "2-2",
          label: "국유지",
          checked: true,
          children: [],
        },
        {
          id: "2-3",
          label: "연속지적도",
          checked: false,
          children: [],
        },
      ],
    },
  ];
  const [filters, setFilters] = useState<FilterGroup[]>(FILTERS);
  return (
    <div>
      <Filter filterGroups={filters} setFilterGroups={setFilters} />
    </div>
  );
}
