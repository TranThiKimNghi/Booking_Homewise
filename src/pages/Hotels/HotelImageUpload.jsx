import { useState } from "react";
import hotelImageService from "../../services/hotelImageService";

const HotelImageUpload = ({ hotelId, onUploaded }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Vui lòng chọn ảnh");

    const formData = new FormData();
    formData.append("file", file);     // phải trùng backend
    formData.append("hotelId", hotelId);

    try {
      setLoading(true);
      await hotelImageService.upload(formData);
      alert("Upload thành công");
      onUploaded?.();
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded p-3">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Đang upload..." : "Upload ảnh"}
      </button>
    </div>
  );
};

export default HotelImageUpload;
