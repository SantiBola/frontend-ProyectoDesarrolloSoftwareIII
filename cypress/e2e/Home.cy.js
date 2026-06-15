describe('Página principal', () => {
  it('carga correctamente', () => {
    cy.visit('/');

    cy.contains('Bienvenido');
  });
});