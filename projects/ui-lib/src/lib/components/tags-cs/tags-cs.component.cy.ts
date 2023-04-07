import { MountResponse } from "cypress/angular";
import { TagsComponentCS } from "./tags-cs.component";

describe('TagsComponent CS', () => {
    it('Content check', () => {
        var storeReference;
        cy.mount(TagsComponentCS, {
            componentProperties: {
                initializedCallBack: (s) => storeReference = s,
                tags: [{
                    description: "Test #1",
                    name: "K1",
                    value: "V1"
                },
                {
                    description: "Test #2",
                    name: "K2",
                    value: "V2"
                }],
                overflowAfterXItems: 1,
                showAddButton: true,
                showEditButton: true,
                showTagsIcon: true
            },
        }).then((wrapper) => {
            return cy.wrap(wrapper).as("angular");
        })
        cy.get("@angular").then((wrapper) => {
            const mountResponse = wrapper as any as MountResponse<TagsComponentCS>;
            console.log(mountResponse);
            // For private direct access
            console.log(mountResponse.component['tagsStore']);
            // console.log(storeReference);
            // For public direct access
            // console.log(mountResponse.component.tagsStore);
            // console.log(storeReference);
            cy.get('.cy-csgp-tag-item').should('contain.text', "K1");
            cy.get('.csgp-tags-icon').should('exist');
            cy.get('.cy-csgp-tag-add').should('exist');
            cy.get('.cy-csgp-tag-more').should('exist');
            cy.get('.csgp-tag-edit-button').should('exist');
            cy.get('.csgp-tag-remove-button').should('exist');
        })
    });

    it('Loading check', () => {
        var storeReference;
        cy.mount(TagsComponentCS, {
            componentProperties: {
                initializedCallBack: (s) => storeReference = s,
                isLoading: true,
                tags: [{
                    description: "Test #1",
                    name: "K1",
                    value: "V1"
                }],
                showTagsIcon: true
            },
        }).then((wrapper) => {
            return cy.wrap(wrapper).as("angular");
        })
        cy.get("@angular").then((wrapper) => {
            cy.get(".cy-csgp-loading").should('exist');
        })
    });
})