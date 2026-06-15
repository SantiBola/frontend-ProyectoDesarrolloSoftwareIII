describe('Sección Catering y Footer', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Debe renderizar la información principal de Catering', () => {
    // Hace scroll a la sección de catering
    cy.get('#catering').scrollIntoView()
    
    // Verifica los textos exactos que programaste en CateringPage.tsx
    cy.contains('Servicio de Catering').should('be.visible')
    cy.contains('Servicio completo').should('be.visible')
  })

  it('El Footer debe contener los enlaces de redes y WhatsApp', () => {
    cy.scrollTo('bottom')
    
    // Verifica que el número de teléfono esté visible en texto
    cy.contains('+506 2444-6748').should('be.visible')

    // Verifica que el ícono de WhatsApp en el Footer tenga el enlace correcto
    cy.get('footer a[href="https://wa.me/85049791"]')
      .should('exist')
      .and('have.attr', 'target', '_blank')
  })
})