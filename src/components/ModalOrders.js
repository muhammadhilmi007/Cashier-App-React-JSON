import React from "react";
import { Button, Modal } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const ModalOrders = ({
  showModal,
  handleClose,
  orderDetails,
  jumlah,
  tambah,
  kurang,
  changeHandler,
  handleSubmit,
  totalHarga,
  keterangan,
  deleteOrder,
}) => {
  if (orderDetails) {
    return (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {orderDetails.product.nama}{" "}
              <strong>
                (Rp. {numberWithCommas(orderDetails.product.harga)})
              </strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formLabelHarga">
                <Form.Label>Total Harga :</Form.Label>
                <p>
                  <strong>
                    Rp. {numberWithCommas(totalHarga)}
                  </strong>
                </p>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLabelJumlah">
                <Form.Label>Jumlah : </Form.Label>
                <br />
                <Button
                  variant="primary"
                  size="sm"
                  className="mr-2"
                  onClick={() => kurang()}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <strong> {jumlah} </strong>
                <Button
                  variant="primary"
                  size="sm"
                  className="ml-2"
                  onClick={() => tambah()}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLabelKeterangan">
                <Form.Label>Keterangan</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="keterangan"
                  placeholder="Contoh: Pedas, Nasi Setengah"
                  value={keterangan || ''}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Simpan
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => deleteOrder(orderDetails.id)} >
              <FontAwesomeIcon icon={faTrash} className="mr-2" /> Hapus
            </Button>
          </Modal.Footer>
        </Modal>
    );
  } else {
    return (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Kosong</Modal.Title>
          </Modal.Header>
          <Modal.Body>Kosong</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
};

export default ModalOrders;
