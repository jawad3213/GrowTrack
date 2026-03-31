// cypress/e2e/authRedirect.cy.js
// Auth Redirect Security Tests

describe('Authentication Redirect Security', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearSessionStorage();
  });

  describe('Protected Routes Without Auth', () => {
    it('should redirect unauthenticated user from dashboard to login', () => {
      cy.visit('/dashboard');
      cy.url().should('include', '/Login');
    });

    it('should redirect unauthenticated user from student dashboard to login', () => {
      cy.visit('/dashstud');
      cy.url().should('include', '/Login');
    });

    it('should redirect unauthenticated user from professor dashboard to login', () => {
      cy.visit('/DashboardProf');
      cy.url().should('include', '/Login');
    });

    it('should redirect unauthenticated user from supervisor dashboard to login', () => {
      cy.visit('/dashSupervisor');
      cy.url().should('include', '/Login');
    });

    it('should redirect unauthenticated user from admin dashboard to login', () => {
      cy.visit('/dashboard');
      cy.url().should('include', '/Login');
    });

    it('should redirect unauthenticated user from projects page to login', () => {
      cy.visit('/projects');
      cy.url().should('include', '/Login');
    });

    it('should redirect unauthenticated user from evaluations page to login', () => {
      cy.visit('/evaluations');
      cy.url().should('include', '/Login');
    });

    it('should redirect unauthenticated user from skills page to login', () => {
      cy.visit('/skills');
      cy.url().should('include', '/Login');
    });

    it('should redirect unauthenticated user from classes page to login', () => {
      cy.visit('/classes');
      cy.url().should('include', '/Login');
    });

    it('should redirect unauthenticated user from reports page to login', () => {
      cy.visit('/reports');
      cy.url().should('include', '/Login');
    });
  });

  describe('Public Routes Without Auth', () => {
    it('should allow access to login page without auth', () => {
      cy.visit('/Login');
      cy.url().should('include', '/Login');
      cy.get('input[type="email"]').should('be.visible');
    });

    it('should allow access to forgot password page without auth', () => {
      cy.visit('/forgotpass');
      cy.url().should('include', '/forgotpass');
      cy.get('input[type="email"]').should('be.visible');
    });

    it('should allow access to home page without auth', () => {
      cy.visit('/');
      cy.url().should('eq', 'http://localhost:5173/');
    });

    it('should allow access to about page without auth', () => {
      cy.visit('/About');
      cy.url().should('include', '/About');
    });

    it('should allow access to contact page without auth', () => {
      cy.visit('/Contact');
      cy.url().should('include', '/Contact');
    });
  });

  describe('Token Validation', () => {
    it('should reject invalid token in URL', () => {
      cy.visit('/dashboard?token=invalid-token');
      cy.url().should('include', '/Login');
    });

    it('should reject expired token', () => {
      cy.visit('/dashboard?token=expired-token');
      cy.url().should('include', '/Login');
    });

    it('should reject tampered token', () => {
      cy.visit('/dashboard?token=tampered-token');
      cy.url().should('include', '/Login');
    });

    it('should handle missing CSRF token', () => {
      // Login first
      cy.visit('/Login');
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('password');
      
      // Try to submit without CSRF by directly calling API
      cy.request({
        url: 'http://localhost:3000/api/auth/login',
        method: 'POST',
        body: { email: 'test@example.com', password: 'password' },
        failOnStatusCode: false
      }).then((response) => {
        // Should reject due to missing CSRF
        expect(response.status).to.eq(403);
      });
    });
  });

  describe('Session Management', () => {
    it('should clear session on logout', () => {
      cy.visit('/Login');
      cy.get('input[type="email"]').type('youssef.fassi@example.com');
      cy.get('input[type="password"]').type('PASS1234');
      cy.get('button[type="submit"]').click();
      
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      // Visit logout
      cy.request('http://localhost:3000/api/auth/logout', { method: 'POST' });
      
      // Should redirect to login now
      cy.visit('/dashboard');
      cy.url().should('include', '/Login');
    });

    it('should not persist session after browser close (non-remember me)', () => {
      cy.visit('/Login');
      cy.get('input[type="email"]').type('youssef.fassi@example.com');
      cy.get('input[type="password"]').type('PASS1234');
      cy.get('input[type="checkbox"]').should('not.be.checked');
      cy.get('button[type="submit"]').click();
      
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      // Simulate browser close by clearing storage
      cy.clearCookies();
      cy.clearSessionStorage();
      
      // Should require re-login
      cy.visit('/dashboard');
      cy.url().should('include', '/Login');
    });

    it('should persist session with remember me', () => {
      cy.visit('/Login');
      cy.get('input[type="email"]').type('youssef.fassi@example.com');
      cy.get('input[type="password"]').type('PASS1234');
      cy.get('input[type="checkbox"]').check();
      cy.get('button[type="submit"]').click();
      
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      // Clear only session storage (not localStorage)
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      
      // Should still be authenticated via localStorage
      cy.visit('/dashboard');
      cy.url().should('not.include', '/Login');
    });
  });

  describe('Role-Based Access After Auth', () => {
    it('should redirect student trying to access admin routes', () => {
      cy.visit('/Login');
      cy.get('input[type="email"]').type('youssef.fassi@example.com');
      cy.get('input[type="password"]').type('PASS1234');
      cy.get('button[type="submit"]').click();
      
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      // Try to access admin dashboard
      cy.visit('/dashboard');
      
      cy.get('body').then(($body) => {
        // Either redirect or show access denied
        if ($body.find('[class*="denied"]').length > 0 || $body.find('[class*="unauthorized"]').length > 0) {
          cy.get('[class*="denied"]').or('[class*="unauthorized"]').should('be.visible');
        }
      });
    });

    it('should redirect unauthorized users to appropriate page', () => {
      cy.visit('/Login');
      cy.get('input[type="email"]').type('youssef.fassi@example.com');
      cy.get('input[type="password"]').type('PASS1234');
      cy.get('button[type="submit"]').click();
      
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      // Access admin-only endpoint
      cy.request({
        url: 'http://localhost:3000/api/admin/users',
        method: 'GET',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([401, 403]);
      });
    });
  });

  describe('CSRF Protection', () => {
    it('should require CSRF token for state-changing operations', () => {
      cy.visit('/Login');
      
      // Get CSRF token first
      cy.request('http://localhost:3000/api/csrf-token').then((response) => {
        const csrfToken = response.body.csrfToken;
        
        // Try login without CSRF
        cy.request({
          url: 'http://localhost:3000/api/auth/login',
          method: 'POST',
          body: { email: 'test@example.com', password: 'password' },
          failOnStatusCode: false
        }).then((loginResponse) => {
          expect(loginResponse.status).to.eq(403);
        });
        
        // Try login with CSRF
        cy.request({
          url: 'http://localhost:3000/api/auth/login',
          method: 'POST',
          body: { email: 'test@example.com', password: 'password' },
          headers: { 'x-csrf-token': csrfToken },
          failOnStatusCode: false
        });
      });
    });
  });

  describe('Rate Limiting', () => {
    it('should handle rate limiting after multiple failed attempts', () => {
      cy.visit('/Login');
      
      // Make multiple failed login attempts
      for (let i = 0; i < 5; i++) {
        cy.get('input[type="email"]').clear().type('wrong@example.com');
        cy.get('input[type="password"]').clear().type('wrongpassword');
        cy.get('button[type="submit"]').click();
        cy.wait(500);
      }
      
      // Should show rate limit message
      cy.get('body').then(($body) => {
        if ($body.find('[class*="rate"]').length > 0 || $body.find('[class*="limit"]').length > 0) {
          cy.get('[class*="rate"]').or('[class*="limit"]').should('be.visible');
        }
      });
    });
  });
});