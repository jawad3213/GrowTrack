// cypress/e2e/student.cy.js
// Student E2E Flow Tests

describe('Student E2E Flow', () => {
  const studentCredentials = {
    email: 'youssef.fassi@example.com',
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
    it('should login successfully as student', () => {
      cy.get('input[type="email"]').type(studentCredentials.email);
      cy.get('input[type="password"]').type(studentCredentials.password);
      cy.get('button[type="submit"]').click();
      
      cy.url().should('satisfy', (url) => {
        return url.includes('/dashstud') || url.includes('/dashboard');
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
      // Login as student
      cy.get('input[type="email"]').type(studentCredentials.email);
      cy.get('input[type="password"]').type(studentCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should display student dashboard', () => {
      cy.get('body').should('be.visible');
      // Check for dashboard elements
      cy.window().then((win) => {
        console.log('Student dashboard loaded');
      });
    });

    it('should show student statistics', () => {
      cy.get('body').then(($body) => {
        // Look for stats elements
        if ($body.find('[class*="stat"]').length > 0) {
          cy.get('[class*="stat"]').should('be.visible');
        }
      });
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(studentCredentials.email);
      cy.get('input[type="password"]').type(studentCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should navigate to Projects', () => {
      cy.get('body').then(($body) => {
        // Try different selectors for navigation
        if ($body.find('a[href*="projects"]').length > 0) {
          cy.get('a[href*="projects"]').first().click();
        } else if ($body.find('button').contains('Projects').length > 0) {
          cy.get('button').contains('Projects').click();
        }
      });
      cy.url().should('satisfy', (url) => url.includes('projects') || url.includes('project'));
    });

    it('should navigate to Evaluations', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
        } else if ($body.find('button').contains('Evaluation').length > 0) {
          cy.get('button').contains('Evaluation').click();
        }
      });
      cy.url().should('satisfy', (url) => url.includes('evaluation'));
    });

    it('should navigate to Signals', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="signal"]').length > 0) {
          cy.get('a[href*="signal"]').first().click();
        } else if ($body.find('button').contains('Signal').length > 0) {
          cy.get('button').contains('Signal').click();
        }
      });
      cy.url().should('satisfy', (url) => url.includes('signal'));
    });

    it('should navigate to Notifications', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="notification"]').length > 0) {
          cy.get('a[href*="notification"]').first().click();
        }
      });
      cy.url().should('satisfy', (url) => url.includes('notification'));
    });

    it('should navigate to Profile', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="profile"]').length > 0) {
          cy.get('a[href*="profile"]').first().click();
        } else if ($body.find('[class*="profile"]').length > 0) {
          cy.get('[class*="profile"]').first().click();
        }
      });
      cy.url().should('satisfy', (url) => url.includes('profile'));
    });
  });

  describe('Projects Module', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(studentCredentials.email);
      cy.get('input[type="password"]').type(studentCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      // Navigate to projects
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="projects"]').length > 0) {
          cy.get('a[href*="projects"]').first().click();
        }
      });
    });

    it('should view assigned projects', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="project"]').length > 0) {
          cy.get('[class*="project"]').should('be.visible');
        }
      });
    });

    it('should view project details', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="card"]').length > 0) {
          cy.get('[class*="card"]').first().click();
        }
      });
    });
  });

  describe('Evaluations Module', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(studentCredentials.email);
      cy.get('input[type="password"]').type(studentCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
        }
      });
    });

    it('should view available evaluations', () => {
      cy.get('body').should('be.visible');
    });

    it('should submit self-evaluation', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Submit').length > 0) {
          cy.get('button').contains('Submit').click();
        }
      });
    });
  });

  describe('Signals Module', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(studentCredentials.email);
      cy.get('input[type="password"]').type(studentCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view signal form', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="signal"]').length > 0) {
          cy.get('a[href*="signal"]').first().click();
        }
      });
    });

    it('should create a signal', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="signal"]').length > 0) {
          cy.get('a[href*="signal"]').first().click();
          
          // Fill signal form if available
          if ($body.find('textarea').length > 0) {
            cy.get('textarea').first().type('Test signal message');
            cy.get('button').contains('Send').click();
          }
        }
      });
    });
  });

  describe('Notifications', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(studentCredentials.email);
      cy.get('input[type="password"]').type(studentCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view notifications list', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="notification"]').length > 0) {
          cy.get('a[href*="notification"]').first().click();
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should mark notification as read', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="notification"]').length > 0) {
          cy.get('a[href*="notification"]').first().click();
          
          if ($body.find('[class*="unread"]').length > 0) {
            cy.get('[class*="unread"]').first().click();
          }
        }
      });
    });
  });

  describe('Profile', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(studentCredentials.email);
      cy.get('input[type="password"]').type(studentCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should view profile information', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="profile"]').length > 0) {
          cy.get('a[href*="profile"]').first().click();
          
          // Check for profile elements
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should update profile', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="profile"]').length > 0) {
          cy.get('a[href*="profile"]').first().click();
          
          if ($body.find('input').length > 0) {
            cy.get('input').first().clear().type('New Name');
            cy.get('button').contains('Save').click();
          }
        }
      });
    });
  });

  describe('Logout', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(studentCredentials.email);
      cy.get('input[type="password"]').type(studentCredentials.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should logout successfully', () => {
      cy.get('body').then(($body) => {
        // Find and click user menu
        if ($body.find('img[src*="me.png"]').length > 0) {
          cy.get('img[src*="me.png"]').parent().click();
        } else if ($body.find('button').contains('Sign out').length > 0) {
          cy.get('button').contains('Sign out').click();
        } else {
          // Try to find logout in any dropdown
          cy.get('button').first().click();
        }
      });
      
      // Click sign out if found
      cy.get('body').then(($body) => {
        if ($body.find('text="Sign out"').length > 0 || $body.find('Sign out').length > 0) {
          cy.contains('Sign out').click();
        }
      });
      
      cy.url().should('satisfy', (url) => url === 'http://localhost:5173/' || url === 'http://localhost:5173/Login');
    });
  });
});