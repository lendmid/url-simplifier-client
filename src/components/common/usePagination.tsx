import { useMemo, useState } from "react";
import { IPagination } from "./types";

const usePagination = () => {
  const [pagination, setPagination] = useState<IPagination>({
    pageNumber: 0,
    pageSize: 5,
    total: 0,
  });

  const firstRowNumber = useMemo(() => {
    const { pageNumber, pageSize, total } = pagination;
    if (total === 0) return 0;
    return pageNumber * pageSize + 1;
  }, [pagination]);

  return { pagination, setPagination, firstRowNumber };
};

export default usePagination;
