import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AccordionPanelComponent } from './accordion-panel.component';
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
import { AccordionPanelHeaderComponent } from './accordion-panel-header/accordion-panel-header.component';
import { AccordionPanelHeader } from './accordion-panel-header/accordion-panel-header.stories';

ClarityIcons.addIcons(checkIcon, timesIcon);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<AccordionPanelComponent> = {
  title: 'UI/Accordion/Panel',
  component: AccordionPanelComponent,
  subcomponents: { AccordionPanelHeaderComponent },
  decorators: [
    moduleMetadata({
      //👇 Imports both components to allow component composition with Storybook
      imports: [ClarityModule, AccordionPanelHeaderComponent, CommonModule],
    })
  ],
  
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  argTypes: {
    
  }
};


export default meta;
type Story = StoryObj<AccordionPanelComponent>;
export const AccordionPanel: Story = {
    args: {

    },
    render: (args) => ({
        props: args,
        template: `

            <ui-accordion-panel>
                <ui-accordion-panel-header [label]="AccordionPanelHeader.args.label"></ui-accordion-panel-header>
                Some Content
            </ui-accordion-panel>

    `,
    }),
}  