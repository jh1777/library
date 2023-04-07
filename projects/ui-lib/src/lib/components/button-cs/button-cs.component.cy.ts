
import { createOutputSpy } from 'cypress/angular';

import { ClarityModule } from '@clr/angular';
import { ButtonComponentCS } from './button-cs.component';

describe('ButtonComponent', () => {
  
  beforeEach(() => {
    var storeReference;
    cy.mount(ButtonComponentCS, {
        componentProperties: {
            onClick: createOutputSpy('buttonClickedSpy'),
            initializedCallBack: (s) => storeReference = s,
            label: "Reload",
            icon: "refresh",
            tooltip: "This is a Tooltip"
        }
    }).then((wrapper) => {
      return cy.wrap(wrapper).as("angular");
    })
  });

  it('Content check', () => {

    cy.get("@angular").then((wrapper) => {
      cy.get('clr-icon').should('exist');
      cy.get('.csgp-button-wrapper > div').should("have.text", "Reload").click();
      cy.get('@buttonClickedSpy').should('have.been.calledOnce');
    });

  });
  

  it('Style check / No Icon', () => {
    cy.mount(ButtonComponentCS, {
      componentProperties: {
          color: 'rgb(240, 20, 20)',
          label: 'Delete',
          disabled: false
      }
    });
    cy.get('clr-icon').should('not.exist');
    cy.get('.csgp-button-wrapper > div').should('exist');
    cy.get('.csgp-button-wrapper > div').should("have.css", "color", 'rgb(240, 20, 20)');
  });

  it('Href check', () => {
    cy.mount(ButtonComponentCS, {
      componentProperties: {
          href: "https://thisisnotaurl.cy.test",
          label: 'Delete',
          disabled: false
      },
    });
    cy.get('body').should('contain.html', '<a').should('contain.html', '</a>').should('contain.html', 'href="https://thisisnotaurl.cy.test"');
  });

  it('Disabled check', () => {
    cy.mount(ButtonComponentCS, {
      componentProperties: {
          label: 'Delete',
          color: 'rgb(240, 20, 20)',
          onClick: createOutputSpy('buttonClickedSpy'),
          disabled: true
      },
    });

    cy.get('.csgp-button-wrapper > div').click();
    cy.get('@buttonClickedSpy').should('not.have.been.called');
    cy.get('.csgp-button-wrapper > div').should("not.have.css", "color", 'rgb(240, 20, 20)');
  });

  it('Loading check', () => {
    cy.mount(ButtonComponentCS, {
      componentProperties: {
        isLoadingMessage: 'Loading...',
        isLoading: true,
      },
      imports: [ ClarityModule ]
    }).then((wrapper) => {
      return cy.wrap(wrapper).as("angular2");
    })
    cy.get("@angular2").then((wrapper) => {

      cy.get('.spinner').should('exist');
      cy.get('.csgp-button-wrapper > div').should("have.text", "Loading..."); 
    });
  });
})