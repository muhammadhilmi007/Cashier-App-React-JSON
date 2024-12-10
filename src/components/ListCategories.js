import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="mr-2" />;
  if (nama === "Snack") return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((response) => {
        const categories = response.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    const { categoriesChoice, changeCategory } = this.props;

    return (
      <Col md={2} className="mt-3">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories && categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              onClick={() => changeCategory(category.name)}
              style={{ cursor: "pointer" }}
              className={
                categoriesChoice === category.name ? "active" : "inactive"
              }
            >
              <Icon nama={category.name} /> {category.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    );
  }
}
