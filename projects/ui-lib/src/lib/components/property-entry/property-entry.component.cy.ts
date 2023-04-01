import { createOutputSpy } from 'cypress/angular';
import { ComponentErrorModel } from '../../models/shared/component-error.model';
import { IconModel } from '../../models/shared/icon-model';
import { PropertyEntryComponent } from './property-entry.component';
import { PropertyEntryModel, PropertyEntryOptions } from './property-entry.component.model';

describe('PropertyEntryComponent', () => {

  const testModel = new PropertyEntryModel({
    content: new PropertyEntryOptions ({
      value: "Completed",
      style: 'color: rgb(6, 156, 21); font-weight: 700;'
    }),
    subtitleContent: new PropertyEntryOptions ({
      value: "20.03.2023T12:23:45Z"
    }),
    subtitleLabel: new PropertyEntryOptions ({
      value: "Timestamp"
    }),
    label: new PropertyEntryOptions ({
      value: "Onboarding State"
    })
  });

  const testModelIcons = new PropertyEntryModel({
    content: new PropertyEntryOptions ({
      value: "Completed",
      style: 'color: rgb(6, 156, 21); font-weight: 700;',
      icon: new IconModel({ 
        iconName: "check-circle", 
        source: 'clarity',
        size: 17,
        isClickable: false,
        tooltip: `The State is Completed`,
        color: 'green'
     })
    }),
    subtitleContent: new PropertyEntryOptions ({
      value: "20.03.2023T12:23:45Z"
    }),
    subtitleLabel: new PropertyEntryOptions ({
      value: "Timestamp"
    }),
    label: new PropertyEntryOptions ({
      value: "Onboarding State",
      icon: new IconModel({ 
        iconName: "pop-out", 
        source: 'clarity',
        size: 16,
        tooltip: "Click to show more details",
        isClickable: true
     })
    })
  });

  const testErrorModel = new ComponentErrorModel({
    hasError: true,
    message: "Error message that is shown!",
    showLink: true
  })
  
  beforeEach(() => {
    cy.mount(PropertyEntryComponent);
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
            isLoading: false,
            data: testModel
        }
    });
    cy.get('.csgp-propertyentry-container-left > .header-text').should('contain.text', testModel.label.value);
    cy.get('.csgp-propertyentry-container-left > .subtitle').should('contain.text', testModel.subtitleLabel.value);
    cy.get('.csgp-propertyentry-container-right > .header-text').should('contain.text', testModel.content.value);
    cy.get('.csgp-propertyentry-container-right > .subtitle').should('contain.text', testModel.subtitleContent.value);

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