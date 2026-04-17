describe('Login - Black-box', () => {
  const baseUrl = 'http://localhost:5173/login';

  beforeEach(() => {
    cy.visit(baseUrl); // Mở trang login trước mỗi test
  });

  it('LOG_001 - Đăng nhập thành công với dữ liệu hợp lệ', () => {
    cy.get('input[name=email]').type('thuy@gmail.com');
    cy.get('input[name=password]').type('thuy@123');
    cy.get('button[type=submit]').click();

    // Chờ backend phản hồi trước khi kiểm tra URL
    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:5173/');
  });

  it('LOG_002 - Đăng nhập thất bại khi không nhập email', () => {
    cy.get('input[name=password]').type('thuy@123');
    cy.get('button[type=submit]').click();
    cy.contains('Không được bỏ trống');
  });

  it('LOG_003 - Đăng nhập thất bại khi không nhập password', () => {
    cy.get('button[type=submit]').click();
    cy.contains('Không được bỏ trống');
  });

  it('LOG_004 - Đăng nhập thất bại khi không nhập email và password', () => {
    cy.get('button[type=submit]').click();
    cy.contains('Không được bỏ trống');
  });

  it('LOG_005 - Đăng nhập thất bại khi email thiếu @', () => {
    cy.get('input[name=email]').type('thuygmail.com.com');
    cy.get('input[name=password]').type('thuy@123');
    cy.get('button[type=submit]').click();
    cy.contains('Gmail không được thiếu @');
  });

  it('LOG_006 - Đăng nhập thất bại khi email thiếu domain', () => {
    cy.get('input[name=email]').type('thuy@');
    cy.get('input[name=password]').type('thuy@123');
    cy.get('button[type=submit]').click();
    cy.contains('Thiếu phần sau của @');
  });

  it('LOG_007 - Đăng nhập thất bại khi email và password sai', () => {
    cy.get('input[name=email]').type('thuy@gmail.com');
    cy.get('input[name=password]').type('thuy@123');
    cy.get('button[type=submit]').click();
    cy.contains('Sai gmail hoặc mật khẩu, vui lòng thử lại');
  });

  it('LOG_008 - Đăng nhập thất bại khi password sai', () => {
    cy.get('input[name=email]').type('thuy@gmail.com');
    cy.get('input[name=password]').type('thuy@1234'); // Sai password
    cy.get('button[type=submit]').click();
    cy.contains('Sai gmail hoặc mật khẩu, vui lòng thử lại');
  });

  it('LOG_009 - Đăng nhập thất bại khi email sai', () => {
    cy.get('input[name=email]').type('thuy@gmail.com'); // Sai email
    cy.get('input[name=password]').type('thuy@123'); 
    cy.get('button[type=submit]').click();
    cy.contains('Sai gmail hoặc mật khẩu, vui lòng thử lại');
  });
});