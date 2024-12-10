import React, { Component } from "react";
import { ListCategories, Hasil, Menus } from "../components";
import { Col, Container, Row } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriesChoice: "Makanan",
      orderlist: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.name=" + this.state.categoriesChoice)
      .then((response) => {
        console.log("Response: ", response);
        const menus = response.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

    this.getListOrder();
  }

//   componentDidUpdate(prevState) {
//     if (this.state.orderlist !== prevState.orderlist) {
//       axios
//         .get(API_URL + "orderlist")
//         .then((response) => {
//             console.log("Cek");
            
//           const orderlist = response.data;
//           this.setState({ orderlist });
//         })
//         .catch((error) => {
//           console.log("Error: ", error);
//         });
//     }
//   }

  getListOrder = () => {
    axios
      .get(API_URL + "orderlist")
      .then((response) => {
        console.log("Response: ", response);
        const orderlist = response.data;
        this.setState({ orderlist });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  changeCategory = (value) => {
    this.setState({
      categoriesChoice: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.name=" + value)
      .then((response) => {
        console.log("Response: ", response);
        const menus = response.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  inOrder = (value) => {
    axios
      .get(API_URL + "orderlist?product.id=" + value.id)
      .then((response) => {
        if (response.data.length === 0) {
          const orders = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "orderlist", orders)
            .then((response) => {
              this.getListOrder();
              Swal.fire({
                title: "Success in Order",
                text:
                  "Your order has been successfully added! " +
                  orders.product.nama +
                  " to your cart. ",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error: ", error);
            });
        } else {
          const orders = {
            jumlah: response.data[0].jumlah + 1,
            total_harga: response.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "orderlist/" + response.data[0].id, orders)
            .then((response) => {
              this.getListOrder();
              Swal.fire({
                title: "Success in Order",
                text:
                  "Your order has been successfully added! " +
                  orders.product.nama +
                  " to your cart. ",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error: ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  render() {
    const { menus, categoriesChoice, orderlist } = this.state;
    return (
      <div>
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              categoriesChoice={categoriesChoice}
            />
            <Col className="mt-3">
              <h4>
                <strong>List Product</strong>
              </h4>
              <hr />
              <Row className="overflow-auto menu">
                {menus &&
                  menus.map((menu) => (
                    <Menus key={menu.id} menu={menu} inOrder={this.inOrder} />
                  ))}
              </Row>
            </Col>
            <Hasil orderlist={orderlist} {...this.props} getListOrder={this.getListOrder} />
          </Row>
        </Container>
      </div>
    );
  }
}
