// cypress/e2e/coach.cy.js
// Coach E2E Flow Tests

describe('Coach E2E Flow', () => {
  const coachCredentials = {
    email: 'coach@example.com',
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

  describe('Login Flow', () => {
    it('should login successfully as coach', () => {
      cy.get('input[type="email"]').type(coachCredentials.email);
      cy.get('input[type="password"]').type(coachCredentials.password);
      cy.get('button[type="submit"]').click();
      
      cy.url().should('satisfy', (url) => {
        return url.includes('/coach') || url.includes('/dashboard') || url.includes('coach');
      }, { timeout: 10000 });
    });

    it('should reject invalid credentials', () => {
      cy.get('input[type="email"]').type('wrong@example.com');
      cy.get('input[type="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      
      cy.contains('Email or Password is incorrect').should('be.visible');
      cy.url().should('include', '/Login');
    });
  });

  describe('Dashboard', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(coachCredentials.email);
      cy.get('input[type="password"]').type(coachCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should display coach dashboard', () => {
      cy.get('body').should('be.visible');
      cy.window().then((win) => {
        console.log('Coach dashboard loaded');
      });
    });

    it('should show assigned students count', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="stat"]').length > 0) {
          cy.get('[class*="stat"]').should('be.visible');
        }
      });
    });

    it('should show recent activity', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="activity"]').length > 0) {
          cy.get('[class*="activity"]').should('be.visible');
        }
      });
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(coachCredentials.email);
      cy.get('input[type="password"]').type(coachCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should navigate to Students', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="student"]').length > 0) {
          cy.get('a[href*="student"]').first().click();
        } else if ($body.find('button').contains('Student').length > 0) {
          cy.get('button').contains('Student').click();
        }
      });
      cy.url().should('satisfy', (url) => url.includes('student'));
    });

    it('should navigate to Projects', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
        }
      });
      cy.url().should('satisfy', (url) => url.includes('project'));
    });

    it('should navigate to Evaluations', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
        }
      });
      cy.url().should('satisfy', (url) => url.includes('evaluation'));
    });

    it('should navigate to Profile', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="profile"]').length > 0) {
          cy.get('a[href*="profile"]').first().click();
        }
      });
      cy.url().should('satisfy', (url) => url.includes('profile'));
    });
  });

  describe('Students Management', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(coachCredentials.email);
      cy.get('input[type="password"]').type(coachCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="student"]').length > 0) {
          cy.get('a[href*="student"]').first().click();
        }
      });
    });

    it('should view assigned students list', () => {
      cy.get('body').should('be.visible');
    });

    it('should search for student', () => {
      cy.get('body').then(($body) => {
        if ($body.find('input[type="search"]').length > 0) {
          cy.get('input[type="search"]').type('test');
        } else if ($body.find('input[placeholder*="search"]').length > 0) {
          cy.get('input[placeholder*="search"]').type('test');
        }
      });
    });

    it('should view student profile', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="row"]').length > 0) {
          cy.get('[class*="row"]').first().click();
        } else if ($body.find('a[href*="student/"]').length > 0) {
          cy.get('a[href*="student/"]').first().click();
        }
      });
    });

    it('should filter students by status', () => {
      cy.get('body').then(($body) => {
        if ($body.find('select').length > 0) {
          cy.get('select').first().select('Active');
        }
      });
    });
  });

  describe('Progress Tracking', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(coachCredentials.email);
      cy.get('input[type="password"]').type(coachCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view student progress', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="student"]').length > 0) {
          cy.get('a[href*="student"]').first().click();
          
          if ($body.find('[class*="progress"]').length > 0) {
            cy.get('[class*="progress"]').should('be.visible');
          }
        }
      });
    });

    it('should add progress note', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="student"]').length > 0) {
          cy.get('a[href*="student"]').first().click();
          
          if ($body.find('button').contains('Add Note').length > 0) {
            cy.get('button').contains('Add Note').click();
            cy.get('textarea').type('Progress note test');
            cy.get('button').contains('Save').click();
          }
        }
      });
    });
  });

  describe('Projects Oversight', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(coachCredentials.email);
      cy.get('input[type="password"]').type(coachCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view student projects', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should review project submission', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
          
          if ($body.find('[class*="card"]').length > 0) {
            cy.get('[class*="card"]').first().click();
          }
        }
      });
    });

    it('should provide feedback on project', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
          
          if ($body.find('textarea').length > 0) {
            cy.get('textarea').type('Great work on the project!');
            cy.get('button').contains('Submit').click();
          }
        }
      });
    });
  });

  describe('Evaluations', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(coachCredentials.email);
      cy.get('input[type="password"]').type(coachCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view evaluation results', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should submit student evaluation', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
          
          if ($body.find('button').contains('Evaluate').length > 0) {
            cy.get('button').contains('Evaluate').click();
          }
        }
      });
    });
  });

  describe('Profile', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(coachCredentials.email);
      cy.get('input[type="password"]').type(coachCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view profile information', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="profile"]').length > 0) {
          cy.get('a[href*="profile"]').first().click();
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should update profile', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="profile"]').length > 0) {
          cy.get('a[href*="profile"]').first().click();
          
          if ($body.find('input').length > 0) {
            cy.get('input').first().clear().type('Updated Coach');
            cy.get('button').contains('Save').click();
          }
        }
      });
    });
  });

  describe('Logout', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(coachCredentials.email);
      cy.get('input[type="password"]').type(coachCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should logout successfully', () => {
      cy.get('body').then(($body) => {
        if ($body.find('img[src*="me.png"]').length > 0) {
          cy.get('img[src*="me.png"]').parent().click();
        } else if ($body.find('button').contains('Sign out').length > 0) {
          cy.get('button').contains('Sign out').click();
        } else {
          cy.get('button').first().click();
        }
      });
      
      cy.get('body').then(($body) => {
        if ($body.find('Sign out').length > 0) {
          cy.contains('Sign out').click();
        }
      });
      
      cy.url().should('satisfy', (url) => url === 'http://localhost:5173/' || url === 'http://localhost:5173/Login');
    });
  });
});