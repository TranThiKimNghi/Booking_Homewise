// cypress/e2e/register.spec.js
describe('Register - Black-box', () => {
  const baseUrl = 'http://localhost:5173'

  beforeEach(() => {
    cy.visit(`${baseUrl}/register`) // URL trang đăng ký
  })

  it('REG_001 - Đăng ký thành công với dữ liệu hợp lệ', () => {
    cy.get('input[name=fullname]').type('TrinhNgocVu')
    cy.get('input[name=phone]').type('0378447197')
    cy.get('input[name=email]').type('trinhvu@gmail.com')
    cy.get('input[name=password]').type('Vu123')
    cy.get('button[type=submit]').click()

    // Kiểm tra redirect về login
    cy.url().should('eq', 'http://localhost:5173/')
  })

  it('REG_002 - Không nhập fullname', () => {
    cy.get('input[name=phone]').type('0378447197')
    cy.get('input[name=email]').type('trinhvu@gmail.com')
    cy.get('input[name=password]').type('Vu123')
    cy.get('button[type=submit]').click()

    cy.contains('Không được để trống').should('be.visible')
  })

  it('REG_003 - Không nhập sdt', () => {
    cy.get('input[name=fullname]').type('TrinhNgocVu')
    cy.get('input[name=email]').type('trinhvu@gmail.com')
    cy.get('input[name=password]').type('Vu123')
    cy.get('button[type=submit]').click()

    cy.contains('Không được để trống').should('be.visible')
  })

  it('REG_004 - Không nhập email', () => {
    cy.get('input[name=fullname]').type('TrinhNgocVu')
    cy.get('input[name=phone]').type('0378447197')
    cy.get('input[name=password]').type('Vu124')
    cy.get('button[type=submit]').click()

    cy.contains('Không được để trống').should('be.visible')
  })

  it('REG_005 - Không nhập email', () => {
    cy.get('input[name=fullname]').type('TrinhNgocVu')
    cy.get('input[name=phone]').type('0378447197')
    cy.get('input[name=password]').type('Vu123')
    cy.get('button[type=submit]').click()

    cy.contains('Không được để trống').should('be.visible')
  })

  it('REG_006 - Không nhập password', () => {
    cy.get('input[name=fullname]').type('TrinhNgocVu')
    cy.get('input[name=phone]').type('0378447197')
    cy.get('input[name=email]').type('trinhvu@gmail.com')
    cy.get('button[type=submit]').click()

    cy.contains('Không được để trống').should('be.visible')
  })

  it('REG_007 - Email thiếu @', () => {
    cy.get('input[name=fullname]').type('TrinhNgocVu')
    cy.get('input[name=phone]').type('0378447197')
    cy.get('input[name=email]').type('trinhvugmail.com')
    cy.get('input[name=password]').type('Vu125')
    cy.get('button[type=submit]').click()

    cy.contains('Báo sai định dạng email').should('be.visible')
  })

  it('REG_008 - Email thiếu domain', () => {
    cy.get('input[name=fullname]').type('TrinhNgocVu')
    cy.get('input[name=phone]').type('0378447197')
    cy.get('input[name=email]').type('trinhvu@')
    cy.get('input[name=password]').type('Vu125')
    cy.get('button[type=submit]').click()

    cy.contains('Thông báo sai định dạng email').should('be.visible')
  })

  it('REG_009 - SĐT sai định dạng', () => {
    cy.get('input[name=fullname]').type('TrinhNgocVu')
    cy.get('input[name=phone]').type('03784471') // thiếu ký tự
    cy.get('input[name=email]').type('trinhvu@gmail.com')
    cy.get('input[name=password]').type('Vu123')
    cy.get('button[type=submit]').click()

    cy.contains('Thông báo sai định dạng sdt').should('be.visible')
  })

  it('REG_010 - SĐT quá 10 ký tự', () => {
    cy.get('input[name=fullname]').type('TrinhNgocVu')
    cy.get('input[name=phone]').type('037844719712') // hơn 10 ký tự
    cy.get('input[name=email]').type('trinhvu@gmail.com')
    cy.get('input[name=password]').type('Vu123')
    cy.get('button[type=submit]').click()

    cy.contains('Thông báo sai định dạng sdt').should('be.visible')
  })

  it('REG_011 - Email đã được sử dụng', () => {
    cy.get('input[name=fullname]').type('TrinhNgocVu')
    cy.get('input[name=phone]').type('0378447197')
    cy.get('input[name=email]').type('trinhvu@gmail.com') // email cũ
    cy.get('input[name=password]').type('Vu123')
    cy.get('button[type=submit]').click()

    cy.contains('Thông báo gmail đã được sử dụng').should('be.visible')
  })
})