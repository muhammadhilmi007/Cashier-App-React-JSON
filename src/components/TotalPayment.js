import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { faCashRegister } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const TotalPayment = ({ orderlist }) => {
  const navigate = useNavigate();

  const submitTotalBayar = async (totalPayment) => {
    const order = {
      total_bayar: totalPayment,
      menus: orderlist,
    };

    try {
      const response = await axios.post(API_URL + "orders", order);
      console.log("Response: ", response);
      navigate("/success");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const totalPayment = orderlist.reduce(
    (result, item) => result + item.total_harga,
    0
  );

  return (
    <>
    {/* Web */}
     <div className="fixed-bottom d-none d-md-block">
      <Row>
        <Col md={{ span: 3, offset: 9 }} className="px-4">
          <h4>
            Total Harga:{" "}
            <strong className="float-right mr-2">
              Rp. {numberWithCommas(totalPayment)}
            </strong>
          </h4>
          <hr />
          <Button
            variant="primary"
            block
            className="mb-2 mt-2 mr-2"
            size="lg"
            onClick={() => submitTotalBayar(totalPayment)}
          >
            <FontAwesomeIcon icon={faCashRegister} /> <strong>Bayar</strong>
          </Button>
        </Col>
      </Row>
    </div>

    {/* Mobile */}
    <div className="d-block d-md-none mt-3">
      <Row>
        <Col md={{ span: 3, offset: 9 }} className="px-4">
          <h4>
            Total Harga:{" "}
            <strong className="float-right mr-2">
              Rp. {numberWithCommas(totalPayment)}
            </strong>
          </h4>
          <hr />
          <Button
            variant="primary"
            block
            className="mb-2 mt-2 mr-2"
            size="lg"
            onClick={() => submitTotalBayar(totalPayment)}
          >
            <FontAwesomeIcon icon={faCashRegister} /> <strong>Bayar</strong>
          </Button>
        </Col>
      </Row>
    </div>
    </>
   
  );
};

export default TotalPayment;
