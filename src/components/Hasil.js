import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalPayment from "./TotalPayment";
import ModalOrders from "./ModalOrders";
import axios from "axios";
import { API_URL } from "../utils/constants";
import Swal from "sweetalert2";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      orderDetails: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (order) => {
    this.setState({
      showModal: true,
      orderDetails: order,
      jumlah: order.jumlah,
      keterangan: order.keterangan,
      totalHarga: order.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.orderDetails.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.orderDetails.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.orderDetails.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "orderlist/" + this.state.orderDetails.id, data)
      .then((response) => {
        this.props.getListOrder();
        Swal.fire({
          title: "Update Pesanan!",
          text: "Success Update Data! " + data.product.nama + " to your cart. ",
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  deleteOrder = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "orderlist/" + id)
      .then((response) => {
        this.props.getListOrder();
        Swal.fire({
          title: "Hapus Pesanan!",
          text:
            "Success Delete order! " +
            this.state.orderDetails.product.nama +
            " to your cart. ",
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  render() {
    const { orderlist } = this.props;
    return (
      <Col md={3} className="mt-3">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {orderlist.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {orderlist.map((order) => (
                <ListGroup.Item
                  key={order.id}
                  onClick={() => this.handleShow(order)}
                >
                  <Row>
                    <Col xs={2}>
                      <Badge pill variant="success">
                        {order.jumlah}
                      </Badge>
                    </Col>
                    <Col>
                      <h5>{order.product.nama}</h5>
                      <p>Rp. {numberWithCommas(order.product.harga)}</p>
                      <p>{order.keterangan}</p>
                    </Col>
                    <Col>
                      <strong className="float-right">
                        Rp. {numberWithCommas(order.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ModalOrders
                handleClose={this.handleClose}
                {...this.state}
                tambah={this.tambah}
                kurang={this.kurang}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
                deleteOrder={this.deleteOrder}
              />
            </ListGroup>
          </Card>
        )}
        <TotalPayment orderlist={orderlist} {...this.props} />
      </Col>
    );
  }
}
