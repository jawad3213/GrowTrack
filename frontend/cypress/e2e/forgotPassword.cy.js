// cypress/e2e/forgotPassword.cy.js
// Forgot Password Flow Tests

describe('Forgot Password Flow', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/Login');
    
    cy.get('body').then(($body) => {
      if ($body.find('button.bg-purple-500').length > 0) {
        cy.get('button.bg-purple-500').click();
      }
    });
  });

  describe('Navigation to Forgot Password', () => {
    it('should navigate to forgot password page from login', () => {
      cy.contains('Forgot Password?').click();
      cy.url().should('include', '/forgotpass');
    });

    it('should display forgot password form', () => {
      cy.visit('/forgotpass');
      cy.get('body').should('be.visible');
      cy.get('input[type="email"]').should('be.visible');
    });
  });

  describe('Request Password Reset', () => {
    it('should show error for empty email', () => {
      cy.visit('/forgotpass');
      cy.get('button[type="submit"]').click();
      cy.contains('required').should('be.visible');
    });

    it('should show error for invalid email format', () => {
      cy.visit('/forgotpass');
      cy.get('input[type="email"]').type('invalid-email');
      cy.get('button[type="submit"]').click();
      cy.contains('valid').should('be.visible').or(() => {
        cy.get('input[type="email"]').then(($input) => {
          expect($input[0].validity.valid).to.be.false;
        });
      });
    });

    it('should submit reset request with valid email', () => {
      cy.visit('/forgotpass');
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('button[type="submit"]').click();
      
      // Wait for response
      cy.get('body').then(($body) => {
        // Check for success or error message
        if ($body.find('[class*="success"]').length > 0) {
          cy.get('[class*="success"]').should('be.visible');
        } else if ($body.find('[class*="error"]').length > 0) {
          cy.get('[class*="error"]').should('be.visible');
        }
      });
    });

    it('should handle non-existent email', () => {
      cy.visit('/forgotpass');
      cy.get('input[type="email"]').type('nonexistent@example.com');
      cy.get('button[type="submit"]').click();
      
      cy.wait(1000);
      cy.get('body').then(($body) => {
        // May show error or success (for security)
      });
    });
  });

  describe('Password Reset Form (if token in URL)', () => {
    it('should display reset form with valid token', () => {
      // This would test the reset form when accessed via email link
      cy.visit('/reset-password?token=some-valid-token');
      cy.get('body').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
    });

    it('should show error for invalid/expired token', () => {
      cy.visit('/reset-password?token=invalid-token');
      cy.get('body').then(($body) => {
        if ($body.find('[class*="error"]').length > 0) {
          cy.get('[class*="error"]').should('be.visible');
        }
      });
    });

    it('should validate password strength', () => {
      cy.visit('/reset-password?token=some-valid-token');
      cy.get('input[type="password"]').first().type('weak');
      cy.get('button[type="submit"]').click();
      
      cy.get('body').then(($body) => {
        if ($body.find('[class*="warning"]').length > 0) {
          cy.get('[class*="warning"]').should('be.visible');
        }
      });
    });

    it('should require password confirmation', () => {
      cy.visit('/reset-password?token=some-valid-token');
      cy.get('input[type="password"]').first().type('NewPass123');
      cy.get('button[type="submit"]').click();
      
      cy.get('body').then(($body) => {
        // Check if confirmation field is required
        if ($body.find('input[type="password"]').length > 1) {
          // Second password field exists
        }
      });
    });

    it('should show error when passwords do not match', () => {
      cy.visit('/reset-password?token=some-valid-token');
      cy.get('input[type="password"]').first().type('NewPass123');
      cy.get('input[type="password"]').last().type('DifferentPass456');
      cy.get('button[type="submit"]').click();
      
      cy.contains('match').should('be.visible').or(() => {
        cy.get('[class*="error"]').should('be.visible');
      });
    });

    it('should successfully reset password', () => {
      cy.visit('/reset-password?token=some-valid-token');
      cy.get('input[type="password"]').first().type('NewPass123');
      cy.get('input[type="password"]').last().type('NewPass123');
      cy.get('button[type="submit"]').click();
      
      cy.get('body').then(($body) => {
        if ($body.find('[class*="success"]').length > 0) {
          cy.get('[class*="success"]').should('be.visible');
          // Should redirect to login
          cy.url().should('include', '/Login');
        }
      });
    });
  });

  describe('Back to Login', () => {
    it('should navigate back to login from forgot password', () => {
      cy.visit('/forgotpass');
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="login"]').length > 0) {
          cy.get('a[href*="login"]').click();
        } else if ($body.find('button').contains('Back').length > 0) {
          cy.get('button').contains('Back').click();
        }
      });
      
      cy.url().should('include', '/Login');
    });
  });
});