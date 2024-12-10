import axios from "axios";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { API_URL } from "../utils/constants";

export default class Success extends Component {

    componentDidMount() {
        axios
        .get(API_URL + "orderlist")
        .then((res) => {
            console.log(res);
            const orderlist = res.data;
            orderlist.map(function (item) {
                return axios
                .delete(API_URL + "orderlist/" + item.id)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

  render() {
    return (
      <div>
          <div className="mt-5 text-center">
            <img
              src="assets/images/success.svg"
              alt="Success"
              className="mb-3 align-self-center"
              width="200px"
            />
            <h2>Thank You for Your Order!</h2>
            <p>Your order has been successfully placed.</p>
            <Button variant="primary" className="mt-3" href="/">
              Back to Home
            </Button>
          </div>
      </div>
    );
  }
}
