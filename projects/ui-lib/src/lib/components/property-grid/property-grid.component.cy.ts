
import { PropertyEntryComponent } from '../property-entry/property-entry.component';
import { PropertyEntryModel, PropertyEntryOptions } from '../property-entry/property-entry.component.model';
import { PropertyGridComponent } from './property-grid.component';
import { PropertyGridModel } from './property-grid.component.model';


describe('PropertyGridComponent', () => {

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
  
  beforeEach(() => {
    cy.mount(PropertyGridComponent, {
        declarations: [PropertyEntryComponent],
        componentProperties: {
            cols: 1,
            rows: 2,
            data: new PropertyGridModel({
                items: [
                    {
                        data: testModel,
                        isLoading: false,
                        errorData: null,
                        component: 'KEY-VALUE-DOUBLE'
                    },
                    {
                        data: testModel,
                        isLoading: false,
                        errorData: null,
                        component: 'KEY-VALUE-DOUBLE'
                    }
                ]
            }) 
        }
    });
  });

  it('Items check', () => {
    cy.get(':nth-child(1) > app-key-value-item-v2 > #csgp-PropertyEntry > #csgp-PropertyEntry-container').should('be.visible');
    cy.get(':nth-child(2) > app-key-value-item-v2 > #csgp-PropertyEntry > #csgp-PropertyEntry-container').should('be.visible');
    cy.get(':nth-child(3) > app-key-value-item-v2 > #csgp-PropertyEntry > #csgp-PropertyEntry-container').should('not.exist');
  });

  it('Unified Loading check', () => {
    cy.mount(PropertyGridComponent, {
        declarations: [PropertyEntryComponent],
        componentProperties: {
            cols: 1,
            rows: 2,
            hasUnifiedLoading: true,
            isLoading: true,
            data: new PropertyGridModel({
                items: [
                    {
                        data: testModel,
                        isLoading: false,
                        errorData: null,
                        component: 'KEY-VALUE-DOUBLE'
                        
                    },
                    {
                        data: testModel,
                        isLoading: false,
                        errorData: null,
                        component: 'KEY-VALUE-DOUBLE'
                    }
                ]
            }),

        }
    });

    cy.get(':nth-child(1) > app-key-value-item-v2 > #csgp-PropertyEntry').should('contain.text', '◼︎◼︎');
    cy.get(':nth-child(2) > app-key-value-item-v2 > #csgp-PropertyEntry').should('contain.text', '◼︎◼︎');

  });

  it('No Unified Loading check', () => {
    cy.mount(PropertyGridComponent, {
        declarations: [PropertyEntryComponent],
        componentProperties: {
            cols: 1,
            rows: 2,
            hasUnifiedLoading: false,
            isLoading: true,
            data: new PropertyGridModel({
                items: [
                    {
                        data: testModel,
                        isLoading: true,
                        errorData: null,
                        component: 'KEY-VALUE-DOUBLE'
                    },
                    {
                        data: testModel,
                        isLoading: false,
                        errorData: null,
                        component: 'KEY-VALUE-DOUBLE'
                    }
                ]
            }),

        }
    });

    cy.get(':nth-child(1) > app-key-value-item-v2 > #csgp-PropertyEntry').should('contain.text', '◼︎◼︎');
    cy.get(':nth-child(2) > app-key-value-item-v2 > #csgp-PropertyEntry').should('not.contain.text', '◼︎◼︎');

  });
})