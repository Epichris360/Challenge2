import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import chunk from 'lodash.chunk';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Components/Nav';
import Card from './Components/Card';
import Modal from './Components/Modal';
import ProductPagination from './Components/Pagination';
import LoadingIndicator from './Components/LoadingIndicator';


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

  useEffect(() => {
    if (list.length) return;
    getInitData()
  }, [])

  const selectProduct = (l) => {
    setSelectedItem(l)
    setShowModal(true)
  }

  if (!list.length)
    return <LoadingIndicator />

  return (
    <div >
      <NavBar />
      <Container>
        <Row>
          {
            list[activePage]?.map((l, i) => (
              <Col key={`card-${i}`} xs={12} sm={6} md={4}>
                <Card {...l} onClick={() => selectProduct(l)} />
              </Col>
            ))
          }
        </Row>
        <Row>
          <Col>
            <ProductPagination
              activePage={activePage}
              setActivePage={setActivePage}
              list={list}
            />
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
