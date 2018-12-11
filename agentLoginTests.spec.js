describe('Agent interactions', function() {
  beforeEach(function() {
    cy.wait(500);
    const clear = Cypress.LocalStorage.clear;
    Cypress.LocalStorage.clear = function(keys, ls, rs) {
      // do something with the keys here
    };
  });
  it('Agent visits the wttp-portal!', function() {
    cy.visit(
      'https://s3.amazonaws.com/mustang-portal-ui/wttp-portal/index.html',
    );
  });
  it('Agent enters username and password into the form then submits!', function() {
    cy.contains('Please');
    cy.get('#inputUsername').type('admin', { delay: 100 });
    cy.get('#inputPassword').type('test123', { delay: 100 });
    cy.get('#btnSignIn').click();
  });
  it('Counts 10 the devices in the response!', function() {
    cy.contains('Devices');
    cy.wait(500);
    //  cy.get('#tblDevices').find('ng-reflect-row-class').should('have.length', 151)
    //  cy.viewport('iphone-6')
    cy.get('.datatable-row-wrapper').should('have.length', 10);
  });
  it('Bulk actions is present but disabled!', function() {
    cy.get('#btnBulkAction').should('be.disabled');
  });
  it('Device ID is selected when opened', function() {
    cy.get('#searchBy').should('have.value', 'deviceId');
  });
  it('A marked checkbox enables the bulk button checkbox', function() {
    cy.get(
      '#tblDevices > div > datatable-header > div > div.datatable-row-center > datatable-header-cell:nth-child(1) > div > label > input[type="checkbox"]',
    ).check();
    cy.get('#btnBulkAction').should('be.enabled');
  });
  it('An unmarked checkbox disables the bulk button checkbox', function() {
    cy.get(
      '#tblDevices > div > datatable-header > div > div.datatable-row-center > datatable-header-cell:nth-child(1) > div > label > input[type="checkbox"]',
    ).uncheck();
    cy.get('#btnBulkAction').should('be.disabled');
    cy.screenshot();

    // cy.viewport('iphone-6')
  });
  it('user logs out', function() {
    cy.get('#btnLogout').click();
  });
});
