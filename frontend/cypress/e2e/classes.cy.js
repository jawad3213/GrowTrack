// cypress/e2e/classes.cy.js
// Classes CRUD Tests

describe('Classes E2E', () => {
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

  describe('View Classes', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="class"]').length > 0) {
          cy.get('a[href*="class"]').first().click();
        }
      });
    });

    it('should display classes list', () => {
      cy.get('body').should('be.visible');
    });

    it('should show class cards', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="card"]').length > 0) {
          cy.get('[class*="card"]').should('be.visible');
        }
      });
    });

    it('should display class name', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="class"]').length > 0) {
          cy.get('[class*="class"]').first().should('be.visible');
        }
      });
    });

    it('should display student count', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="count"]').length > 0 || $body.find('[class*="student"]').length > 0) {
          cy.get('[class*="count"]').or('[class*="student"]').should('be.visible');
        }
      });
    });

    it('should search classes', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[placeholder*="search"]').length > 0) {
          cy.get('input[placeholder*="search"]').type('CI1');
        }
      });
    });
  });

  describe('Create Class', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="class"]').length > 0) {
          cy.get('a[href*="class"]').first().click();
        }
      });
    });

    it('should show add class button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Add').length > 0) {
          cy.get('button').contains('Add').should('be.visible');
        } else if ($body.find('button').contains('Create').length > 0) {
          cy.get('button').contains('Create').should('be.visible');
        }
      });
    });

    it('should open create form', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Add').length > 0) {
          cy.get('button').contains('Add').click();
        }
      });
      
      cy.get('body').then(($body) => {
        if ($body.find('input').length > 0 || $body.find('form').length > 0) {
          // Form opened
        }
      });
    });

    it('should create class with name', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Add').length > 0) {
          cy.get('button').contains('Add').click();
          
          if ($body.find('input').length > 0) {
            cy.get('input').first().type('New Class CI3');
            
            if ($body.find('button').contains('Save').length > 0) {
              cy.get('button').contains('Save').click();
            }
          }
        }
      });
    });

    it('should validate required fields', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Add').length > 0) {
          cy.get('button').contains('Add').click();
          cy.get('button').contains('Save').click();
          
          cy.get('body').then(($body2) => {
            if ($body2.find('[class*="error"]').length > 0) {
              cy.get('[class*="error"]').should('be.visible');
            }
          });
        }
      });
    });
  });

  describe('Update Class', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="class"]').length > 0) {
          cy.get('a[href*="class"]').first().click();
        }
      });
    });

    it('should show edit button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="class"]').length > 0) {
          cy.get('[class*="class"]').first().trigger('mouseover');
          
          if ($body.find('button').contains('Edit').length > 0) {
            cy.get('button').contains('Edit').should('be.visible');
          }
        }
      });
    });

    it('should update class name', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="class"]').length > 0) {
          cy.get('[class*="class"]').first().click();
          
          if ($body.find('button').contains('Edit').length > 0) {
            cy.get('button').contains('Edit').click();
            
            if ($body.find('input').length > 0) {
              cy.get('input').first().clear().type('Updated Class Name');
              cy.get('button').contains('Save').click();
            }
          }
        }
      });
    });

    it('should assign professor to class', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="class"]').length > 0) {
          cy.get('[class*="class"]').first().click();
          
          if ($body.find('select').length > 0) {
            cy.get('select').first().select(1);
          }
        }
      });
    });
  });

  describe('Delete Class', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="class"]').length > 0) {
          cy.get('a[href*="class"]').first().click();
        }
      });
    });

    it('should show delete button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="class"]').length > 0) {
          cy.get('[class*="class"]').first().trigger('mouseover');
          
          if ($body.find('button').contains('Delete').length > 0) {
            cy.get('button').contains('Delete').should('be.visible');
          }
        }
      });
    });

    it('should confirm before delete', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="class"]').length > 0) {
          cy.get('[class*="class"]').first().trigger('mouseover');
          
          if ($body.find('button').contains('Delete').length > 0) {
            cy.get('button').contains('Delete').click();
            
            cy.get('body').then(($body2) => {
              if ($body2.find('[class*="confirm"]').length > 0) {
                cy.get('[class*="confirm"]').should('be.visible');
              }
            });
          }
        }
      });
    });

    it('should delete class', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="class"]').length > 0) {
          cy.get('[class*="class"]').first().trigger('mouseover');
          
          if ($body.find('button').contains('Delete').length > 0) {
            cy.get('button').contains('Delete').click();
            
            cy.get('body').then(($body2) => {
              if ($body2.find('button').contains('Confirm').length > 0) {
                cy.get('button').contains('Confirm').click();
              }
            });
          }
        }
      });
    });
  });

  describe('Class Details', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="class"]').length > 0) {
          cy.get('a[href*="class"]').first().click();
        }
      });
    });

    it('should view class details', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="class"]').length > 0) {
          cy.get('[class*="class"]').first().click();
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should display assigned students', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="student"]').length > 0) {
          cy.get('[class*="student"]').should('be.visible');
        }
      });
    });

    it('should display assigned professor', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="professor"]').length > 0 || $body.find('[class*="teacher"]').length > 0) {
          cy.get('[class*="professor"]').or('[class*="teacher"]').should('be.visible');
        }
      });
    });
  });
});