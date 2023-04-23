
import { ClarityModule } from '@clr/angular';
import { PropertyEntryComponent } from '../property-entry';
import { EntryGridComponent } from './entry-grid.component';
import { EntryGridModel } from './entry-grid.component.model';


describe('PropertyGridComponent', () => {
  
  beforeEach(() => {
    cy.mount(EntryGridComponent, {
        declarations: [PropertyEntryComponent],
        imports: [ClarityModule],
        componentProperties: {
            cols: 1,
            rows: 2,
            data: new EntryGridModel({
                items: [
                    {
                        data: {
                          value: "Completed",
                          valueStyle: 'color: rgb(6, 156, 21); font-weight: 700;',
                          valueSubtitle: "20.03.2023T12:23:45Z",
                          subtitle: "Timestamp",
                          label: "Onboarding State"
                        },
                        isLoading: false,
                        errorData: null,
                        component: 'PROPERTY'
                    },
                    {
                        data: {
                          value: "Completed",
                          valueStyle: 'color: rgb(6, 156, 21); font-weight: 700;',
                          valueSubtitle: "20.03.2023T12:23:45Z",
                          subtitle: "Timestamp",
                          label: "Onboarding State"
                        },
                        isLoading: false,
                        errorData: null,
                        component: 'PROPERTY'
                    }
                ]
            }) 
        }
    });
  });


  it('Items check', () => {
    cy.get(':nth-child(1) > csgp-property-entry > .csgp-propertyentry > .csgp-propertyentry-container').should('be.visible');
    cy.get(':nth-child(2) > csgp-property-entry > .csgp-propertyentry > .csgp-propertyentry-container').should('be.visible');
    cy.get(':nth-child(3) > csgp-property-entry > .csgp-propertyentry > .csgp-propertyentry-container').should('not.exist');
  });

  it('Unified Loading check', () => {
    cy.mount(EntryGridComponent, {
        declarations: [PropertyEntryComponent],
        componentProperties: {
            cols: 1,
            rows: 2,
            hasUnifiedLoading: true,
            isLoading: true,
            data: new EntryGridModel({
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

    cy.get(':nth-child(1) > csgp-property-entry > .csgp-propertyentry').should('contain.text', '◼︎◼︎');
    cy.get(':nth-child(2) > csgp-property-entry > .csgp-propertyentry').should('contain.text', '◼︎◼︎');

  });

  it('No Unified Loading check', () => {
    cy.mount(EntryGridComponent, {
        declarations: [PropertyEntryComponent],
        componentProperties: {
            cols: 1,
            rows: 2,
            hasUnifiedLoading: false,
            isLoading: true,
            data: new EntryGridModel({
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

    cy.get(':nth-child(1) > csgp-property-entry > .csgp-propertyentry').should('contain.text', '◼︎◼︎');
    cy.get(':nth-child(2) > csgp-property-entry > .csgp-propertyentry').should('not.contain.text', '◼︎◼︎');

  });
  
})