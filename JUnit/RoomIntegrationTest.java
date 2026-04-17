package com.booking.Booking.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@DisplayName("Kiểm thử Hộp xám Toàn diện - Chức năng Room")
class RoomIntegrationTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;

    @Test
    @DisplayName("TC-BE-01: Thêm phòng hợp lệ -> Mong đợi 201 Created -> PASS XANH")
    void testCreateRoomSuccess() throws Exception {
        Map<String, Object> room = Map.of("roomNumber", "P-101", "price", 1000000, "type", "Single");

        mockMvc.perform(post("/api/admin/rooms") // <-- Kiểm tra đúng URL Controller
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(room)))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    @DisplayName("TC-BE-02: Nhập giá âm (-500) -> Mong đợi 400 Bad Request (Hệ thống chặn) -> PASS XANH")
    void testCreateRoomFailPrice() throws Exception {
        Map<String, Object> room = Map.of("roomNumber", "P-ERR", "price", -500);

        mockMvc.perform(post("/api/admin/rooms")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(room)))
                .andExpect(status().isBadRequest()); // Hệ thống chặn đúng logic thiết kế
    }

    @Test
    @DisplayName("TC-BE-03: Cập nhật giá phòng -> Mong đợi 200 OK -> PASS XANH")
    void testUpdateRoomSuccess() throws Exception {
        Map<String, Object> update = Map.of("price", 1200000);

        mockMvc.perform(put("/api/admin/rooms/1") // Thay ID 1 bằng ID thật trong DB
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(update)))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("TC-BE-04: Xóa phòng không tồn tại -> Mong đợi 404 Not Found -> PASS XANH")
    void testDeleteNotFound() throws Exception {
        mockMvc.perform(delete("/api/admin/rooms/999999"))
                .andExpect(status().isNotFound()); // Chặn đúng ID ảo
    }
}