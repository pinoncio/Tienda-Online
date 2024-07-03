describe('Pruebas de Gestion de Categorias', () => {
  it('GC-0001: Crear Categoria', () => {

    cy.visit('http://localhost:3001/inicio')
      cy.visit('http://localhost:3001/#iniciar-sesion') 


      cy.get('input[name="email"]').type('npavez43@gmail.com') 
      cy.get('input[name="contraseña"]').type('admin')


      cy.get('#boton').click()




      cy.url().should('include', 'http://localhost:3001/#/')
      cy.get("#botonAdmin").click()
      cy.url().should('include', 'http://localhost:3001/#admin')
      cy.get("#categorias").click()
      cy.url().should('include', 'http://localhost:3001/#/categoria')
      const nombreCategoria = 'categoria prueba';

    cy.get("#crear").click();
    cy.get('input[name="nombre_categoria"]').type(nombreCategoria);
    cy.get("#guardar").click();

    cy.get('table tbody tr') 
      .should('have.length.at.least', 1)
      .contains('td', nombreCategoria)
      .should('exist');
  });
  it('GC-0002: Editar Categoria', () => {
    const nombreCategoriaOriginal = 'categoria prueba';
    const nuevoNombreCategoria = 'categoria editada';
  
    cy.visit('http://localhost:3001/inicio');
    cy.visit('http://localhost:3001/#iniciar-sesion'); 
  
    cy.get('input[name="email"]').type('npavez43@gmail.com'); 
    cy.get('input[name="contraseña"]').type('admin');
  
    cy.get('#boton').click();
  
    cy.url().should('include', 'http://localhost:3001/#/');
    cy.get("#botonAdmin").click();
    cy.url().should('include', 'http://localhost:3001/#admin');
    cy.get("#categorias").click();
    cy.url().should('include', 'http://localhost:3001/#/categoria');
  
    cy.get('table tbody tr')
      .contains('td', nombreCategoriaOriginal)
      .should('exist');
  

    cy.get('table tbody tr')
      .contains('td', nombreCategoriaOriginal)
      .parent('tr')
      .find('button[id="editar"]')
      .click();
  

    cy.get('input[name="nombre_categoria"]').clear().type(nuevoNombreCategoria);
  

    cy.get("#guardar").click();
  
    cy.get('table tbody tr').contains('td', nombreCategoriaOriginal).should('not.exist');
    cy.get('table tbody tr').contains('td', nuevoNombreCategoria).should('exist');
  });
  it('GC-0003: Eliminar Categoria', () => {
    const nombreCategoria = 'categoria editada';
  
    cy.visit('http://localhost:3001/inicio');
    cy.visit('http://localhost:3001/#iniciar-sesion'); 
  
    cy.get('input[name="email"]').type('npavez43@gmail.com'); 
    cy.get('input[name="contraseña"]').type('admin');
  
    cy.get('#boton').click();
  
    cy.url().should('include', 'http://localhost:3001/#/');
    cy.get("#botonAdmin").click();
    cy.url().should('include', 'http://localhost:3001/#admin');
    cy.get("#categorias").click();
    cy.url().should('include', 'http://localhost:3001/#/categoria');
  
    cy.get('table tbody tr')
      .contains('td', nombreCategoria)
      .should('exist');
  

    cy.get('table tbody tr')
      .contains('td', nombreCategoria)
      .parent('tr')
      .find('button[id="eliminar"]')
      .click();

  
  
    cy.get('table tbody tr').contains('td', nombreCategoria).should('not.exist');
  });
});