import { createOutputSpy } from "cypress/angular";
import { ComponentErrorModel } from "../../../models/v2/component-error.model";
import { PortalIconModel } from "../../../models/v2/icon-model";
import { DrawerEntryComponent } from "./drawer-entry.component";
import { DrawerEntryModel } from "../../../models/v2/drawer-entry/drawer-entry.component.model"

describe('DrawerEntryComponent', () => {

    const model = new DrawerEntryModel({
        title: "Test Entry",
        titleIcon: new PortalIconModel({
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
    });

    const errorData = new ComponentErrorModel({
        hasError: true,
        showLink: true,
        message: "This is an error"

    })

    const model2 = new DrawerEntryModel({
        title: "Test Entry2",
        subtitle: "2023-03-21T12:12:23Z (18 mins ago)",
        showProgress: false
    });
    
    beforeEach(() => {
        cy.mount(DrawerEntryComponent);
    });

    it('Loading check', () => {
        cy.mount(DrawerEntryComponent, {
            componentProperties: {
                isLoading: true
            }
        });
        cy.get('#csgp-drawer-entry-header').should('contain.text', '◼︎◼︎');
    })

    it('Content check', () => {
        cy.mount(DrawerEntryComponent, {
            componentProperties: {
                isLoading: false,
                data: model
            }
        });
        cy.get('#csgp-drawer-entry-header-title > :nth-child(1)').should('contain.text', model.title);
        cy.get('#csgp-drawer-entry-subtitle').should('contain.text', model.subtitle);
        cy.get('#csgp-drawer-entry-progress').should('be.visible');
    });

    it('Content check - no bar', () => {
        cy.mount(DrawerEntryComponent, {
            componentProperties: {
                isLoading: false,
                data: model2
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