import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SelectComponent } from './select.component';
import { signal } from '@angular/core';
import { fn } from 'storybook/test';
import { SelectStyle } from './select.models';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<SelectComponent> = {
  title: 'UI/Select',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: fn() },
  }
};

export default meta;
type Story = StoryObj<SelectComponent>;

const sampleOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' }
];

export const Default: Story = {
  args: {
    label: 'Select an item',
    placeholderText: 'Choose an option',
    options: sampleOptions,
    isDisabled: false,
    style: SelectStyle.None,
    isHidden: signal(false)
  },
};

export const WithValue: Story = {
  args: {
    label: 'Pre-selected option',
    placeholderText: 'Choose an option',
    options: sampleOptions,
    value: '2',
    isDisabled: false,
    style: SelectStyle.None,
    isHidden: signal(false)
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled select',
    placeholderText: 'Choose an option',
    options: sampleOptions,
    isDisabled: true,
    style: SelectStyle.None,
    isHidden: signal(false)
  },
};

export const ErrorStyle: Story = {
  args: {
    label: 'Select with error',
    placeholderText: 'Choose an option',
    options: sampleOptions,
    isDisabled: false,
    style: SelectStyle.Error,
    isHidden: signal(false)
  },
};

export const SuccessStyle: Story = {
  args: {
    label: 'Select with success',
    placeholderText: 'Choose an option',
    options: sampleOptions,
    value: '3',
    isDisabled: false,
    style: SelectStyle.Success,
    isHidden: signal(false)
  },
};

export const AttentionStyle: Story = {
  args: {
    label: 'Select with attention',
    placeholderText: 'Choose an option',
    options: sampleOptions,
    isDisabled: false,
    style: SelectStyle.Attention,
    isHidden: signal(false)
  },
};
