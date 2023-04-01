import { createOutputSpy } from "cypress/angular";
import { ComponentErrorModel } from "../../models/shared/component-error.model";
import { IconModel } from "../../models/shared/icon-model";
import { MetricBarItemV2Component } from "../metric-entry/metric-entry.component";
import { MetricBarItemLabelOptions, MetricBarItemMeasureOptions, MetricBarItemModel } from "../metric-entry/metric-entry.component.model";


describe('MetricBarItemV2Component', () => {

    const metricBarItemData = new MetricBarItemModel({
        label: new MetricBarItemLabelOptions({
            value: "Started",
            icon: new IconModel({
            color: 'rgb(0, 128, 0)',
            size: 14,
            source: 'clarity',
            iconName: 'info-circle'
            })
        }),
        measure: new MetricBarItemMeasureOptions({
            color: "rgb(0, 128, 0)",
            percent: 24,
            value: 4322
        })
    });

    const metricBarItemErrorData = new ComponentErrorModel({
        hasError: true,
        message: "This is an error",
        showLink: true
    });

    beforeEach(() => {
        cy.mount(MetricBarItemV2Component);
      });
    
    it('Loading check', () => {
        cy.mount(MetricBarItemV2Component, {
            componentProperties: {
                isLoading: true
                }
        });
        cy.get('#csgp-metricbaritem-container-left > :nth-child(1)').should('contain.text', '◼︎◼︎');
    })

    it('Content check', () => {
        cy.mount(MetricBarItemV2Component, {
            componentProperties: {
                isLoading: false,
                data: metricBarItemData
            }
        });
        cy.get('#csgp-metricbaritem-container-left > .header-text').should('contain.text', metricBarItemData.label.value);
        cy.get('.measure-value').should('contain.text', metricBarItemData.measure.value);
        cy.get('[style="background-color: lightgrey;"] > #csgp-metricbaritem-bar').should('have.css', 'background-color', 'rgb(0, 128, 0)');

    })
    
    it('Error overlay check', () => {
        cy.mount(MetricBarItemV2Component, {
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