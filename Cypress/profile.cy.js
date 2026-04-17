describe('Profile - Black-box', () => {
  const baseUrl = 'http://localhost:5173/profile';

  // Trước mỗi test, login bằng API hoặc UI rồi vào trang profile
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name=email]').type('thuy@gmail.com');
    cy.get('input[name=password]').type('thuy@123');
    cy.get('button[type=submit]').click();

    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:5173/');
    cy.visit(baseUrl);
  });

  it('BB_001 - Hiển thị profile đúng khi load', () => {
    cy.get('input[name=fullname]').should('have.value', 'HoangThiThanhThuy');
    cy.get('input[name=email]').should('have.value', 'thuy@gmail.com');
    cy.get('input[name=phone]').should('have.value', '0978656998');
    cy.contains('Cập nhật');
    cy.contains('Xóa tài khoản');
  });

  it('BB_002 - Cập nhật profile với dữ liệu hợp lệ', () => {
    cy.get('input[name=fullname]').clear().type('HoangThiThanhThuy');
    cy.get('input[name=email]').clear().type('thuy1@gmail.com');
    cy.get('input[name=phone]').clear().type('0978656999');
    cy.get('button.update-profile').click();
    cy.contains('Cập nhật thành công');
  });

  it('BB_003 - Cập nhật profile bỏ trống họ tên', () => {
    cy.get('input[name=fullname]').clear();
    cy.get('input[name=email]').clear().type('thuy1@gmail.com');
    cy.get('input[name=phone]').clear().type('0978656998');
    cy.get('button.update-profile').click();
    cy.contains('Không được bỏ trống');
  });

  it('BB_004 - Cập nhật profile bỏ trống số điện thoại', () => {
    cy.get('input[name=fullname]').clear().type('HoangThiThanhThuy');
    cy.get('input[name=email]').clear().type('thuy1@gmail.com');
    cy.get('input[name=phone]').clear();
    cy.get('button.update-profile').click();
    cy.contains('Không được bỏ trống');
  });

  it('BB_005 - Cập nhật profile bỏ trống tất cả', () => {
    cy.get('input[name=fullname]').clear();
    cy.get('input[name=email]').clear();
    cy.get('input[name=phone]').clear();
    cy.get('button.update-profile').click();
    cy.contains('Không được bỏ trống');
  });

  it('BB_006 - Cập nhật profile số điện thoại chứa ký tự đặc biệt', () => {
    cy.get('input[name=fullname]').clear().type('HoangThiThanhThuy');
    cy.get('input[name=email]').clear().type('thuy1@gmail.com');
    cy.get('input[name=phone]').clear().type('0978656998@#');
    cy.get('button.update-profile').click();
    cy.contains('sdt không được có kí tự đặc biệt');
  });

  it('BB_007 - Cập nhật profile số điện thoại vượt quá số ký tự', () => {
    cy.get('input[name=fullname]').clear().type('HoangThiThanhThuy');
    cy.get('input[name=email]').clear().type('thuy1@gmail.com');
    cy.get('input[name=phone]').clear().type('037864775823');
    cy.get('button.update-profile').click();
    cy.contains('số dư kí tự');
  });

  it('BB_008 - Cập nhật profile email thiếu @', () => {
    cy.get('input[name=fullname]').clear().type('HoangThiThanhThuy');
    cy.get('input[name=email]').clear().type('thuygmail.com');
    cy.get('input[name=phone]').clear().type('0978656998');
    cy.get('button.update-profile').click();
    cy.contains('gmail thiếu @');
  });

  it('BB_009 - Cập nhật profile email thiếu domain', () => {
    cy.get('input[name=fullname]').clear().type('HoangThiThanhThuy');
    cy.get('input[name=email]').clear().type('thuy@');
    cy.get('input[name=phone]').clear().type('0978656998');
    cy.get('button.update-profile').click();
    cy.contains('gmail thiếu phần sau @');
  });
});