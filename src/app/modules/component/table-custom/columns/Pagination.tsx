import Pagination from "react-bootstrap/Pagination";
function PaginationCustom() {
  return (
    <div className="pagination p-0">
      <span className="pagination-info">Pages : 52</span>
      <Pagination size="sm">
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item>{14}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
      </Pagination>
      <div className="pagination-goto">
        <label>Go to</label>
        <input type="text" placeholder="0" />
      </div>
    </div>
  );
}

export default PaginationCustom;
