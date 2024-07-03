describe('Pruebas de Inicio de Sesión', () => {
  it('SS-0001: Inicio sesión correctamente', () => {

    cy.visit('http://localhost:3001/inicio')
      cy.visit('http://localhost:3001/#iniciar-sesion') 


      cy.get('input[name="email"]').type('npavez43@gmail.com') 
      cy.get('input[name="contraseña"]').type('admin')


      cy.get('#boton').click()




      cy.url().should('include', 'http://localhost:3001/#/')
  })

  it('SS-0002: Inicio de sesión incorrecta', () => {
    cy.visit('http://localhost:3001/inicio')

      cy.visit('http://localhost:3001/#iniciar-sesion') 


      cy.get('input[name="email"]').type('npavez44@gmail.com') 
      cy.get('input[name="contraseña"]').type('admin1')


      cy.get('#boton').click()


      cy.wait(1000);


    cy.get('div.form-group:has(#email) .error-message').should('contain', 'El campo es obligatorio o incorrecto')
    cy.get('div.form-group:has(#contrase\u00f1a) .error-message').should('contain', 'El campo es obligatorio o incorrecto')
  })

  it('SS-0003: Inicio de sesión - Cierre de Sesion', () => {
    cy.visit('http://localhost:3001/inicio')

      cy.visit('http://localhost:3001/#iniciar-sesion') 


      cy.get('input[name="email"]').type('npavez43@gmail.com') 
      cy.get('input[name="contraseña"]').type('admin')

      cy.get('#boton').click()

      cy.url().should('include', 'http://localhost:3001/#/')

      cy.get('#logOut').click()

      cy.url().should('include', 'http://localhost:3001/#/')
  })

  
})