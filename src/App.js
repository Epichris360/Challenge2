import { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import chunk from 'lodash.chunk';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Components/Nav';
import Card from './Components/Card';
import Modal from './Components/Modal';


function App() {
  const [list, setList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [selectedItem, setSelectedItem] = useState({})
  const [showModal, setShowModal] = useState(false);

  const getInitData = async () => {
    try {
      const res = await fetch('https://cx-interview-api.dev.ecmapps.com/products?page=large-page')
      const data = await res.json()
      const arr = chunk(data.products, 9)
      setList(arr)
    } catch (e) {
      window.alert(e.message)
    }
  }

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
        </Pagination.Item>,
      )
    }
    return items;
  }, [activePage, list])

  useEffect(() => {
    if (list.length) return;
    getInitData()
  }, [])

  const selectProduct = (l) => {
    setSelectedItem(l)
    setShowModal(true)
  }

  if (!list.length) return null
  return (
    < div >
      <NavBar />
      <Container>
        <Row>
          {
            list[activePage]?.map((l, i) => (
              <Col key={`card-${i}`} xs={1} sm={1} md={4}>
                <Card {...l} onClick={() => selectProduct(l)} />
              </Col>
            ))
          }
        </Row>
        <Row>
          <Col>
            <Pagination>
              <Pagination.First onClick={() => setActivePage(1)} />
              <Pagination.Prev disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)} />
              {items}
              <Pagination.Next onClick={() => setActivePage(activePage + 1)} />
              <Pagination.Last disabled={activePage === list.length - 1} onClick={() => setActivePage(list.length - 1)} />
            </Pagination>
          </Col>
        </Row>
      </Container>
      <Modal
        {...selectedItem}
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </div >
  );
}

export default App;
