import React, { useEffect, useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import roomImageService from "../../services/roomImageService";

function RoomImageManager({ roomId }) {
  const [url, setUrl] = useState("");
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    try {
      const data = await roomImageService.getByRoom(roomId);
      setImages(data);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  useEffect(() => {
    loadImages();
  }, [roomId]);

  const handleUpload = async () => {
    if (!url.trim()) return;

    const body = {
      roomId,
      url,
      isPrimary: false,
      createdBy: "admin"
    };

    try {
      await roomImageService.upload(body);
      setUrl("");
      loadImages();
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await roomImageService.delete(id);
      loadImages();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <h5>Room Images</h5>

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

export default RoomImageManager;
