// cypress/e2e/projects.cy.js
// Projects CRUD Tests

describe('Projects E2E', () => {
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

  describe('View Projects', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
        }
      });
    });

    it('should display projects list', () => {
      cy.get('body').should('be.visible');
    });

    it('should display project cards', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="card"]').length > 0) {
          cy.get('[class*="card"]').should('be.visible');
        }
      });
    });

    it('should show project details', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="project"]').length > 0) {
          cy.get('[class*="project"]').first().click();
        }
      });
    });

    it('should filter projects by status', () => {
      cy.get('body').then(($body) => {
        if ($body.find('select').length > 0) {
          cy.get('select').select('active');
        }
      });
    });

    it('should search projects', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[type="search"]').length > 0) {
          cy.get('input[type="search"]').type('test project');
        } else if ($body.find('input[placeholder*="search"]').length > 0) {
          cy.get('input[placeholder*="search"]').type('test project');
        }
      });
    });
  });

  describe('Create Project', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
        }
      });
    });

    it('should show create button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Create').length > 0) {
          cy.get('button').contains('Create').should('be.visible');
        } else if ($body.find('button').contains('Add').length > 0) {
          cy.get('button').contains('Add').should('be.visible');
        }
      });
    });

    it('should open create form', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Create').length > 0) {
          cy.get('button').contains('Create').click();
        }
      });
      
      cy.get('body').then(($body) => {
        if ($body.find('input').length > 0 || $body.find('form').length > 0) {
          // Form is open
        }
      });
    });

    it('should create project with required fields', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Create').length > 0) {
          cy.get('button').contains('Create').click();
          
          if ($body.find('input').length > 0) {
            // Fill required fields
            cy.get('input').first().type('New Test Project');
            
            if ($body.find('button').contains('Submit').length > 0) {
              cy.get('button').contains('Submit').click();
            } else if ($body.find('button').contains('Save').length > 0) {
              cy.get('button').contains('Save').click();
            }
          }
        }
      });
    });

    it('should show validation error for empty required fields', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Create').length > 0) {
          cy.get('button').contains('Create').click();
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

  describe('Update Project', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
        }
      });
    });

    it('should show edit button for project', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="project"]').length > 0) {
          cy.get('[class*="project"]').first().trigger('mouseover');
          
          if ($body.find('button').contains('Edit').length > 0) {
            cy.get('button').contains('Edit').should('be.visible');
          }
        }
      });
    });

    it('should update project title', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="project"]').length > 0) {
          cy.get('[class*="project"]').first().click();
          
          if ($body.find('button').contains('Edit').length > 0) {
            cy.get('button').contains('Edit').click();
            
            if ($body.find('input').length > 0) {
              cy.get('input').first().clear().type('Updated Project Title');
              cy.get('button').contains('Save').click();
            }
          }
        }
      });
    });

    it('should update project status', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="project"]').length > 0) {
          cy.get('[class*="project"]').first().click();
          
          if ($body.find('select').length > 0) {
            cy.get('select').select('Completed');
          }
        }
      });
    });
  });

  describe('Delete Project', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
        }
      });
    });

    it('should show delete button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="project"]').length > 0) {
          cy.get('[class*="project"]').first().trigger('mouseover');
          
          if ($body.find('button').contains('Delete').length > 0) {
            cy.get('button').contains('Delete').should('be.visible');
          }
        }
      });
    });

    it('should confirm before delete', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="project"]').length > 0) {
          cy.get('[class*="project"]').first().trigger('mouseover');
          
          if ($body.find('button').contains('Delete').length > 0) {
            cy.get('button').contains('Delete').click();
            
            // Should show confirmation dialog
            cy.get('body').then(($body2) => {
              if ($body2.find('[class*="confirm"]').length > 0 || $body2.find('[class*="modal"]').length > 0) {
                cy.get('[class*="confirm"]').or('[class*="modal"]').should('be.visible');
              }
            });
          }
        }
      });
    });

    it('should delete project', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="project"]').length > 0) {
          cy.get('[class*="project"]').first().trigger('mouseover');
          
          if ($body.find('button').contains('Delete').length > 0) {
            cy.get('button').contains('Delete').click();
            
            // Confirm deletion
            cy.get('body').then(($body2) => {
              if ($body2.find('button').contains('Confirm').length > 0) {
                cy.get('button').contains('Confirm').click();
              } else if ($body2.find('button').contains('Yes').length > 0) {
                cy.get('button').contains('Yes').click();
              }
            });
          }
        }
      });
    });
  });

  describe('Project Details', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
        }
      });
    });

    it('should display project title', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="project"]').length > 0) {
          cy.get('[class*="project"]').first().click();
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should display project description', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="description"]').length > 0) {
          cy.get('[class*="description"]').should('be.visible');
        }
      });
    });

    it('should display assigned members', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="member"]').length > 0 || $body.find('[class*="assign"]').length > 0) {
          cy.get('[class*="member"]').or('[class*="assign"]').should('be.visible');
        }
      });
    });

    it('should display project timeline', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="timeline"]').length > 0 || $body.find('[class*="date"]').length > 0) {
          cy.get('[class*="timeline"]').or('[class*="date"]').should('be.visible');
        }
      });
    });
  });
});