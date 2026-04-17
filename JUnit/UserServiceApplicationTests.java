package com.booking.User.Service;

import com.booking.User.adapters.dto.AuthResponse;
import com.booking.User.adapters.dto.LoginRequest;
import com.booking.User.adapters.dto.RegisterRequest;
import com.booking.User.adapters.dto.UserDTO;
import com.booking.User.application.service.AuthService;
import com.booking.User.application.service.JwtService;
import com.booking.User.application.service.UserService;
import com.booking.User.infrastructure.persistence.entity.UserEntity;
import com.booking.User.infrastructure.persistence.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceApplicationTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    private AuthService authService;
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        authService = new AuthService(userRepository, passwordEncoder, jwtService);
        userService = new UserService(userRepository, passwordEncoder);
    }

    @Test
    void login_EmailNull() {
        LoginRequest request = new LoginRequest();
        request.setEmail(null);
        request.setPassword("password123");

        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.login(request));
        assertEquals("Email hoặc mật khẩu không đúng", exception.getMessage());
    }

    @Test
    void login_EmailEmpty() {
        LoginRequest request = new LoginRequest();
        request.setEmail("");
        request.setPassword("password123");

        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.login(request));
        assertEquals("Email hoặc mật khẩu không đúng", exception.getMessage());
    }

    @Test
    void login_WrongPassword() {
        LoginRequest request = new LoginRequest();
        request.setEmail("user@example.com");
        request.setPassword("wrongpassword");

        UserEntity existingUser = new UserEntity();
        existingUser.setId(UUID.randomUUID());
        existingUser.setEmail("user@example.com");
        existingUser.setPassword("encoded-password");
        existingUser.setRoles("customer");

        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(existingUser));
        when(passwordEncoder.matches("wrongpassword", "encoded-password")).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.login(request));
        assertEquals("Email hoặc mật khẩu không đúng", exception.getMessage());
    }

    @Test
    void login_Success() {
        LoginRequest request = new LoginRequest();
        request.setEmail("user@example.com");
        request.setPassword("password123");

        UserEntity existingUser = new UserEntity();
        existingUser.setId(UUID.randomUUID());
        existingUser.setEmail("user@example.com");
        existingUser.setPassword("encoded-password");
        existingUser.setRoles("customer");

        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(existingUser));
        when(passwordEncoder.matches("password123", "encoded-password")).thenReturn(true);
        when(jwtService.generate(anyString(), anyString(), anyString())).thenReturn("valid-token");

        AuthResponse response = authService.login(request);

        assertEquals("valid-token", response.getToken());
        assertEquals("customer", response.getRoles());
    }

    @Test
    void login_DBError() {
        LoginRequest request = new LoginRequest();
        request.setEmail("user@example.com");
        request.setPassword("password123");

        when(userRepository.findByEmail("user@example.com")).thenThrow(new RuntimeException("repo error"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.login(request));
        assertEquals("repo error", exception.getMessage());
    }

    @Test
    void register_EmailNull() {
        RegisterRequest request = new RegisterRequest();
        request.setFullname("Nguyen Van A");
        request.setEmail(null);
        request.setPhone("0123456789");
        request.setPassword("123456");

        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.register(request));
        assertEquals("Email không được để trống", exception.getMessage());
    }

    @Test
    void register_EmailExists() {
        RegisterRequest request = new RegisterRequest();
        request.setFullname("Nguyen Van A");
        request.setEmail("user@example.com");
        request.setPhone("0123456789");
        request.setPassword("123456");

        UserEntity existingUser = new UserEntity();
        existingUser.setEmail("user@example.com");
        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(existingUser));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.register(request));
        assertEquals("Email đã tồn tại", exception.getMessage());
    }

    @Test
    void register_PasswordShort() {
        RegisterRequest request = new RegisterRequest();
        request.setFullname("Nguyen Van A");
        request.setEmail("user@example.com");
        request.setPhone("0123456789");
        request.setPassword("123");

        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.register(request));
        assertEquals("Mật khẩu phải có ít nhất 6 ký tự", exception.getMessage());
    }

    @Test
    void register_Success() {
        RegisterRequest request = new RegisterRequest();
        request.setFullname("Nguyen Van A");
        request.setEmail("user@example.com");
        request.setPhone("0123456789");
        request.setPassword("123456");

        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("123456")).thenReturn("encoded-password");
        when(userRepository.save(any(UserEntity.class))).thenAnswer(invocation -> {
            UserEntity entity = invocation.getArgument(0);
            entity.setId(UUID.randomUUID());
            return entity;
        });
        when(jwtService.generate(anyString(), anyString(), anyString())).thenReturn("dummy-token");

        AuthResponse response = authService.register(request);

        assertEquals("dummy-token", response.getToken());
        assertEquals("customer", response.getRoles());
    }

    @Test
    void update_UserNotFound() {
        UUID userId = UUID.randomUUID();
        UserDTO updateDto = new UserDTO();
        updateDto.setFullname("Nguyen Van C");
        updateDto.setPhone("0987654321");

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> userService.updateUser(userId, updateDto));
        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void update_EmailNull() {
        UserDTO updateDto = new UserDTO();
        updateDto.setFullname("Nguyen Van C");
        updateDto.setPhone("0987654321");

        RuntimeException exception = assertThrows(RuntimeException.class, () -> userService.updateUserByEmail(null, updateDto));
        assertEquals("Email không được để trống", exception.getMessage());
    }

    @Test
    void update_Success() {
        String email = "customer@example.com";
        UserEntity existingUser = new UserEntity();
        existingUser.setId(UUID.randomUUID());
        existingUser.setEmail(email);
        existingUser.setFullname("Nguyen Van B");
        existingUser.setPhone("0987654321");
        existingUser.setPassword("encoded-password");
        existingUser.setRoles("customer");

        UserDTO updateDto = new UserDTO();
        updateDto.setFullname("Nguyen Van C");
        updateDto.setPhone("0987654321");
        updateDto.setPassword(null);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(UserEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UserDTO result = userService.updateUserByEmail(email, updateDto);

        assertEquals("Nguyen Van C", result.getFullname());
        assertEquals(email, result.getEmail());
        assertEquals("0987654321", result.getPhone());
    }

    @Test
    void login_UserNotFound() {
        LoginRequest request = new LoginRequest();
        request.setEmail("notfound@example.com");
        request.setPassword("password123");

        when(userRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.login(request));
        assertEquals("Email hoặc mật khẩu không đúng", exception.getMessage());
    }

    @Test
    void register_EmailInvalidFormat() {
        RegisterRequest request = new RegisterRequest();
        request.setFullname("Nguyen Van A");
        request.setEmail("abc@");
        request.setPhone("0123456789");
        request.setPassword("123456");

        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.register(request));
        assertEquals("Email không hợp lệ", exception.getMessage());
    }

    @Test
    void register_BoundaryPassword() {
        RegisterRequest request = new RegisterRequest();
        request.setFullname("Nguyen Van A");
        request.setEmail("user@example.com");
        request.setPhone("0123456789");
        request.setPassword("123456");

        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("123456")).thenReturn("encoded-password");
        when(userRepository.save(any(UserEntity.class))).thenAnswer(invocation -> {
            UserEntity entity = invocation.getArgument(0);
            entity.setId(UUID.randomUUID());
            return entity;
        });
        when(jwtService.generate(anyString(), anyString(), anyString())).thenReturn("boundary-token");

        AuthResponse response = authService.register(request);

        assertEquals("boundary-token", response.getToken());
        assertEquals("customer", response.getRoles());
    }

    @Test
    void update_DBError() {
        String email = "customer@example.com";
        UserEntity existingUser = new UserEntity();
        existingUser.setId(UUID.randomUUID());
        existingUser.setEmail(email);
        existingUser.setFullname("Nguyen Van B");
        existingUser.setPhone("0987654321");
        existingUser.setPassword("encoded-password");
        existingUser.setRoles("customer");

        UserDTO updateDto = new UserDTO();
        updateDto.setFullname("Nguyen Van C");
        updateDto.setPhone("0987654321");
        updateDto.setPassword(null);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(UserEntity.class))).thenThrow(new RuntimeException("repo error"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> userService.updateUserByEmail(email, updateDto));
        assertEquals("repo error", exception.getMessage());
    }

    @Test
    void update_MultipleFields() {
        String email = "customer@example.com";
        UserEntity existingUser = new UserEntity();
        existingUser.setId(UUID.randomUUID());
        existingUser.setEmail(email);
        existingUser.setFullname("Nguyen Van B");
        existingUser.setPhone("0987654321");
        existingUser.setPassword("old-password");
        existingUser.setRoles("customer");

        UserDTO updateDto = new UserDTO();
        updateDto.setFullname("Nguyen Van C");
        updateDto.setPhone("0911222333");
        updateDto.setPassword("newpassword");

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(existingUser));
        when(passwordEncoder.encode("newpassword")).thenReturn("encoded-newpassword");
        when(userRepository.save(any(UserEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UserDTO result = userService.updateUserByEmail(email, updateDto);

        assertEquals("Nguyen Van C", result.getFullname());
        assertEquals("0911222333", result.getPhone());
        assertEquals("encoded-newpassword", result.getPassword());
    }

    @Test
    void update_InvalidInput() {
        String email = "customer@example.com";
        UserDTO updateDto = new UserDTO();
        updateDto.setPhone("0987654321");

        RuntimeException exception = assertThrows(RuntimeException.class, () -> userService.updateUserByEmail(email, updateDto));
        assertEquals("Dữ liệu không hợp lệ", exception.getMessage());
    }
}
