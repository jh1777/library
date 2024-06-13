import { Meta, StoryObj, argsToTemplate, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';
import { input, output, signal } from '@angular/core';
import { fn } from '@storybook/test';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import {
  ClarityIcons,
  checkIcon,
  timesIcon,
} from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { AccordionPanelHeaderComponent } from './accordion-panel/accordion-panel-header/accordion-panel-header.component';
import { AccordionPanelComponent } from './accordion-panel/accordion-panel.component';
ClarityIcons.addIcons(checkIcon, timesIcon);

import { AccordionPanel } from './accordion-panel/accordion-panel.stories';

// https://storybook.js.org/tutorials/intro-to-storybook/angular/en/composite-component/

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<AccordionComponent> = {
  title: 'UI/Accordion',
  component: AccordionComponent,
  subcomponents: { AccordionPanelComponent, AccordionPanelHeaderComponent },
  decorators: [
    moduleMetadata({
      //👇 Imports both components to allow component composition with Storybook
      imports: [ClarityModule, AccordionPanelComponent, AccordionPanelHeaderComponent, CommonModule],
    }),
    componentWrapperDecorator(
        (story) => `<div style="margin: 3em">${story}</div>`
    ),
  ],
  
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  argTypes: {
   
  }
};


export default meta;
type Story = StoryObj<AccordionComponent>;


export const Primary: Story = {
    args: {
        header: "The Accordion Header",
        description: "This is the description of the component (optional)"
        
    },
    render: (args) => ({
        props: args,
        template: `
        <ui-accordion [header]="header" [description]="description">
            <ui-accordion-panel>
                <ui-accordion-panel-header label="Header #1"></ui-accordion-panel-header>
                Some Content
            </ui-accordion-panel>
        </ui-accordion>
    `,
    }),
};
