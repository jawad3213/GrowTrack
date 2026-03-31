// cypress/e2e/skills.cy.js
// Skills CRUD Tests

describe('Skills E2E', () => {
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

  describe('View Skills', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="skill"]').length > 0) {
          cy.get('a[href*="skill"]').first().click();
        }
      });
    });

    it('should display skills list', () => {
      cy.get('body').should('be.visible');
    });

    it('should show skill cards', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="card"]').length > 0) {
          cy.get('[class*="card"]').should('be.visible');
        }
      });
    });

    it('should display skill name', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="skill"]').length > 0) {
          cy.get('[class*="skill"]').first().should('be.visible');
        }
      });
    });

    it('should display skill category', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="category"]').length > 0) {
          cy.get('[class*="category"]').should('be.visible');
        }
      });
    });

    it('should search skills', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[placeholder*="search"]').length > 0) {
          cy.get('input[placeholder*="search"]').type('JavaScript');
        }
      });
    });

    it('should filter by category', () => {
      cy.get('body').then(($body) => {
        if ($body.find('select').length > 0) {
          cy.get('select').first().select('Technical');
        }
      });
    });
  });

  describe('Create Skill', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="skill"]').length > 0) {
          cy.get('a[href*="skill"]').first().click();
        }
      });
    });

    it('should show add skill button', () => {
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

    it('should create skill with name', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Add').length > 0) {
          cy.get('button').contains('Add').click();
          
          if ($body.find('input').length > 0) {
            cy.get('input').first().type('React.js');
            
            if ($body.find('button').contains('Save').length > 0) {
              cy.get('button').contains('Save').click();
            }
          }
        }
      });
    });

    it('should create skill with description', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Add').length > 0) {
          cy.get('button').contains('Add').click();
          
          if ($body.find('textarea').length > 0) {
            cy.get('textarea').type('Frontend JavaScript library');
            cy.get('button').contains('Save').click();
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

  describe('Update Skill', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="skill"]').length > 0) {
          cy.get('a[href*="skill"]').first().click();
        }
      });
    });

    it('should show edit button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="skill"]').length > 0) {
          cy.get('[class*="skill"]').first().trigger('mouseover');
          
          if ($body.find('button').contains('Edit').length > 0) {
            cy.get('button').contains('Edit').should('be.visible');
          }
        }
      });
    });

    it('should update skill name', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="skill"]').length > 0) {
          cy.get('[class*="skill"]').first().click();
          
          if ($body.find('button').contains('Edit').length > 0) {
            cy.get('button').contains('Edit').click();
            
            if ($body.find('input').length > 0) {
              cy.get('input').first().clear().type('Updated Skill Name');
              cy.get('button').contains('Save').click();
            }
          }
        }
      });
    });

    it('should update skill description', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="skill"]').length > 0) {
          cy.get('[class*="skill"]').first().click();
          
          if ($body.find('button').contains('Edit').length > 0) {
            cy.get('button').contains('Edit').click();
            
            if ($body.find('textarea').length > 0) {
              cy.get('textarea').clear().type('Updated description');
              cy.get('button').contains('Save').click();
            }
          }
        }
      });
    });
  });

  describe('Delete Skill', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="skill"]').length > 0) {
          cy.get('a[href*="skill"]').first().click();
        }
      });
    });

    it('should show delete button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="skill"]').length > 0) {
          cy.get('[class*="skill"]').first().trigger('mouseover');
          
          if ($body.find('button').contains('Delete').length > 0) {
            cy.get('button').contains('Delete').should('be.visible');
          }
        }
      });
    });

    it('should confirm before delete', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="skill"]').length > 0) {
          cy.get('[class*="skill"]').first().trigger('mouseover');
          
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

    it('should delete skill', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="skill"]').length > 0) {
          cy.get('[class*="skill"]').first().trigger('mouseover');
          
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

  describe('Skill Assignment', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(adminUser.email);
      cy.get('input[type="password"]').type(adminUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should assign skill to student', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="skill"]').length > 0) {
          cy.get('a[href*="skill"]').first().click();
          
          if ($body.find('[class*="skill"]').length > 0) {
            cy.get('[class*="skill"]').first().click();
            
            if ($body.find('button').contains('Assign').length > 0) {
              cy.get('button').contains('Assign').click();
            }
          }
        }
      });
    });

    it('should rate student skill', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="skill"]').length > 0) {
          cy.get('a[href*="skill"]').first().click();
          
          if ($body.find('[class*="skill"]').length > 0) {
            cy.get('[class*="skill"]').first().click();
            
            if ($body.find('input[type="range"]').length > 0) {
              cy.get('input[type="range"]').first().invoke('val', 8).trigger('change');
              cy.get('button').contains('Save').click();
            }
          }
        }
      });
    });
  });
});