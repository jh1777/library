import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { ButtonV2Component } from './button-v2.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonV2Component> = {
  title: 'Example/Button',
  component: ButtonV2Component,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
        type: 'boolean'
    }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<ButtonV2Component>;

