// src/components/FilterSidebar/FilterSidebar.jsx
import React, { useState } from "react";

function FilterSidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    roomType: "",
    maxPrice: "",
    guests: "",
    amenities: [],
  });

  const roomTypes = ["Phòng đơn", "Phòng đôi", "Phòng gia đình"];
  const amenitiesList = ["Wifi", "Hồ bơi", "Điều hòa", "Bãi đỗ xe"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      let newAmenities = [...filters.amenities];
      if (checked) newAmenities.push(value);
      else newAmenities = newAmenities.filter((a) => a !== value);
      setFilters({ ...filters, amenities: newAmenities });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleApply = () => {
    onFilterChange(filters);
  };

  return (
    <div className="p-3 border rounded shadow bg-light" style={{ width: "250px" }}>
      <h5 className="mb-3">Bộ lọc tìm kiếm</h5>

      {/* Loại phòng */}
      <div className="mb-3">
        <label className="form-label">Loại phòng</label>
        <select
          name="roomType"
          className="form-select"
          value={filters.roomType}
          onChange={handleChange}
        >
          <option value="">Tất cả</option>
          {roomTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Giá tối đa */}
      <div className="mb-3">
        <label className="form-label">Giá tối đa (VNĐ)</label>
        <input
          type="number"
          name="maxPrice"
          className="form-control"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Ví dụ: 1000000"
        />
      </div>

      {/* Số lượng khách */}
      <div className="mb-3">
        <label className="form-label">Số lượng khách</label>
        <input
          type="number"
          name="guests"
          className="form-control"
          value={filters.guests}
          onChange={handleChange}
          placeholder="1"
        />
      </div>

      {/* Tiện ích */}
      <div className="mb-3">
        <label className="form-label">Tiện ích</label>
        {amenitiesList.map((amenity) => (
          <div key={amenity} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="amenities"
              value={amenity}
              checked={filters.amenities.includes(amenity)}
              onChange={handleChange}
              id={amenity}
            />
            <label className="form-check-label" htmlFor={amenity}>
              {amenity}
            </label>
          </div>
        ))}
      </div>

      <button className="btn btn-primary w-100" onClick={handleApply}>
        Áp dụng
      </button>
    </div>
  );
}

export default FilterSidebar;
