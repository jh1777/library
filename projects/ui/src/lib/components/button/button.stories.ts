import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { input, output, signal } from '@angular/core';
import { fn } from '@storybook/test';
import { ClarityModule } from '@clr/angular';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonComponent> = {
  title: 'UILib/Button',
  component: ButtonComponent,
  
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};


export default meta;
type Story = StoryObj<ButtonComponent>;

export const Plain: Story = {
  args: {
    label: 'Button',
    disabled: false,
    style: 0,
    icon: 'check',
    hidden: signal(false)
  },
};

