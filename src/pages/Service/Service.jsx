import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import serviceService from "../../../services/serviceService";
import ServiceForm from "./ServiceForm";

function Services() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const loadServices = async () => {
    try {
      const data = await serviceService.getAll();
      setServices(data || []);
    } catch (err) {
      console.error("Load services failed:", err);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleAdd = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) {
      await serviceService.delete(id);
      loadServices();
    }
  };

  const handleCreate = async (payload) => {
    await serviceService.create(payload);
    loadServices();
    setShowModal(false);
  };

  const handleUpdate = async (id, payload) => {
    await serviceService.update(id, payload);
    loadServices();
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">Quản lý dịch vụ</h2>
      <Button className="mb-3" onClick={handleAdd}>
        Thêm dịch vụ
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Thời lượng (phút)</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.description}</td>
              <td>{s.price}</td>
              <td>{s.duration}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(s)}>Sửa</Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(s.id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <ServiceForm
            initialData={editingService}
            onCancel={() => setShowModal(false)}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Services;
