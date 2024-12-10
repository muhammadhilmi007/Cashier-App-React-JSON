import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, inOrder }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow border-0" onClick={() => inOrder(menu)}>
        <Card.Img
          variant="top"
          src={
            "assets/images/" +
            menu.category.name.toLowerCase() +
            "/" +
            menu.gambar
          }
          style={{ height: "200px", width: "100%", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>
            {menu.nama}(<strong>{menu.kode}</strong>)
          </Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
