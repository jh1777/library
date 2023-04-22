import { createOutputSpy } from "cypress/angular";
import { ComponentErrorModel } from "../../models/shared/component-error.model";
import { IconModel } from "../../models/shared/icon-model";
import { MetricEntryComponentCS } from "./metric-entry-cs.component";


describe('MetricBarItemV2Component', () => {
    const metricBarItemErrorData = new ComponentErrorModel({
        hasError: true,
        message: "This is an error",
        showLink: true
    });

    beforeEach(() => {
        cy.mount(MetricEntryComponentCS, {
            componentProperties: {
                label: "Started",
                labelIcon: new IconModel({
                    color: 'rgb(0, 128, 0)',
                    size: 14,
                    source: 'clarity',
                    iconName: 'info-circle'
                }),
                metricColor: "rgb(0, 128, 0)",
                metricPercent: 24,
                metricValue: 4322
            }
        });
    });
    
    it('Loading check', () => {
        cy.mount(MetricEntryComponentCS, {
            componentProperties: {
                isLoading: true
                }
        });
        cy.get('#csgp-metricbaritem-container-left > :nth-child(1)').should('contain.text', '◼︎◼︎');
    })

    it('Content check', () => {
        cy.mount(MetricEntryComponentCS, {
            componentProperties: {
                isLoading: false
            }
        });
        cy.get('#csgp-metricbaritem-container-left > .header-text').should('contain.text', "Started");
        cy.get('.measure-value').should('contain.text', "4322");
        cy.get('[style="background-color: lightgrey;"] > #csgp-metricbaritem-bar').should('have.css', 'background-color', 'rgb(0, 128, 0)');

    })
    
    it('Error overlay check', () => {
        cy.mount(MetricEntryComponentCS, {
            componentProperties: {
                isLoading: true,
                errorData: metricBarItemErrorData,
                onErrorClick: createOutputSpy('errorClickedSpy'),
            }
        });
        cy.get('.error-overlay > :nth-child(1)').should('have.text', metricBarItemErrorData.message);
        cy.get('.error-overlay').should('be.visible');
        cy.get('.error-link').should('be.visible').click();
        cy.get('@errorClickedSpy').should('have.been.calledWith', metricBarItemErrorData);
      })
});