import { createOutputSpy } from "cypress/angular";
import { ComponentErrorModel } from "../../models/shared/component-error.model";
import { IconModel } from "../../models/shared/icon-model";
import { DrawerEntryComponent } from "./drawer-entry.component";

describe('DrawerEntryComponent', () => {

    const errorData = new ComponentErrorModel({
        hasError: true,
        showLink: true,
        message: "This is an error"

    })
    
    beforeEach(() => {
        cy.mount(DrawerEntryComponent, {
            componentProperties: {
                title: "Test Entry",
                titleIcon: new IconModel({
                    color: 'rgb(128, 128, 128)',
                    iconName: "info-circle",
                    size: 16,
                    tooltip: "Test button"
                }),
                subtitle: "2023-03-21T12:12:23Z (18 mins ago)",
                description: "This is the description of this entry.",
                progressPercent: 33,
                progressStatusLabel: "In Progress",
                showProgress: true
            }
        });
    });

    it('Loading check', () => {
        cy.mount(DrawerEntryComponent, {
            componentProperties: {
                isLoading: true
            }
        });
        cy.get('.csgp-drawer-entry-header').should('contain.text', '◼︎◼︎');
    })

    it('Content check', () => {
        cy.mount(DrawerEntryComponent, {
            componentProperties: {
                isLoading: false
            }
        });
        cy.get('.csgp-drawer-entry-header-title > :nth-child(1)').should('contain.text', "Test Entry");
        cy.get('.csgp-drawer-entry-subtitle').should('contain.text', "2023-03-21T12:12:23Z (18 mins ago)");
        cy.get('.csgp-drawer-entry-progress').should('be.visible');
    });

    it('Content check - no bar', () => {
        cy.mount(DrawerEntryComponent, {
            componentProperties: {
                isLoading: false,
                title: "Test Entry2",
                subtitle: "2023-03-21T12:12:23Z (18 mins ago)",
                showProgress: false
            }
        });
        cy.get('#csgp-drawer-entry-progress').should('not.exist');
        cy.get('#csgp-drawer-entry-description').should('not.exist');
    });

    it('Error overlay check', () => {
        cy.mount(DrawerEntryComponent, {
            componentProperties: {
                isLoading: true,
                errorData: errorData,
                onErrorClick: createOutputSpy('errorClickedSpy'),
            }
        });
        cy.get('.error-overlay > :nth-child(1)').should('have.text', errorData.message);
        cy.get('.error-overlay').should('be.visible');
        cy.get('.error-link').should('be.visible').click();
        cy.get('@errorClickedSpy').should('have.been.calledWith', errorData);
      });
})