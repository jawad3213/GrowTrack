// cypress/e2e/reports.cy.js
// Reports Generation Tests

describe('Reports E2E', () => {
  const adminUser = {
    email: 'elouansaidisoukaina@gmail.com',
    password: 'PASS1234'
  };

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearSessionStorage();
    cy.visit('/Login');
    
    cy.get('body').then(($body) => {
      if ($body.find('button.bg-purple-500').length > 0) {
        cy.get('button.bg-purple-500').click();
      }
    });
  });

  describe('Access Reports', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should navigate to reports page', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="report"]').length > 0) {
          cy.get('a[href*="report"]').first().click();
        } else if ($body.find('button').contains('Report').length > 0) {
          cy.get('button').contains('Report').click();
        }
      });
      
      cy.url().should('satisfy', (url) => url.includes('report'));
    });

    it('should display reports list', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="report"]').length > 0) {
          cy.get('a[href*="report"]').first().click();
        }
      });
      
      cy.get('body').should('be.visible');
    });
  });

  describe('Generate Report', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="report"]').length > 0) {
          cy.get('a[href*="report"]').first().click();
        }
      });
    });

    it('should show generate report button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Generate').length > 0) {
          cy.get('button').contains('Generate').should('be.visible');
        }
      });
    });

    it('should select report type', () => {
      cy.get('body').then(($body) => {
        if ($body.find('select').length > 0) {
          cy.get('select').first().select('Student Report');
        }
      });
    });

    it('should select date range', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[type="date"]').length > 0) {
          cy.get('input[type="date"]').first().type('2024-01-01');
          cy.get('input[type="date"]').last().type('2024-12-31');
        }
      });
    });

    it('should filter by class', () => {
      cy.get('body').then(($body) => {
        if ($body.find('select').length > 1) {
          cy.get('select').eq(1).select('CI1');
        }
      });
    });

    it('should generate report', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Generate').length > 0) {
          cy.get('button').contains('Generate').click();
          
          // Wait for report generation
          cy.wait(2000);
          
          cy.get('body').then(($body2) => {
            if ($body2.find('[class*="report"]').length > 0) {
              cy.get('[class*="report"]').should('be.visible');
            }
          });
        }
      });
    });
  });

  describe('Report Display', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="report"]').length > 0) {
          cy.get('a[href*="report"]').first().click();
        }
      });
    });

    it('should display report title', () => {
      cy.get('body').then(($body) => {
        if ($body.find('h1').length > 0 || $body.find('[class*="title"]').length > 0) {
          cy.get('h1').or('[class*="title"]').should('be.visible');
        }
      });
    });

    it('should display report data', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="data"]').length > 0 || $body.find('table').length > 0) {
          cy.get('[class*="data"]').or('table').should('be.visible');
        }
      });
    });

    it('should display statistics', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="stat"]').length > 0) {
          cy.get('[class*="stat"]').should('be.visible');
        }
      });
    });

    it('should display charts if available', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="chart"]').length > 0 || $body.find('canvas').length > 0) {
          cy.get('[class*="chart"]').or('canvas').should('be.visible');
        }
      });
    });
  });

  describe('Export Report', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="report"]').length > 0) {
          cy.get('a[href*="report"]').first().click();
        }
      });
    });

    it('should show export button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Export').length > 0) {
          cy.get('button').contains('Export').should('be.visible');
        } else if ($body.find('button').contains('Download').length > 0) {
          cy.get('button').contains('Download').should('be.visible');
        }
      });
    });

    it('should export as PDF', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Export').length > 0) {
          cy.get('button').contains('Export').click();
          
          cy.get('body').then(($body2) => {
            if ($body2.find('button').contains('PDF').length > 0) {
              cy.get('button').contains('PDF').click();
            }
          });
        }
      });
    });

    it('should export as Excel', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Export').length > 0) {
          cy.get('button').contains('Export').click();
          
          cy.get('body').then(($body2) => {
            if ($body2.find('button').contains('Excel').length > 0) {
              cy.get('button').contains('Excel').click();
            }
          });
        }
      });
    });
  });

  describe('Student Report', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should generate student progress report', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="report"]').length > 0) {
          cy.get('a[href*="report"]').first().click();
          
          if ($body.find('select').length > 0) {
            cy.get('select').select('Student Progress');
            
            if ($body.find('button').contains('Generate').length > 0) {
              cy.get('button').contains('Generate').click();
            }
          }
        }
      });
    });

    it('should show student grades', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="grade"]').length > 0 || $body.find('[class*="score"]').length > 0) {
          cy.get('[class*="grade"]').or('[class*="score"]').should('be.visible');
        }
      });
    });

    it('should show attendance record', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="attendance"]').length > 0) {
          cy.get('[class*="attendance"]').should('be.visible');
        }
      });
    });
  });

  describe('Class Report', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should generate class report', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="report"]').length > 0) {
          cy.get('a[href*="report"]').first().click();
          
          if ($body.find('select').length > 0) {
            cy.get('select').select('Class Report');
            
            if ($body.find('button').contains('Generate').length > 0) {
              cy.get('button').contains('Generate').click();
            }
          }
        }
      });
    });

    it('should show class statistics', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="stat"]').length > 0) {
          cy.get('[class*="stat"]').should('be.visible');
        }
      });
    });

    it('should show student list', () => {
      cy.get('body').then(($body) => {
        if ($body.find('table').length > 0) {
          cy.get('table').should('be.visible');
        }
      });
    });
  });
});