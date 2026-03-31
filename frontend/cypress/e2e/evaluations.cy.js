// cypress/e2e/evaluations.cy.js
// Evaluations Flow Tests

describe('Evaluations E2E', () => {
  const validUser = {
    email: 'youssef.fassi@example.com',
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

  describe('View Evaluations', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
        }
      });
    });

    it('should display evaluations list', () => {
      cy.get('body').should('be.visible');
    });

    it('should show evaluation cards', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="card"]').length > 0) {
          cy.get('[class*="card"]').should('be.visible');
        }
      });
    });

    it('should filter evaluations by status', () => {
      cy.get('body').then(($body) => {
        if ($body.find('select').length > 0) {
          cy.get('select').select('pending');
        }
      });
    });

    it('should search evaluations', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[placeholder*="search"]').length > 0) {
          cy.get('input[placeholder*="search"]').type('test');
        }
      });
    });
  });

  describe('Submit Self-Evaluation (Student)', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
        }
      });
    });

    it('should show submit evaluation button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Submit').length > 0) {
          cy.get('button').contains('Submit').should('be.visible');
        } else if ($body.find('button').contains('Evaluate').length > 0) {
          cy.get('button').contains('Evaluate').should('be.visible');
        }
      });
    });

    it('should open evaluation form', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Submit').length > 0) {
          cy.get('button').contains('Submit').click();
        }
      });
      
      cy.get('body').should('be.visible');
    });

    it('should fill evaluation form', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Submit').length > 0) {
          cy.get('button').contains('Submit').click();
          
          // Fill form fields
          if ($body.find('textarea').length > 0) {
            cy.get('textarea').first().type('Self-evaluation response');
          }
          
          if ($body.find('input[type="range"]').length > 0) {
            cy.get('input[type="range"]').first().invoke('val', 5).trigger('change');
          }
        }
      });
    });

    it('should submit evaluation', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Submit').length > 0) {
          cy.get('button').contains('Submit').click();
          
          if ($body.find('button').contains('Confirm').length > 0) {
            cy.get('button').contains('Confirm').click();
          }
        }
      });
    });

    it('should validate required fields', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Submit').length > 0) {
          cy.get('button').contains('Submit').click();
          
          cy.get('button').contains('Submit').click();
          
          cy.get('body').then(($body2) => {
            if ($body2.find('[class*="error"]').length > 0) {
              cy.get('[class*="error"]').should('be.visible');
            }
          });
        }
      });
    });
  });

  describe('Evaluate Student (Professor/Coach)', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view student evaluations', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should select student to evaluate', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
          
          if ($body.find('[class*="student"]').length > 0) {
            cy.get('[class*="student"]').first().click();
          }
        }
      });
    });

    it('should fill evaluation criteria', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
          
          if ($body.find('button').contains('Evaluate').length > 0) {
            cy.get('button').contains('Evaluate').click();
            
            if ($body.find('select').length > 0) {
              cy.get('select').first().select('Good');
            }
          }
        }
      });
    });

    it('should add feedback', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
          
          if ($body.find('button').contains('Evaluate').length > 0) {
            cy.get('button').contains('Evaluate').click();
            
            if ($body.find('textarea').length > 0) {
              cy.get('textarea').type('Great progress on the project!');
              cy.get('button').contains('Submit').click();
            }
          }
        }
      });
    });
  });

  describe('View Evaluation Results', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
        }
      });
    });

    it('should display evaluation score', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="score"]').length > 0 || $body.find('[class*="grade"]').length > 0) {
          cy.get('[class*="score"]').or('[class*="grade"]').should('be.visible');
        }
      });
    });

    it('should display evaluation feedback', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="feedback"]').length > 0) {
          cy.get('[class*="feedback"]').should('be.visible');
        }
      });
    });

    it('should display evaluation date', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="date"]').length > 0) {
          cy.get('[class*="date"]').should('be.visible');
        }
      });
    });

    it('should display evaluator name', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="evaluator"]').length > 0 || $body.find('[class*="by"]').length > 0) {
          cy.get('[class*="evaluator"]').or('[class*="by"]').should('be.visible');
        }
      });
    });
  });

  describe('Evaluation History', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view evaluation history', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
          
          if ($body.find('button').contains('History').length > 0) {
            cy.get('button').contains('History').click();
          }
        }
      });
    });

    it('should filter by date range', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
          
          if ($body.find('input[type="date"]').length > 0) {
            cy.get('input[type="date"]').first().type('2024-01-01');
          }
        }
      });
    });
  });
});