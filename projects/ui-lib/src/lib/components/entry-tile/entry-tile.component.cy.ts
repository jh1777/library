import { createOutputSpy } from "cypress/angular";
import { EntryTileComponent } from "./entry-tile.component";
import { EntryState, EntryTileCollapseMode } from "./entry-tile.component.interface";

describe('EntryTileComponent', () => {
  
    beforeEach(() => {
      var storeReference;
      cy.mount(EntryTileComponent, {
          componentProperties: {
            onItemClick: createOutputSpy('itemClickedSpy'),
            onShowMoreClick: createOutputSpy('showMoreClickSpy'),
            initializedCallBack: (s) => storeReference = s,
            title: "Test Tile",
            collapseMode: EntryTileCollapseMode.manual,
            titleIcon: "factory",
            header: [
                {
                    label: "State",
                    value: "Completed",
                    valueColor: "green",
                    valueIcon: "success-standard"
                },
                {
                    label: "Updated",
                    value: "21 mins ago"
                }
            ],
            items: [{
                title: "TLS Registration",
                primaryValue: "Completed",
                secondaryValue: "23 mins ago",
                clickable: true,
                icon: "ellipsis-vertical"
            }],
            isCollapsed: false,
            state: EntryState.none,
            showMoreButtonLabel: "Show More informations",
          }
      }).then((wrapper) => {
        return cy.wrap(wrapper).as("angular");
      })
    });
  
    it('Loading check', () => {
        cy.mount(EntryTileComponent, {
          componentProperties: {
            isLoading: true,
            title: null
          }
        }).then((wrapper) => {
          return cy.wrap(wrapper).as("angular2");
        })
        cy.get("@angular2").then((wrapper) => {
            cy.get('.csgp-entry-tile-header > :nth-child(1)').should('contain.text', "⏹⏹");
        });
    });

    it('Content check', () => {
  
      cy.get("@angular").then((wrapper) => {
        // Icon
        cy.get('.csgp-generic-container-left > cds-icon').should('exist');
        // Title
        cy.get('.csgp-entry-tile-title > .csgp-generic-container-left').should('contain.text', "Test Tile");
        // not Collapsed
        cy.get('.csgp-entry-tile-itemcontainer').should('exist');
        // Collapse Button
        cy.get('.csgp-entry-tile-collapse-button > cds-icon').should('exist');
        // Header
        // 1st
        cy.get('.csgp-entry-tile-header > :nth-child(1)').should('contain.text', "State");
        cy.get('.csgp-entry-tile-header > :nth-child(1)').should('contain.text', "Completed");
        cy.get('.csgp-entry-tile-header > :nth-child(1) > .csgp-generic-container-right > .csgp-entry-tile-header-value').should('have.css', 'color', 'rgb(0, 128, 0)');
        // 2nd
        cy.get('.csgp-entry-tile-header > :nth-child(2)').should('contain.text', "Updated");
        cy.get('.csgp-entry-tile-header > :nth-child(2)').should('contain.text', "21 mins ago");
        cy.get('.csgp-entry-tile-header > :nth-child(2) > .csgp-generic-container-right > .csgp-entry-tile-header-value').should('not.have.css', 'color', 'rgb(0, 128, 0)');

        // Item
        cy.get('.csgp-entry-tile-item-title').should('contain.text', "TLS Registration");
        cy.get('.csgp-entry-tile-item-primary').should('contain.text', "Completed");
        cy.get('.csgp-entry-tile-item-secondary').should('contain.text', "23 mins ago");

        // Icon
        cy.get('.csgp-entry-tile-item-icon > cds-icon').should('exist');

        // More
        cy.get('.csgp-entry-tile-more').should('contain.text', "Show More informations");
        cy.get('@itemClickedSpy').should('not.have.been.called');
        cy.get('@showMoreClickSpy').should('not.have.been.called');
      });
  
    });

    it('Item Click check', () => {
        cy.get("@angular").then((wrapper) => {
            cy.get('.csgp-entry-tile-item').click();
            cy.get('@itemClickedSpy').should('have.been.called');
        });
    });

    it('More Click check', () => {
        cy.get("@angular").then((wrapper) => {
            cy.get('.csgp-entry-tile-more').click();
            cy.get('@showMoreClickSpy').should('have.been.called');
        });
    });

    it('Simple layout negative check', () => {
        cy.mount(EntryTileComponent, {
          componentProperties: {
            title: "Simple with small items",
            header: [{
                label: "State",
                value: "OK"
            }],
            items: [{
                primaryValue: "Connected",
                icon: "connect"
            },
            {
                primaryValue: "Registered"
            }],
            state: EntryState.none,
            collapseMode: EntryTileCollapseMode.disabled
          }
        }).then((wrapper) => {
          return cy.wrap(wrapper).as("angular2");
        })
        cy.get("@angular2").then((wrapper) => {
          // Icon
          cy.get('.csgp-generic-container-left > cds-icon').should('not.exist');
          // not Collapsed
          cy.get('.csgp-entry-tile-itemcontainer').should('exist');
          // Collapse Button
          cy.get('.csgp-entry-tile-collapse-button > cds-icon').should('not.exist');
          // Header
          // 1st
          cy.get('.csgp-entry-tile-header > :nth-child(1)').should('contain.text', "State");
          cy.get('.csgp-entry-tile-header > :nth-child(1)').should('contain.text', "OK");
          // 2nd
          cy.get('.csgp-entry-tile-header > :nth-child(2)').should('not.exist');

          // Item
          cy.get(':nth-child(1) > .csgp-entry-tile-item > .csgp-generic-container > .csgp-generic-container-left > .csgp-entry-tile-item-title').should('not.exist');
          cy.get(':nth-child(1) > .csgp-entry-tile-item > .csgp-generic-container > .csgp-generic-container-left > .csgp-entry-tile-item-primary').should('contain.text', "Connected");
          cy.get(':nth-child(1) > .csgp-entry-tile-item > .csgp-generic-container > .csgp-generic-container-left > .csgp-entry-tile-item-secondary').should('not.exist');

          cy.get(':nth-child(2) > .csgp-entry-tile-item > .csgp-generic-container > .csgp-generic-container-left > .csgp-entry-tile-item-primary').should('contain.text', "Registered");
          cy.get(':nth-child(2) > .csgp-entry-tile-item > .csgp-generic-container > .csgp-generic-container-left > .csgp-entry-tile-item-secondary').should('not.exist');

          // More
          cy.get('.csgp-entry-tile-more').should('not.exist');
          cy.get('@itemClickedSpy').should('not.have.been.called');
          cy.get('@showMoreClickSpy').should('not.have.been.called');
        });
      });

   
})