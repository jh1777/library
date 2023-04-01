import { createOutputSpy } from "cypress/angular";
import { ComponentErrorModel } from "../../models/shared/component-error.model";
import { IconModel } from "../../models/shared/icon-model";
import { MetricEntryComponent } from "./metric-entry.component";
import { MetricEntryLabelOptions, MetricEntryMeasureOptions, MetricEntryModel } from "./metric-entry.component.model";

describe('MetricEntryComponent', () => {

    const MetricEntryData = new MetricEntryModel({
        label: new MetricEntryLabelOptions({
            value: "Started",
            icon: new IconModel({
            color: 'rgb(0, 128, 0)',
            size: 14,
            source: 'clarity',
            iconName: 'info-circle'
            })
        }),
        measure: new MetricEntryMeasureOptions({
            color: "rgb(0, 128, 0)",
            percent: 24,
            value: 4322
        })
    });

    const MetricEntryErrorData = new ComponentErrorModel({
        hasError: true,
        message: "This is an error",
        showLink: true
    });

    beforeEach(() => {
        cy.mount(MetricEntryComponent);
      });
    
    it('Loading check', () => {
        cy.mount(MetricEntryComponent, {
            componentProperties: {
                isLoading: true
                }
        });
        cy.get('#csgp-MetricEntry-container-left > :nth-child(1)').should('contain.text', '◼︎◼︎');
    })

    it('Content check', () => {
        cy.mount(MetricEntryComponent, {
            componentProperties: {
                isLoading: false,
                data: MetricEntryData
            }
        });
        cy.get('#csgp-MetricEntry-container-left > .header-text').should('contain.text', MetricEntryData.label.value);
        cy.get('.measure-value').should('contain.text', MetricEntryData.measure.value);
        cy.get('[style="background-color: lightgrey;"] > #csgp-MetricEntry-bar').should('have.css', 'background-color', 'rgb(0, 128, 0)');

    })
    
    it('Error overlay check', () => {
        cy.mount(MetricEntryComponent, {
            componentProperties: {
                isLoading: true,
                errorData: MetricEntryErrorData,
                onErrorClick: createOutputSpy('errorClickedSpy'),
            }
        });
        cy.get('.error-overlay > :nth-child(1)').should('have.text', MetricEntryErrorData.message);
        cy.get('.error-overlay').should('be.visible');
        cy.get('.error-link').should('be.visible').click();
        cy.get('@errorClickedSpy').should('have.been.calledWith', MetricEntryErrorData);
      })
});