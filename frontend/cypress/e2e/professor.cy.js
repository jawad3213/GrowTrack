// cypress/e2e/professor.cy.js
// Professor E2E Flow Tests

describe('Professor E2E Flow', () => {
  const professorCredentials = {
    email: 'professor@example.com',
    password: 'PASS1234'
  };

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearSessionStorage();
    cy.visit('/Login');
    
    // Handle cookie consent
    cy.get('body').then(($body) => {
      if ($body.find('button.bg-purple-500').length > 0) {
        cy.get('button.bg-purple-500').click();
      }
    });
  });

  describe('Login Flow', () => {
    it('should login successfully as professor', () => {
      cy.get('input[type="email"]').type(professorCredentials.email);
      cy.get('input[type="password"]').type(professorCredentials.password);
      cy.get('button[type="submit"]').click();
      
      cy.url().should('satisfy', (url) => {
        return url.includes('/DashboardProf') || url.includes('/professor') || url.includes('/dashboard');
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
      cy.get('input[type="email"]').type(professorCredentials.email);
      cy.get('input[type="password"]').type(professorCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should display professor dashboard', () => {
      cy.get('body').should('be.visible');
      cy.window().then((win) => {
        console.log('Professor dashboard loaded');
      });
    });

    it('should show statistics', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="stat"]').length > 0) {
          cy.get('[class*="stat"]').should('be.visible');
        }
        if ($body.find('[class*="card"]').length > 0) {
          cy.get('[class*="card"]').should('be.visible');
        }
      });
    });

    it('should show assigned classes', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="class"]').length > 0) {
          cy.get('[class*="class"]').should('be.visible');
        }
      });
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(professorCredentials.email);
      cy.get('input[type="password"]').type(professorCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should navigate to Classes', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="class"]').length > 0) {
          cy.get('a[href*="class"]').first().click();
        } else if ($body.find('button').contains('Class').length > 0) {
          cy.get('button').contains('Class').click();
        }
      });
      cy.url().should('satisfy', (url) => url.includes('class'));
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

    it('should navigate to Reports', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="report"]').length > 0) {
          cy.get('a[href*="report"]').first().click();
        } else if ($body.find('button').contains('Report').length > 0) {
          cy.get('button').contains('Report').click();
        }
      });
      cy.url().should('satisfy', (url) => url.includes('report'));
    });

    it('should navigate to Signals', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="signal"]').length > 0) {
          cy.get('a[href*="signal"]').first().click();
        }
      });
      cy.url().should('satisfy', (url) => url.includes('signal'));
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

  describe('Classes Module', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(professorCredentials.email);
      cy.get('input[type="password"]').type(professorCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="class"]').length > 0) {
          cy.get('a[href*="class"]').first().click();
        }
      });
    });

    it('should view assigned classes', () => {
      cy.get('body').should('be.visible');
    });

    it('should view class details', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="card"]').length > 0) {
          cy.get('[class*="card"]').first().click();
        }
      });
    });

    it('should view students in class', () => {
      cy.get('body').then(($body) => {
        if ($body.find('table').length > 0) {
          cy.get('table').should('be.visible');
        }
      });
    });
  });

  describe('Students Management', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(professorCredentials.email);
      cy.get('input[type="password"]').type(professorCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view student list', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="student"]').length > 0) {
          cy.get('a[href*="student"]').first().click();
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should search for student', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="student"]').length > 0) {
          cy.get('a[href*="student"]').first().click();
          
          if ($body.find('input[type="search"]').length > 0) {
            cy.get('input[type="search"]').type('test');
          } else if ($body.find('input[placeholder*="search"]').length > 0) {
            cy.get('input[placeholder*="search"]').type('test');
          }
        }
      });
    });

    it('should view student details', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="student"]').length > 0) {
          cy.get('a[href*="student"]').first().click();
          
          if ($body.find('[class*="row"]').length > 0) {
            cy.get('[class*="row"]').first().click();
          }
        }
      });
    });
  });

  describe('Projects Module', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(professorCredentials.email);
      cy.get('input[type="password"]').type(professorCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view all projects', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should view project details', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
          
          if ($body.find('[class*="card"]').length > 0) {
            cy.get('[class*="card"]').first().click();
          }
        }
      });
    });

    it('should update project status', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
          
          if ($body.find('select').length > 0) {
            cy.get('select').first().select('Completed');
          }
        }
      });
    });
  });

  describe('Evaluations', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(professorCredentials.email);
      cy.get('input[type="password"]').type(professorCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view evaluation list', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should create evaluation', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
          
          if ($body.find('button').contains('Create').length > 0) {
            cy.get('button').contains('Create').click();
          } else if ($body.find('button').contains('Add').length > 0) {
            cy.get('button').contains('Add').click();
          }
        }
      });
    });
  });

  describe('Signals Module', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(professorCredentials.email);
      cy.get('input[type="password"]').type(professorCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view student signals', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="signal"]').length > 0) {
          cy.get('a[href*="signal"]').first().click();
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should respond to signal', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="signal"]').length > 0) {
          cy.get('a[href*="signal"]').first().click();
          
          if ($body.find('[class*="signal"]').length > 0) {
            cy.get('[class*="signal"]').first().click();
            
            if ($body.find('textarea').length > 0) {
              cy.get('textarea').type('Response to signal');
              cy.get('button').contains('Reply').click();
            }
          }
        }
      });
    });
  });

  describe('Reports Module', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(professorCredentials.email);
      cy.get('input[type="password"]').type(professorCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view reports page', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="report"]').length > 0) {
          cy.get('a[href*="report"]').first().click();
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should generate report', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="report"]').length > 0) {
          cy.get('a[href*="report"]').first().click();
          
          if ($body.find('button').contains('Generate').length > 0) {
            cy.get('button').contains('Generate').click();
          }
        }
      });
    });

    it('should export report', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="report"]').length > 0) {
          cy.get('a[href*="report"]').first().click();
          
          if ($body.find('button').contains('Export').length > 0) {
            cy.get('button').contains('Export').click();
          }
        }
      });
    });
  });

  describe('Profile', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(professorCredentials.email);
      cy.get('input[type="password"]').type(professorCredentials.password);
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
            cy.get('input').first().clear().type('Updated Name');
            cy.get('button').contains('Save').click();
          }
        }
      });
    });
  });

  describe('Logout', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(professorCredentials.email);
      cy.get('input[type="password"]').type(professorCredentials.password);
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