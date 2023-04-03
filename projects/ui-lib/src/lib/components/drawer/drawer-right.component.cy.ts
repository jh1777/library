import { DrawerRightComponent } from "./drawer-right.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser'

describe('Drawer Right Tests', () => {

    beforeEach(() => {
        cy.mount(DrawerRightComponent, {
            imports: [
                BrowserModule,
                BrowserAnimationsModule
            ],
            componentProperties: {
                title: "Downloads",
                description: "Description for Test",
                show: true
            },
        })
    })

    it('click away should hide panel', () => {
        cy.get('#csgp-drawer-right-header').should('contains.text', 'Downloads');
        cy.get("body").realClick({ x: 5, y: 5 }).wait(200);
        cy.get('#csgp-drawer-right').should('be.hidden');
    })

    it('click close should hide panel', () => {
        cy.get('#csgp-drawer-right-header-right-button').realClick().wait(200);
        cy.get('#csgp-drawer-right').should('be.hidden');
    })
})