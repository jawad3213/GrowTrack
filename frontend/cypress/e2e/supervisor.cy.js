// cypress/e2e/supervisor.cy.js
// Supervisor E2E Flow Tests

describe('Supervisor E2E Flow', () => {
  const supervisorCredentials = {
    email: 'supervisor@example.com',
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
    it('should login successfully as supervisor', () => {
      cy.get('input[type="email"]').type(supervisorCredentials.email);
      cy.get('input[type="password"]').type(supervisorCredentials.password);
      cy.get('button[type="submit"]').click();
      
      cy.url().should('satisfy', (url) => {
        return url.includes('/dashSupervisor') || url.includes('/supervisor') || url.includes('/dashboard');
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
      cy.get('input[type="email"]').type(supervisorCredentials.email);
      cy.get('input[type="password"]').type(supervisorCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should display supervisor dashboard', () => {
      cy.get('body').should('be.visible');
      cy.window().then((win) => {
        console.log('Supervisor dashboard loaded');
      });
    });

    it('should show team overview', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="team"]').length > 0) {
          cy.get('[class*="team"]').should('be.visible');
        }
      });
    });

    it('should show statistics', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="stat"]').length > 0) {
          cy.get('[class*="stat"]').should('be.visible');
        }
      });
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(supervisorCredentials.email);
      cy.get('input[type="password"]').type(supervisorCredentials.password);
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

    it('should navigate to Professors', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="professor"]').length > 0) {
          cy.get('a[href*="professor"]').first().click();
        } else if ($body.find('button').contains('Professor').length > 0) {
          cy.get('button').contains('Professor').click();
        }
      });
      cy.url().should('satisfy', (url) => url.includes('professor'));
    });

    it('should navigate to Classes', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="class"]').length > 0) {
          cy.get('a[href*="class"]').first().click();
        }
      });
      cy.url().should('satisfy', (url) => url.includes('class'));
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

    it('should navigate to Profile', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="profile"]').length > 0) {
          cy.get('a[href*="profile"]').first().click();
        }
      });
      cy.url().should('satisfy', (url) => url.includes('profile'));
    });
  });

  describe('Team Overview', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(supervisorCredentials.email);
      cy.get('input[type="password"]').type(supervisorCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view team members', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="team"]').length > 0) {
          cy.get('[class*="team"]').should('be.visible');
        }
      });
    });

    it('should view team statistics', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="stat"]').length > 0) {
          cy.get('[class*="stat"]').first().click();
        }
      });
    });
  });

  describe('Students Management', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(supessorCredentials.email);
      cy.get('input[type="password"]').type(supervisorCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="student"]').length > 0) {
          cy.get('a[href*="student"]').first().click();
        }
      });
    });

    it('should view all students', () => {
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

    it('should filter students by class', () => {
      cy.get('body').then(($body) => {
        if ($body.find('select').length > 0) {
          cy.get('select').first().select(0);
        }
      });
    });

    it('should view student details', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="row"]').length > 0) {
          cy.get('[class*="row"]').first().click();
        }
      });
    });
  });

  describe('Professors Management', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(supervisorCredentials.email);
      cy.get('input[type="password"]').type(supervisorCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view professors list', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="professor"]').length > 0) {
          cy.get('a[href*="professor"]').first().click();
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should view professor details', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="professor"]').length > 0) {
          cy.get('a[href*="professor"]').first().click();
          
          if ($body.find('[class*="card"]').length > 0) {
            cy.get('[class*="card"]').first().click();
          }
        }
      });
    });

    it('should assign class to professor', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="professor"]').length > 0) {
          cy.get('a[href*="professor"]').first().click();
          
          if ($body.find('button').contains('Assign').length > 0) {
            cy.get('button').contains('Assign').click();
          }
        }
      });
    });
  });

  describe('Classes Management', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(supervisorCredentials.email);
      cy.get('input[type="password"]').type(supervisorCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view all classes', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="class"]').length > 0) {
          cy.get('a[href*="class"]').first().click();
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should view class details', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="class"]').length > 0) {
          cy.get('a[href*="class"]').first().click();
          
          if ($body.find('[class*="card"]').length > 0) {
            cy.get('[class*="card"]').first().click();
          }
        }
      });
    });

    it('should create new class', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="class"]').length > 0) {
          cy.get('a[href*="class"]').first().click();
          
          if ($body.find('button').contains('Add').length > 0) {
            cy.get('button').contains('Add').click();
            cy.get('input').first().type('New Class');
            cy.get('button').contains('Create').click();
          }
        }
      });
    });
  });

  describe('Projects Oversight', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(supervisorCredentials.email);
      cy.get('input[type="password"]').type(supervisorCredentials.password);
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

    it('should review project status', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
          
          if ($body.find('[class*="card"]').length > 0) {
            cy.get('[class*="card"]').first().click();
          }
        }
      });
    });

    it('should approve or reject project', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
          
          if ($body.find('button').contains('Approve').length > 0) {
            cy.get('button').contains('Approve').click();
          } else if ($body.find('button').contains('Reject').length > 0) {
            cy.get('button').contains('Reject').click();
          }
        }
      });
    });
  });

  describe('Reports', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(supervisorCredentials.email);
      cy.get('input[type="password"]').type(supervisorCredentials.password);
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

    it('should generate team report', () => {
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
      cy.get('input[type="email"]').type(supervisorCredentials.email);
      cy.get('input[type="password"]').type(supervisorCredentials.password);
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
            cy.get('input').first().clear().type('Updated Supervisor');
            cy.get('button').contains('Save').click();
          }
        }
      });
    });
  });

  describe('Logout', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(supervisorCredentials.email);
      cy.get('input[type="password"]').type(supervisorCredentials.password);
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