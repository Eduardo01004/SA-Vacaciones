import React from 'react';
import { useState,useEffect} from 'react';
import { Card,Button,Row, Col,Badge,Modal,List, Checkbox,message,Form, Input,InputNumber} from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import axios from "axios";


function PaginationButtons({ currentPage, totalPages, handlePrevious, handleNext }) {
  return (
    <Row justify="center" style={{ marginTop: '16px' }}>
      <Col>
        <Button type="primary" onClick={handlePrevious} disabled={currentPage === 1}>
          Atrás
        </Button>
      </Col>
      <Col>
        <span style={{ margin: '0 8px' }}>Página {currentPage} de {totalPages}</span>
      </Col>
      <Col>
        <Button type="primary" onClick={handleNext} disabled={currentPage === totalPages}>
          Adelante
        </Button>
      </Col>
    </Row>
  );
}



function Pokemons() {
  const { Meta } = Card;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [off, setoff] = useState(0);
  const totalPages = 10;

  const handlePrevious = () => {
    setCurrentPage(prevPage => prevPage - 1);
    setlimit( limit - 10);
    setoff(off - 10)
    console.log(limit)
    try {
      axios.post('http://localhost:3000/APIREST',
      {
      "limit":limit,
      "offset":off
    }). then(response => {
      //console.log(response.data)
      setData(response.data)
    })

    } catch (error) {
      console.error(error);
    }
    
  };

  const handleNext = () => {
    setCurrentPage(prevPage => prevPage + 1);
    setlimit( limit + 10);
    console.log(limit)
    setoff(off + 10)
    try {
      axios.post('http://localhost:3000/APIREST',
      {
      "limit":limit,
      "offset":off
    }). then(response => {
      //console.log(response.data)
      setData(response.data)
    
    })

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    async function getData() {
      try {
        axios.post('http://localhost:3000/APIREST',
        {
        "limit":limit,
        "offset":off
      }). then(response => {
        //console.log(response.data)
        setData(response.data)
      })

      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);



  



  return (
    <div className="site-layout-content" style={{ background: colorBgContainer }}>
      <Row gutter={[5,5]}> 
        {
          data.map((item) => (
            <Col key={item.name} span={8}> 
              <Card   
                  
                  style={{ width: 300 }}
                  cover={
                  <img
                      alt="example"
                      src={item.imagenUrl}
                  />
                  }
              >
              <Meta 
                title={item.nombre}
                description="Pokemon"
              />
            </Card>
          </Col>
          ))      
      }

    </Row>
    <PaginationButtons
      currentPage={currentPage}
      totalPages={totalPages}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
    />
    </div>
    
  )
}

export default Pokemons;
