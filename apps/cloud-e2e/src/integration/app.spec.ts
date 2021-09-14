describe('cloud', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the app version', () => {
    cy.get('[data-testid=app-version]').should('exist');
  });
});
