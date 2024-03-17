import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { toast } from "react-toastify";
import { useIntl } from 'react-intl';
import { rowPerPage } from "../../constant";


type IProps = {
  totalPage: number;
  pageIndex: number;
  pageSize?:number;
  changePage: (value: number) => void;
  changePerPage?: (value: number) => void;
};

function PaginationCustom({ totalPage, pageIndex, changePage, changePerPage, pageSize }: IProps) {
  const [page, setPage] = useState<number>(1);
  const intl = useIntl();
  useEffect(() => {
    if (pageIndex >= 1) {
      setPage(pageIndex);
    }
  }, [pageIndex]);

  const _onChangePage = (value: number) => () => {
    setPage(value);
    if (changePage) {
      changePage(value);
    }
  };


  return (
    <div className="pagination d-flex justify-content-between pagination-container">
      <div className="pagination-goto">
        <label>Số hàng</label>
        <select
          value={pageSize}
          onChange={(e) => {
            changePerPage && changePerPage(+e.target.value);
          }}
        >
          {rowPerPage.map((row) => (
            <option value={row}>{row}</option>
          ))}
        </select>
      </div>
      <div className="pagination">
        <Pagination size="sm">
          <div className="pagination-action" aria-label="Previous" onClick={_onChangePage(1)}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </div>
          <Pagination.Prev
            className="pagination-action"
            disabled={page === 1}
            onClick={_onChangePage(Number(page - 1))}
          />
          {page > 1 && <Pagination.Item onClick={_onChangePage(1)}>{1}</Pagination.Item>}

          {page >= 4 && <Pagination.Ellipsis />}

          {page > 2 && (
            <Pagination.Item className="pagination-page" onClick={_onChangePage(page - 1)}>
              {page - 1}
            </Pagination.Item>
          )}

          <Pagination.Item className="pagination-page pagination-active">
            {page}
          </Pagination.Item>

          {page + 1 < totalPage && (
            <Pagination.Item className="pagination-page" onClick={_onChangePage(page + 1)}>
              {page + 1}
            </Pagination.Item>
          )}

          {page + 2 < totalPage && <Pagination.Ellipsis />}
          {page < totalPage && (
            <Pagination.Item className="pagination-page" onClick={_onChangePage(totalPage)}>
              {totalPage}
            </Pagination.Item>
          )}
          <Pagination.Next
            className="pagination-action"
            disabled={page === totalPage}
            onClick={_onChangePage(Number(page + 1))}
          />

          <div className="pagination-action" aria-label="Next" onClick={_onChangePage(totalPage)}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </div>
        </Pagination>
      </div>
    </div>
  );
}

export default PaginationCustom;
