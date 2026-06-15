describe('Home y Platos Destacados', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Debe mostrar el banner principal', () => {
    cy.contains('Comida casera para comer bien').should('be.visible')
    cy.contains('Ver menu').should('have.attr', 'href', '/Menu')
  })

  it('Debe cargar la sección de Favoritos de la casa', () => {
    cy.contains('Favoritos de la casa').should('be.visible')
    
    // Verifica que los platos del array featuredDishes se rendericen
    cy.contains('Casado tradicional').should('be.visible')
    cy.contains('Desayuno cabana').should('be.visible')
    cy.contains('Olla de carne').should('be.visible')
  })
})