package com.booking.User.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@Transactional
@DisplayName("Đối soát Hộp xám: User-Service")
class UserIntegrationTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;

    // THAY ĐỔI QUAN TRỌNG: Đổi /api/admin/users thành /api/users để hết lỗi 405
    private final String BASE_URL = "/api/users";

    @Test
    @DisplayName("TC01: Thêm mới Customer thành công")
    void testTC01_CreateCustomerSuccess() throws Exception {
        Map<String, String> user = Map.of(
                "fullName", "Vo Trung Kien Customer",
                "email", "customer_" + System.currentTimeMillis() + "@gmail.com",
                "phone", "0912345678",
                "role", "customer"
        );
        mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isCreated()) // Mong đợi 201 -> Sẽ HIỆN XANH
                .andDo(print());
    }

    @Test
    @DisplayName("TC02: Thêm Admin thành công")
    void testTC02_CreateAdminSuccess() throws Exception {
        Map<String, String> user = Map.of("email", "admin_" + System.currentTimeMillis() + "@gmail.com", "role", "admin");
        mockMvc.perform(post(BASE_URL).contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("TC03: Lỗi trùng Email")
    void testTC03_DuplicateEmail() throws Exception {
        Map<String, String> user = Map.of("email", "kien1310@gmail.com");
        mockMvc.perform(post(BASE_URL).contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isConflict()); // Chặn đúng -> HIỆN XANH
    }

    @Test
    @DisplayName("TC05: Sai định dạng Email")
    void testTC05_InvalidEmailFormat() throws Exception {
        Map<String, String> user = Map.of("email", "kien-sai-format");
        mockMvc.perform(post(BASE_URL).contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isBadRequest()); // Chặn đúng -> HIỆN XANH
    }

    @Test
    @DisplayName("TC06: Unauthorized -> 403")
    void testTC06_Unauthorized() throws Exception {
        mockMvc.perform(post(BASE_URL).header("Authorization", "InvalidToken"))
                .andExpect(status().isForbidden()); // Chặn đúng -> HIỆN XANH
    }
}