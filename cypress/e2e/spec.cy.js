describe('Search by skill', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('#criteria-skill').check()
    cy.get('#searchFormSkill').select('REACT')
    cy.get('.btn').click()
  })

  it('search by associateId', function () {
    cy.visit('/')
    cy.get('#criteria-associate-id').check()
    cy.get('#searchFormAssociateId').clear('20')
    cy.get('#searchFormAssociateId').type('2020100')
    cy.get('.btn').click()
  })

  it('Search by name', function () {
    cy.visit('/')
    cy.get('#criteria-name').check()
    cy.get('#searchFormName').type('Hayden')
    cy.get('.btn').click()
  })

  it('Pagination', async function () {
    cy.visit('/')
    cy.get('#criteria-skill').check()
    cy.get('#searchFormSkill').select('REACT')

    const visitNextPage = (pageNo) => {
      cy.get(`:nth-child(${pageNo}) > .page-link`).then(($next) => {
        cy.get(`:nth-child(${pageNo}) > .page-link`).click()
        if ($next.find('.last').length) {
          return
        }
        visitNextPage(++pageNo)
      })
    }
    visitNextPage(1)
  })

  it('add profile - invalid form', function () {
    cy.visit('/')
    cy.get('[href="/associate-view"]').click()
    cy.get('.btn').click()
    cy.get('.invalid-feedback').should('have.length', 17)
  })

  it('add and update profile', function () {
    cy.visit('/')
    cy.get('[href="/associate-view"]').click()
    cy.get('#addProfileFormName').type('Hayden Adams')
    cy.get('#addProfileFormAssociateId').type('CTS234234234')
    cy.get('#addProfileFormEmail').type('ddd@fff.com')
    cy.get('#addProfileFormMobile').type('0402471056')
    cy.get('#addProfileFormHTML_CSS_JAVASCRIPT').type('12')
    cy.get('#addProfileFormANGULAR').type('14')
    cy.get('#addProfileFormREACT').type('16')
    cy.get('#addProfileFormSPRING').type('18')
    cy.get('#addProfileFormRESTFUL').type('16')
    cy.get('#addProfileFormHIBERNATE').type('17')
    cy.get('#addProfileFormGIT').type('19')
    cy.get('#addProfileFormDOCKER').type('5')
    cy.get('#addProfileFormJENKINS').type('3')
    cy.get('#addProfileFormAWS').type('18')
    cy.get('#addProfileFormSPOKEN').type('15')
    cy.get('#addProfileFormCOMMUNICATION').type('17')
    cy.get('#addProfileFormATTITUDE').type('18')
    cy.get('.btn').click()
    cy.get('h2').should('contain.text', 'View profile')

    // update profile
    cy.get('.btn').click()
    cy.get('h2').should('contain.text', 'Edit profile')
    cy.get(':nth-child(2) > :nth-child(3) > .mb-3').click()
    cy.get('#addProfileFormANGULAR').clear()
    cy.get('#addProfileFormANGULAR').type('16')
    cy.get(':nth-child(6) > .mb-3').click()
    cy.get('#addProfileFormRESTFUL').clear()
    cy.get('#addProfileFormRESTFUL').type('15')
    cy.get('form > :nth-child(1) > :nth-child(2)').click()
    cy.get('#addProfileFormJENKINS').clear()
    cy.get('#addProfileFormJENKINS').type('14')
    cy.get('.btn').click()
    cy.get('h2').should('contain.text', 'View profile')
  })
})