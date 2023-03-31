
import { ClarityModule } from '@clr/angular';
import { createOutputSpy } from 'cypress/angular';

import { ButtonComponent } from './button.component';
import { ButtonStore } from './button.component.store';

describe('ButtonComponent', () => {
  
  beforeEach(() => {
    cy.mount(ButtonComponent, {
        componentProperties: {
            onClick: createOutputSpy('buttonClickedSpy'),
        },
        imports: [ ClarityModule ],
        providers: [ ButtonStore ]
        
    })
    //   .then((wrapper) => {
    //   console.log({ wrapper });
    //   debugger;
    //   wrapper.component.buttonStore.setContent("refresh", "Reload", "This is a Tooltip"); 
    //   cy.get('.csgp-button-wrapper > div').should("have.text", "Reload");
    //   return cy.wrap(wrapper).as('angular')
    // })
  });

  it('Content check', () => {
    cy.window().then((w: any) => {
      const store = w.document.buttonStore;
      w.buttonStore.setContent("refresh", "Reload", "This is a Tooltip"); 
    });
    //cy.get('clr-icon').should('exist');
    //cy.get('.csgp-button-wrapper > div').should("have.text", "Reload").click();
    //cy.get('@buttonClickedSpy').should('have.been.calledOnce');
  });
/*
  it('Style check / No Icon', () => {
    cy.mount(ButtonComponent, {
      componentProperties: {
          color: 'rgb(240, 20, 20)',
          label: 'Delete',
          disabled: false
      },
      imports: [ ClarityModule ]
    });
    cy.get('clr-icon').should('not.exist');
    cy.get('.csgp-button-wrapper > div').should('exist');
    cy.get('.csgp-button-wrapper > div').should("have.css", "color", 'rgb(240, 20, 20)');
  });

  it('Href check', () => {
    cy.mount(ButtonComponent, {
      componentProperties: {
          href: "https://thisisnotaurl.cy.test",
          label: 'Delete',
          disabled: false
      },
      imports: [ ClarityModule ]
    });
    cy.get('body').should('contain.html', '<a').should('contain.html', '</a>').should('contain.html', 'href="https://thisisnotaurl.cy.test"');
  });

  it('Disabled check', () => {
    cy.mount(ButtonComponent, {
      componentProperties: {
          label: 'Delete',
          color: 'rgb(240, 20, 20)',
          onClick: createOutputSpy('buttonClickedSpy'),
          disabled: true
      },
      imports: [ ClarityModule ]
    });

    cy.get('.csgp-button-wrapper > div').click();
    cy.get('@buttonClickedSpy').should('not.have.been.called');
    cy.get('.csgp-button-wrapper > div').should("not.have.css", "color", 'rgb(240, 20, 20)');
  });
*/
});
