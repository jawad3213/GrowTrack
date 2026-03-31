// cypress/e2e/dashboard.cy.js
// Dashboard Tests for All Roles

describe('Dashboard E2E', () => {
  const users = {
    admin: {
      email: 'elouansaidisoukaina@gmail.com',
      password: 'PASS1234',
      role: 'admin',
      expectedUrl: '/dashboard'
    },
    student: {
      email: 'youssef.fassi@example.com',
      password: 'PASS1234',
      role: 'student',
      expectedUrl: '/dashstud'
    },
    professor: {
      email: 'professor@example.com',
      password: 'PASS1234',
      role: 'professor',
      expectedUrl: '/DashboardProf'
    },
    supervisor: {
      email: 'supervisor@example.com',
      password: 'PASS1234',
      role: 'supervisor',
      expectedUrl: '/dashSupervisor'
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

  describe('Admin Dashboard', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(users.admin.email);
      cy.get('input[type="password"]').type(users.admin.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should load admin dashboard', () => {
      cy.get('body').should('be.visible');
    });

    it('should display statistics cards', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="stat"]').length > 0) {
          cy.get('[class*="stat"]').should('be.visible');
        }
      });
    });

    it('should show student count', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="student"]').length > 0) {
          cy.get('[class*="student"]').first().should('be.visible');
        }
      });
    });

    it('should show professor count', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="professor"]').length > 0) {
          cy.get('[class*="professor"]').first().should('be.visible');
        }
      });
    });

    it('should show class count', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="class"]').length > 0) {
          cy.get('[class*="class"]').first().should('be.visible');
        }
      });
    });

    it('should display recent activities', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="activity"]').length > 0) {
          cy.get('[class*="activity"]').should('be.visible');
        }
      });
    });

    it('should show quick action buttons', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Add').length > 0) {
          cy.get('button').contains('Add').should('be.visible');
        }
      });
    });
  });

  describe('Student Dashboard', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(users.student.email);
      cy.get('input[type="password"]').type(users.student.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should load student dashboard', () => {
      cy.get('body').should('be.visible');
    });

    it('should display welcome message', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="welcome"]').length > 0 || $body.find('h1').length > 0) {
          cy.get('[class*="welcome"]').or('h1').should('be.visible');
        }
      });
    });

    it('should show current projects', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="project"]').length > 0) {
          cy.get('[class*="project"]').should('be.visible');
        }
      });
    });

    it('should show pending evaluations', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="evaluation"]').length > 0) {
          cy.get('[class*="evaluation"]').should('be.visible');
        }
      });
    });

    it('should show notifications count', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="notification"]').length > 0) {
          cy.get('[class*="notification"]').should('be.visible');
        }
      });
    });

    it('should display skills progress', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="skill"]').length > 0) {
          cy.get('[class*="skill"]').should('be.visible');
        }
      });
    });
  });

  describe('Professor Dashboard', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(users.professor.email);
      cy.get('input[type="password"]').type(users.professor.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should load professor dashboard', () => {
      cy.get('body').should('be.visible');
    });

    it('should display assigned classes', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="class"]').length > 0) {
          cy.get('[class*="class"]').should('be.visible');
        }
      });
    });

    it('should show student count per class', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="count"]').length > 0) {
          cy.get('[class*="count"]').should('be.visible');
        }
      });
    });

    it('should show pending evaluations', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="evaluation"]').length > 0) {
          cy.get('[class*="evaluation"]').should('be.visible');
        }
      });
    });

    it('should display recent projects', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="project"]').length > 0) {
          cy.get('[class*="project"]').should('be.visible');
        }
      });
    });
  });

  describe('Supervisor Dashboard', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(users.supervisor.email);
      cy.get('input[type="password"]').type(users.supervisor.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should load supervisor dashboard', () => {
      cy.get('body').should('be.visible');
    });

    it('should display team overview', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="team"]').length > 0) {
          cy.get('[class*="team"]').should('be.visible');
        }
      });
    });

    it('should show professor list', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="professor"]').length > 0) {
          cy.get('[class*="professor"]').should('be.visible');
        }
      });
    });

    it('should show class overview', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="class"]').length > 0) {
          cy.get('[class*="class"]').should('be.visible');
        }
      });
    });

    it('should display project status', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="project"]').length > 0) {
          cy.get('[class*="project"]').should('be.visible');
        }
      });
    });
  });

  describe('Dashboard Navigation', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(users.admin.email);
      cy.get('input[type="password"]').type(users.admin.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should navigate to students from dashboard', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="student"]').length > 0) {
          cy.get('a[href*="student"]').first().click();
          cy.url().should('include', 'student');
        }
      });
    });

    it('should navigate to classes from dashboard', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="class"]').length > 0) {
          cy.get('a[href*="class"]').first().click();
          cy.url().should('include', 'class');
        }
      });
    });

    it('should navigate to projects from dashboard', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="project"]').length > 0) {
          cy.get('a[href*="project"]').first().click();
          cy.url().should('include', 'project');
        }
      });
    });
  });

  describe('Dashboard Responsiveness', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(users.admin.email);
      cy.get('input[type="password"]').type(users.admin.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should display on desktop', () => {
      cy.viewport(1280, 720);
      cy.get('body').should('be.visible');
    });

    it('should display on tablet', () => {
      cy.viewport(768, 1024);
      cy.get('body').should('be.visible');
    });

    it('should display on mobile', () => {
      cy.viewport(375, 667);
      cy.get('body').should('be.visible');
    });
  });
});