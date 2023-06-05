import React from 'react';
import { useState,useEffect} from 'react';
import { Table } from 'antd';
import axios from 'axios';






function Soap() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        axios.get('http://localhost:3000/SOAPList'). 
        then(response => {
        console.log(response.data)
        setData(response.data)
      })
  
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  const columns = [

    {
      title: 'Codigo',
      dataIndex: 'countryCode',
      key: 'countryCode',
    },
    {
      title: 'Nombre',
      dataIndex: 'countryName',
      key: 'countryName',
    },
    
  ];



  return (
    <div>
      <Table dataSource={data} columns={columns} />;
    </div>
  );
}

export default Soap;