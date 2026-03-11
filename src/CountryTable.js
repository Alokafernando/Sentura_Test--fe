import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Button, Form } from "react-bootstrap";

const CountryTable = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("/api/countries") 
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (country) => {
    setSelected(country);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <Form.Control
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={handleSearch}
        className="mb-3"
      />

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Flag</th>
            <th>Name</th>
            <th>Capital</th>
            <th>Region</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((c) => (
            <tr
              key={c.name}
              onClick={() => openModal(c)}
              style={{ cursor: "pointer" }}
            >
              <td>
                <img src={c.flag} alt={c.name} width="50" />
              </td>
              <td>{c.name}</td>
              <td>{c.capital}</td>
              <td>{c.region}</td>
              <td>{c.population.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selected && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selected.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Capital:</strong> {selected.capital}
            </p>
            <p>
              <strong>Region:</strong> {selected.region}
            </p>
            <p>
              <strong>Population:</strong>{" "}
              {selected.population.toLocaleString()}
            </p>
            <img src={selected.flag} alt={selected.name} width="100%" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default CountryTable;