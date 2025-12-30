import React, { useEffect, useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import hotelImageService from "../../services/hotelImageService";

function HotelImageManager({ hotelId }) {
  const [url, setUrl] = useState("");
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    try {
      const data = await hotelImageService.getByHotel(hotelId);
      setImages(data);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  useEffect(() => {
    loadImages();
  }, [hotelId]);

  const handleUpload = async () => {
    if (!url.trim()) return;

    const body = {
      hotelId,
      url,
      isPrimary: false,
      createdBy: "admin"
    };

    try {
      await hotelImageService.upload(body);
      setUrl("");
      loadImages();
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await hotelImageService.delete(id);
      loadImages();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <h5>Hotel Images</h5>

      <div className="d-flex gap-2 mb-3">
        <Form.Control
          placeholder="Image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={handleUpload}>Upload</Button>
      </div>

      <div className="d-flex flex-wrap gap-3">
        {images.map((img) => (
          <Card style={{ width: "160px" }} key={img.id}>
            <Card.Img
              variant="top"
              src={img.url}
              style={{ height: "100px", objectFit: "cover" }}
            />
            <Card.Body className="p-2 text-center">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(img.id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default HotelImageManager;
