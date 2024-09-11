import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from './button.component';
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
ClarityIcons.addIcons(checkIcon, timesIcon);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonComponent> = {
  title: 'UI/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      //👇 Imports both components to allow component composition with Storybook
      imports: [ClarityModule],
    })
  ],
  
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  argTypes: {
    onClick: { action: fn() },
  }
};


export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Primary',
    isDisabled: false,
    style: 1,
    icon: 'check',
    isHidden: signal(false)
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    isDisabled: false,
    style: 2,
    icon: 'check',
    isHidden: signal(false)
  },
};

export const Outline: Story = {
  args: {
    label: 'Outlined',
    isDisabled: false,
    style: 3,
    icon: 'check',
    isHidden: signal(false)
  },
};

export const Destructive: Story = {
  args: {
    label: 'Destructive',
    isDisabled: false,
    style: 4,
    icon: 'check',
    isHidden: signal(false)
  },
};

export const Success: Story = {
  args: {
    label: 'Success',
    isDisabled: false,
    style: 5,
    icon: 'check',
    isHidden: signal(false)
  },
};

export const Plain: Story = {
  args: {
    label: 'Plain',
    isDisabled: false,
    style: 0,
    icon: 'check',
    isHidden: signal(false)
  },
};


export const PlainDestructive: Story = {
  args: {
    label: 'Plain Destructive',
    isDisabled: false,
    style: 6,
    icon: 'check',
    isHidden: signal(false)
  },
};


