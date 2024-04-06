import { createOutputSpy } from "cypress/angular";
import { EntryItemComponent } from "./entry-item.component";
import { input, signal } from "@angular/core";

describe('EntryItemComponent', () => {
  
    beforeEach(() => {
      cy.mount(EntryItemComponent, {
          componentProperties: {
            onItemClick: createOutputSpy('itemClickedSpy'),
            title: input("Test Tile"),
            showTitle: signal(true),
            primaryValue: input("Completed"),
            secondaryValue: input("23 mins ago")
          }
      }).then((wrapper) => {
        return cy.wrap(wrapper).as("angular");
      })
    });
});

it('Loading check', () => {
    cy.mount(EntryItemComponent, {
      componentProperties: {
        isLoading: input(true)
      }
    }).then((wrapper) => {
      return cy.wrap(wrapper).as("angular2");
    })
    cy.get("@angular2").then((wrapper) => {
        cy.get('.csgp-entry-tile-header > :nth-child(1)').should('contain.text', "⏹⏹");
    });
});
