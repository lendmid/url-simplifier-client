import { useMemo, useState } from "react";
import { IPagination } from "./types";

const usePagination = () => {
  const [pagination, setPagination] = useState<IPagination>({
    pageNumber: 0,
    pageSize: 5,
  });

  const [dataSize, setDataSize] = useState({ total: 0, portion: 0 });

  const firstRowNumber = useMemo(() => {
    const { pageNumber, pageSize } = pagination;
    if (dataSize.total === 0) return 0;
    return pageNumber * pageSize + 1;
  }, [dataSize.total, pagination]);

  const lastRowNumber = useMemo(() => {
    if (dataSize.total === 0) return 0;
    const calculatedLastRowNumber = firstRowNumber + pagination.pageSize - 1;
    return Math.min(calculatedLastRowNumber, dataSize.total);
  }, [dataSize.total, firstRowNumber, pagination.pageSize]);

  return {
    pagination,
    dataSize,
    setPagination,
    setDataSize,
    firstRowNumber,
    lastRowNumber,
  };
};

export default usePagination;
