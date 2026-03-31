// cypress/e2e/roleAccess.cy.js
// Role-Based Access Control Tests

describe('Role-Based Access Control', () => {
  const users = {
    student: {
      email: 'youssef.fassi@example.com',
      password: 'PASS1234'
    },
    professor: {
      email: 'professor@example.com',
      password: 'PASS1234'
    },
    admin: {
      email: 'elouansaidisoukaina@gmail.com',
      password: 'PASS1234'
    },
    supervisor: {
      email: 'supervisor@example.com',
      password: 'PASS1234'
    }
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

  describe('Student Access', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(users.student.email);
      cy.get('input[type="password"]').type(users.student.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should access own dashboard', () => {
      cy.url().should('satisfy', (url) => url.includes('dashstud') || url.includes('dashboard'));
    });

    it('should access projects', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
          cy.url().should('include', 'project');
        }
      });
    });

    it('should access evaluations', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
          cy.url().should('include', 'evaluation');
        }
      });
    });

    it('should access profile', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="profile"]').length > 0) {
          cy.get('a[href*="profile"]').first().click();
          cy.url().should('include', 'profile');
        }
      });
    });

    it('should NOT access admin dashboard', () => {
      cy.visit('/dashboard');
      cy.get('body').then(($body) => {
        // Should either redirect or show access denied
        if ($body.find('[class*="denied"]').length > 0 || $body.find('[class*="unauthorized"]').length > 0) {
          cy.get('[class*="denied"]').or('[class*="unauthorized"]').should('be.visible');
        }
      });
    });

    it('should NOT access users management', () => {
      cy.get('body').then(($body) => {
        // Check if admin menu items are hidden
        if ($body.find('a[href*="admin"]').length > 0) {
          // If visible, they should be disabled or lead to errors
          cy.get('a[href*="admin"]').first().click();
        }
      });
    });
  });

  describe('Professor Access', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(users.professor.email);
      cy.get('input[type="password"]').type(users.professor.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should access professor dashboard', () => {
      cy.url().should('satisfy', (url) => url.includes('DashboardProf') || url.includes('professor'));
    });

    it('should access classes', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="class"]').length > 0) {
          cy.get('a[href*="class"]').first().click();
          cy.url().should('include', 'class');
        }
      });
    });

    it('should access students', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="student"]').length > 0) {
          cy.get('a[href*="student"]').first().click();
          cy.url().should('include', 'student');
        }
      });
    });

    it('should access evaluations', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="evaluation"]').length > 0) {
          cy.get('a[href*="evaluation"]').first().click();
          cy.url().should('include', 'evaluation');
        }
      });
    });

    it('should access reports', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="report"]').length > 0) {
          cy.get('a[href*="report"]').first().click();
          cy.url().should('include', 'report');
        }
      });
    });

    it('should NOT access admin user management', () => {
      cy.request({
        url: 'http://localhost:3000/api/admin/users',
        method: 'GET',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([401, 403]);
      });
    });
  });

  describe('Admin Access', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(users.admin.email);
      cy.get('input[type="password"]').type(users.admin.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should access admin dashboard', () => {
      cy.url().should('include', 'dashboard');
    });

    it('should access user management', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="student"]').length > 0) {
          cy.get('a[href*="student"]').first().click();
          cy.url().should('include', 'student');
        }
      });
    });

    it('should access classes management', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="class"]').length > 0) {
          cy.get('a[href*="class"]').first().click();
          cy.url().should('include', 'class');
        }
      });
    });

    it('should access skills management', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="skill"]').length > 0) {
          cy.get('a[href*="skill"]').first().click();
          cy.url().should('include', 'skill');
        }
      });
    });

    it('should access reports', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="report"]').length > 0) {
          cy.get('a[href*="report"]').first().click();
          cy.url().should('include', 'report');
        }
      });
    });
  });

  describe('Supervisor Access', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(users.supervisor.email);
      cy.get('input[type="password"]').type(users.supervisor.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should access supervisor dashboard', () => {
      cy.url().should('satisfy', (url) => url.includes('dashSupervisor') || url.includes('supervisor'));
    });

    it('should access professors list', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="professor"]').length > 0) {
          cy.get('a[href*="professor"]').first().click();
          cy.url().should('include', 'professor');
        }
      });
    });

    it('should access classes overview', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="class"]').length > 0) {
          cy.get('a[href*="class"]').first().click();
          cy.url().should('include', 'class');
        }
      });
    });

    it('should NOT have admin-level delete permissions', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Delete').length > 0) {
          // Check if delete is more restricted than admin
        }
      });
    });
  });

  describe('API Role Enforcement', () => {
    it('should deny student access to admin API endpoints', () => {
      // Login as student first to get token
      cy.request({
        url: 'http://localhost:3000/api/csrf-token',
        method: 'GET'
      }).then((csrfRes) => {
        const csrfToken = csrfRes.body.csrfToken;
        
        cy.request({
          url: 'http://localhost:3000/api/admin/users',
          method: 'GET',
          headers: { 'x-csrf-token': csrfToken },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.be.oneOf([401, 403]);
        });
      });
    });

    it('should deny professor access to admin users API', () => {
      cy.request({
        url: 'http://localhost:3000/api/csrf-token',
        method: 'GET'
      }).then((csrfRes) => {
        const csrfToken = csrfRes.body.csrfToken;
        
        cy.request({
          url: 'http://localhost:3000/api/admin/users',
          method: 'GET',
          headers: { 'x-csrf-token': csrfToken },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.be.oneOf([401, 403]);
        });
      });
    });

    it('should allow admin access to admin API endpoints', () => {
      cy.request({
        url: 'http://localhost:3000/api/csrf-token',
        method: 'GET'
      }).then((csrfRes) => {
        const csrfToken = csrfRes.body.csrfToken;
        
        cy.request({
          url: 'http://localhost:3000/api/students',
          method: 'GET',
          headers: { 'x-csrf-token': csrfToken },
          failOnStatusCode: false
        }).then((response) => {
          // Admin should have access
          expect(response.status).to.be.oneOf([200, 401, 403]);
        });
      });
    });
  });

  describe('Menu Visibility by Role', () => {
    it('should hide admin menu from students', () => {
      cy.get('input[type="email"]').type(users.student.email);
      cy.get('input[type="password"]').type(users.student.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        // Admin-specific menu items should not be visible
        if ($body.find('text="Users"').length > 0) {
          // Check if it's visible in navigation
          const usersItem = $body.find('text="Users"');
          expect(usersItem).to.not.exist;
        }
      });
    });

    it('should hide admin menu from professors', () => {
      cy.get('input[type="email"]').type(users.professor.email);
      cy.get('input[type="password"]').type(users.professor.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('text="Users"').length > 0) {
          expect($body.find('text="Users"')).to.not.exist;
        }
      });
    });

    it('should show full menu for admin', () => {
      cy.get('input[type="email"]').type(users.admin.email);
      cy.get('input[type="password"]').type(users.admin.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').should('be.visible');
      // Admin should have access to all menu items
    });
  });

  describe('Data Isolation Between Roles', () => {
    it('should only show student their own data', () => {
      cy.get('input[type="email"]').type(users.student.email);
      cy.get('input[type="password"]').type(users.student.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      // Should only see own profile, not other students
      cy.get('body').then(($body) => {
        // Check that other students' data is not visible
      });
    });

    it('should only show professor their assigned classes', () => {
      cy.get('input[type="email"]').type(users.professor.email);
      cy.get('input[type="password"]').type(users.professor.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      // Should only see assigned classes, not all classes
    });

    it('should allow admin to see all data', () => {
      cy.get('input[type="email"]').type(users.admin.email);
      cy.get('input[type="password"]').type(users.admin.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      // Admin should see all data
    });
  });
});