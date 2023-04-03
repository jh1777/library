import { createOutputSpy } from "cypress/angular";
import { TagsComponent } from "./tags.component";

describe('TagsComponent', () => {

    beforeEach(() => {
        cy.mount(TagsComponent, {
            componentProperties: {
  
                tags: [
                    {
                        description: "Test #1",
                        name: "K1",
                        value: "V1"
                    },
                    {
                        description: "Test #2",
                        name: "K2",
                        value: "V2"
                    }
                ]
            }
        });
    });
    
    it('Content check', () => {

        cy.get('.csgp-tags-group').should('contain.text', 'K1');
        cy.get('.csgp-toolbutton').should('exist');
        
    });
    
    it('Loading check', () => {
        cy.mount(TagsComponent, {
            componentProperties: {
                isLoading: true
                }
        });

        cy.get('.csgp-tags-group > :nth-child(2)').should('not.contain.text', 'K1');
        cy.get('.csgp-tags-group > :nth-child(2)').should('have.class', 'pulse');
        
    });

    it('Clicked check', () => {
        cy.mount(TagsComponent, {
            componentProperties: {
                tags: [
                    {
                        description: "Test #1",
                        name: "K1",
                        value: "V1"
                    },
                    {
                        description: "Test #2",
                        name: "K2",
                        value: "V2"
                    }
                ],
                isLoading: false,
                enableClick: true,
                enableClickMore: true,
                showAddButton: true,
                showDeletionButton: true,
                showEditButton: true,
                overflowAfterXItems: 1,
                onMoreClick: createOutputSpy('moreClickedSpy'),
                onClick: createOutputSpy('tagClickedSpy'),
                onAddClick: createOutputSpy('addClickedSpy'),
                onEditClick: createOutputSpy('editClickedSpy'),
                onDeleteClick: createOutputSpy('deleteClickedSpy')
            }
        });

        cy.get('.cy-csgp-tag-item').should('exist').realClick({ x: 10, y: 10});
        cy.get('@tagClickedSpy').should('have.been.calledOnce');

        cy.get('.cy-csgp-tag-more').should('exist').realClick({ x: 10, y: 10});
        cy.get('@moreClickedSpy').should('have.been.calledOnce');

        cy.get('.cy-csgp-tag-add').should('exist').realClick({ x: 10, y: 10});
        cy.get('@addClickedSpy').should('have.been.calledOnce');

        cy.get('.csgp-tag-edit-button > clr-icon').should('exist').realClick({ x: 5, y: 5});
        cy.get('@editClickedSpy').should('have.been.calledOnce');

        cy.get('.csgp-tag-remove-button > clr-icon').should('exist').realClick({ x: 5, y: 5});
        cy.get('@deleteClickedSpy').should('have.been.calledOnce');
    })
})