import { createOutputSpy } from 'cypress/angular';
import { ComponentErrorModel } from '../../models/shared/component-error.model';
import { PropertyEntryComponent } from './property-entry.component';

describe('PropertyEntryComponent', () => {


  const testErrorModel = new ComponentErrorModel({
    hasError: true,
    message: "Error message that is shown!",
    showLink: true
  })
  
  beforeEach(() => {
    cy.mount(PropertyEntryComponent, {
      componentProperties: {
        label: "Onboarding State",
        subtitle: "Timestamp",
        value: "Completed",
        valueStyle: 'color: rgb(6, 156, 21); font-weight: 700;',
        valueSubtitle: "20.03.2023T12:23:45Z"
      }
    });
  });

  it('Loading check', () => {
    cy.mount(PropertyEntryComponent, {
        componentProperties: {
            isLoading: true
          }
    });
    cy.get('.csgp-propertyentry-container-left > :nth-child(1)').should('contain.text', '◼︎◼︎');
  })

  it('Content check', () => {
    cy.mount(PropertyEntryComponent, {
        componentProperties: {
            isLoading: false
        }
    });
    cy.get('.csgp-propertyentry-container-left > .header-text').should('contain.text', "Onboarding State");
    cy.get('.csgp-propertyentry-container-left > .subtitle').should('contain.text', "Timestamp");
    cy.get('.csgp-propertyentry-container-right > .header-text').should('contain.text', "Completed");
    cy.get('.csgp-propertyentry-container-right > .subtitle').should('contain.text', "20.03.2023T12:23:45Z");
    cy.get('.csgp-propertyentry-container-right > .header-text').should('have.css', 'color', 'rgb(6, 156, 21)');
  })

  it('Error overlay check', () => {
    cy.mount(PropertyEntryComponent, {
        componentProperties: {
            isLoading: true,
            errorData: testErrorModel,
            onErrorClick: createOutputSpy('errorClickedSpy'),
        }
    });
    cy.get('.error-overlay > :nth-child(1)').should('have.text', testErrorModel.message);
    cy.get('.error-overlay').should('be.visible');
    cy.get('.error-link').should('be.visible').click();
    cy.get('@errorClickedSpy').should('have.been.calledWith', testErrorModel);
  })
})