import { waitForAsync } from "@angular/core/testing";
import { createOutputSpy, MountResponse } from "cypress/angular";
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
                }]
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
        })
    });
})