/* eslint-disable no-undef */
describe('Navigation', () => {
    it('should find the heading', () => {
      cy.visit('/')
  
      cy.get('h1').contains('Sign Up')
    })
  })