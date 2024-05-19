import { TablePaginationConfig } from "antd";
import { useState } from "react";

const usePagination = () => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
    showSizeChanger: true,
    defaultPageSize: 5,
    pageSizeOptions: ["5", "10", "25"],
    position: ["bottomCenter"],
  });
  
  return { pagination, setPagination };
};

export default usePagination;
