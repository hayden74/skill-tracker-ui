describe('Admin view', () => {
  it('Search skill', () => {
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
})