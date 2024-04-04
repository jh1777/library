import { createOutputSpy } from "cypress/angular";
import { EntryItemComponent } from "./entry-item.component";
import { input, signal } from "@angular/core";

describe('EntryItemComponent', () => {
  
    beforeEach(() => {
      var storeReference;
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
