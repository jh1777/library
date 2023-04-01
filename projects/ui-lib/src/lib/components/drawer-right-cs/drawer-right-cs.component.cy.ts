import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrawerRightComponentCS } from './drawer-right-cs.component';
import { DrawerRightStore } from './drawer-right-cs.component.store';

describe('DrawerComponent', () => {

  beforeEach(() => {
    cy.mount(DrawerRightComponentCS, {
        componentProperties: {
          drawerRightStore: new DrawerRightStore()
        },
        imports: [
            BrowserAnimationsModule, 
            BrowserModule
        ]        
    })
  });

  it('Shown check', () => {
    cy.get('#csgp-drawer').should('be.visible');
  })

  it('Hide check', () => {
    cy.get("body").realClick({ x: 100, y: 100 });
    cy.get('#csgp-drawer').should('not.be.visible');
  })

  it('Content check', () => {
    cy.get('#csgp-drawer-header').should('contains.text', "Drawer");
    cy.get('#csgp-drawer-description').should('contains.text', "Test drawer");
  })
})