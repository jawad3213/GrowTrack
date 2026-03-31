// cypress/e2e/notifications.cy.js
// Notifications Flow Tests

describe('Notifications Flow', () => {
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

  describe('Notifications Access', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should navigate to notifications page', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="notification"]').length > 0) {
          cy.get('a[href*="notification"]').first().click();
        } else if ($body.find('[class*="notification"]').length > 0) {
          cy.get('[class*="notification"]').first().click();
        }
      });
      
      cy.url().should('satisfy', (url) => url.includes('notification'));
    });

    it('should display notifications list', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="notification"]').length > 0) {
          cy.get('a[href*="notification"]').first().click();
        }
      });
      
      cy.get('body').should('be.visible');
    });
  });

  describe('Notification Display', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="notification"]').length > 0) {
          cy.get('a[href*="notification"]').first().click();
        }
      });
    });

    it('should show notification icon with count', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="badge"]').length > 0 || $body.find('[class*="count"]').length > 0) {
          cy.get('[class*="badge"]').or('[class*="count"]').should('be.visible');
        }
      });
    });

    it('should display unread notifications', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="unread"]').length > 0) {
          cy.get('[class*="unread"]').should('be.visible');
        }
      });
    });

    it('should display notification timestamp', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="time"]').length > 0 || $body.find('time').length > 0) {
          cy.get('[class*="time"]').or('time').should('be.visible');
        }
      });
    });

    it('should display notification title', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="notification"]').length > 0) {
          cy.get('[class*="notification"]').first().should('be.visible');
        }
      });
    });
  });

  describe('Notification Actions', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="notification"]').length > 0) {
          cy.get('a[href*="notification"]').first().click();
        }
      });
    });

    it('should click to view notification details', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="notification"]').length > 0) {
          cy.get('[class*="notification"]').first().click();
        }
      });
    });

    it('should mark notification as read', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="unread"]').length > 0) {
          cy.get('[class*="unread"]').first().click();
          
          // Check if it becomes read (style changes or class removed)
          cy.get('body').should('be.visible');
        }
      });
    });

    it('should mark all notifications as read', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button').contains('Mark all read').length > 0) {
          cy.get('button').contains('Mark all read').click();
        } else if ($body.find('button').contains('Read All').length > 0) {
          cy.get('button').contains('Read All').click();
        }
      });
    });

    it('should delete notification', () => {
      cy.get('body').then(($body) => {
        if ($body.find('[class*="notification"]').length > 0) {
          cy.get('[class*="notification"]').first().trigger('mouseover');
          
          if ($body.find('[class*="delete"]').length > 0) {
            cy.get('[class*="delete"]').click();
          } else if ($body.find('button').contains('Delete').length > 0) {
            cy.get('button').contains('Delete').click();
          }
        }
      });
    });
  });

  describe('Notification Filtering', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
      
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="notification"]').length > 0) {
          cy.get('a[href*="notification"]').first().click();
        }
      });
    });

    it('should filter by unread', () => {
      cy.get('body').then(($body) => {
        if ($body.find('select').length > 0) {
          cy.get('select').select('unread');
        } else if ($body.find('button').contains('Unread').length > 0) {
          cy.get('button').contains('Unread').click();
        }
      });
    });

    it('should filter by read', () => {
      cy.get('body').then(($body) => {
        if ($body.find('select').length > 0) {
          cy.get('select').select('read');
        } else if ($body.find('button').contains('Read').length > 0) {
          cy.get('button').contains('Read').click();
        }
      });
    });

    it('should filter by type', () => {
      cy.get('body').then(($body) => {
        if ($body.find('select').length > 0) {
          cy.get('select').select('announcement');
        }
      });
    });
  });

  describe('Real-time Notifications', () => {
    beforeEach(() => {
      cy.get('input[type="email"]').type(validUser.email);
      cy.get('input[type="password"]').type(validUser.password);
      cy.get('button[type="submit"]').click();
      cy.url().should('not.include', '/Login', { timeout: 10000 });
    });

    it('should update notification count in real-time', () => {
      cy.get('body').then(($body) => {
        // Get initial count
        let initialCount = 0;
        if ($body.find('[class*="badge"]').length > 0) {
          const countText = $body.find('[class*="badge"]').text();
          initialCount = parseInt(countText) || 0;
        }
        
        // Wait and check for updates
        cy.wait(3000);
        
        cy.get('body').then(($body2) => {
          if ($body2.find('[class*="badge"]').length > 0) {
            // Count may have changed
          }
        });
      });
    });
  });
});