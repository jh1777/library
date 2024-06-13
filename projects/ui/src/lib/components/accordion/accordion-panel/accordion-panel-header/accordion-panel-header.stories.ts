import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

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
import { AccordionPanelHeaderComponent } from './accordion-panel-header.component';

ClarityIcons.addIcons(checkIcon, timesIcon);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<AccordionPanelHeaderComponent> = {
  title: 'UI/Accordion/Panel/Header',
  component: AccordionPanelHeaderComponent,
  decorators: [
    moduleMetadata({
      //👇 Imports both components to allow component composition with Storybook
      imports: [ClarityModule, CommonModule],
    })
  ],
  
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  argTypes: {
    
  }
};


export default meta;
type Story = StoryObj<AccordionPanelHeaderComponent>;
export const AccordionPanelHeader: Story = {
    args: {
      label: "Accordion Item"
    }
}  