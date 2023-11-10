import { useMemo } from "react";
import { Pagination } from "react-bootstrap";

function ProductPagination({ activePage, setActivePage, list }) {
  const items = useMemo(() => {
    const items = [];
    const inital = activePage > 2 ? activePage - 2 : activePage;
    let total = activePage < 3 ? activePage + 3 : activePage + 2;
    for (let x = inital; x <= total; x++) {
      items.push(
        <Pagination.Item
          key={`pagination-${x}`}
          active={x === activePage}
          onClick={() => setActivePage(x)}
        >
          {x}
        </Pagination.Item>
      );
    }
    return items;
  }, [activePage, setActivePage]);

  return (
    <Pagination>
      <Pagination.First onClick={() => setActivePage(1)} />
      <Pagination.Prev
        disabled={activePage === 1}
        onClick={() => setActivePage(activePage - 1)}
      />
      {items}
      <Pagination.Next onClick={() => setActivePage(activePage + 1)} />
      <Pagination.Last
        disabled={activePage === list.length - 1}
        onClick={() => setActivePage(list.length - 1)}
      />
    </Pagination>
  );
}

export default ProductPagination;
