import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";

function App() {
  const [Data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [FilterData, setFilterData] = useState();

  useEffect(() => {
    axios.get("http://localhost:8000/data").then((res) => {
      setData(res.data);
      setFilterData(res.data);
    });
  }, []);

  const filterDataByName = (searchTerm) => {
    const filteredData = Data.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterData(filteredData);
  };

  return (
    <>
      <Container>
        <Row>
          <input
            style={{ border: "1px solid black",borderRadius:'5px', width:'50rem', margin:'5rem', marginLeft:'35rem'}}
            name="firstName"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              filterDataByName(e.target.value);
            }}
          />
          <div className='grid grid-cols-1 lg:grid-cols-3 mx-auto place-items-center py-12  w-100 h-100'>
            {FilterData?.map((item, index) => (
              <div className="max-w-sm rounded overflow-hidden shadow-lg card mb-5" style={{boxShadow:'-2px 5px 5px 7px lightgrey'}} key={index}>
                <img
                  className="w-full"
                  src={item.image}
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{item.title}</div>
                  <p className="text-gray-700 text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Row>
      </Container>
    </>
  );
}

export default App;