
import { ClarityModule } from '@clr/angular';
import { createOutputSpy } from 'cypress/angular';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  
  beforeEach(() => {
    cy.mount(ButtonComponent, {
        componentProperties: {
            onClick: createOutputSpy('buttonClickedSpy'),
            data: {
              iconSize: 20,
              label: "Reload",
              icon: "cpu",
              isLoading: false,
              disabled: false,
              filledStyle: false
            }
        },
        imports: [ ClarityModule ]
    })
  });


  it('Content check', () => {

    cy.get('clr-icon').should('exist');
    cy.get('.csgp-button-wrapper > div').should("have.text", "Reload").click();
    cy.get('@buttonClickedSpy').should('have.been.calledOnce');
  });

  it('Style check / No Icon', () => {
    cy.mount(ButtonComponent, {
      componentProperties: {
        data: {
          color: 'rgb(240, 20, 20)',
          label: 'Delete',
          disabled: false,
          isLoading: false,
          filledStyle: false,
          iconSize: 20
        }
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
        data: {
          href: "https://thisisnotaurl.cy.test",
          label: 'Delete',
          disabled: false,
          isLoading: false,
          filledStyle: false,
          iconSize: 20
        }
      },
      imports: [ ClarityModule ]
    });
    cy.get('body').should('contain.html', '<a').should('contain.html', '</a>').should('contain.html', 'href="https://thisisnotaurl.cy.test"');
  });

  it('Disabled check', () => {
    cy.mount(ButtonComponent, {
      componentProperties: {
        onClick: createOutputSpy('buttonClickedSpy'),
        data: {
          label: 'Delete',
          color: 'rgb(240, 20, 20)',
          disabled: true,
          isLoading: false,
          filledStyle: false,
          iconSize: 20
        }
      },
      imports: [ ClarityModule ]
    });

    cy.get('.csgp-button-wrapper > div').click();
    cy.get('@buttonClickedSpy').should('not.have.been.called');
    cy.get('.csgp-button-wrapper > div').should("not.have.css", "color", 'rgb(240, 20, 20)');
  });


  it('Loading check', () => {
    cy.mount(ButtonComponent, {
      componentProperties: {
        data: {
          label: '',
          isLoadingMessage: 'Loading...',
          disabled: false,
          isLoading: true,
          filledStyle: false,
          iconSize: 20
        }
      },
      imports: [ ClarityModule ]
    });
    cy.get('.spinner').should('exist');
    cy.get('.csgp-button-wrapper > div').should("have.text", "Loading..."); 
  });
});