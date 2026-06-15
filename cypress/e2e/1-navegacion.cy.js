describe('Navegación Principal', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Debe renderizar el header correctamente', () => {
    cy.contains('Soda La Cabaña').should('be.visible')
    cy.contains('Home').should('be.visible')
    cy.contains('Menú').should('be.visible')
  })

  it('Debe navegar a la sección de Horarios al hacer clic', () => {
    // Busca el enlace "Horarios" en la barra de navegación (desktop)
    cy.get('nav').contains('button', 'Horarios').click({ force: true })
    
    // Verifica que la URL cambie para incluir el ancla de horarios
    cy.url().should('include', '#horarios')
  })

  it('El botón de Reservas del header debe llevar al formulario', () => {
    // Clic en el botón naranja de reservas
    cy.contains('button', 'Reservas').click({ force: true })
    
    // Verifica que el título del formulario de reservas esté visible
    cy.contains('Apartá tu mesa').should('be.visible')
  })
})