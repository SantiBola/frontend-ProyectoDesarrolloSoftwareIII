describe('Formulario de Reservas', () => {
  beforeEach(() => {
    cy.visit('/')
    // Navega directo al formulario haciendo scroll
    cy.get('#reservaciones').scrollIntoView()
  })

  it('Debe permitir llenar los datos de la reserva', () => {
    cy.contains('Apartá tu mesa').should('be.visible')

    // Ahora buscamos exactamente por el atributo 'name' que pusiste en tu código
    cy.get('input[name="idClient"]').type('123')
    cy.get('input[name="idTable"]').type('5')
    
    // Formato de fecha (YYYY-MM-DD) y hora
    cy.get('input[name="dateReservation"]').type('2026-12-25')
    cy.get('input[name="timeReservation"]').type('14:30')

    // El botón debe decir "Confirmar reserva" y estar habilitado
    cy.contains('button', 'Confirmar reserva').should('not.be.disabled')
  })
})