import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SwitchButtonComponent } from './switch-button.component';
import { signal } from '@angular/core';
import { fn } from 'storybook/test';
import { faList, faThLarge, faCheck, faTimes, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<SwitchButtonComponent> = {
  title: 'UI/SwitchButton',
  component: SwitchButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
  tags: ['autodocs'],
  argTypes: {
    onSelectionChange: { action: fn() },
  }
};

export default meta;
type Story = StoryObj<SwitchButtonComponent>;

export const Default: Story = {
  args: {
    options: [
      { label: 'List', value: 'list', icon: faList },
      { label: 'Grid', value: 'grid', icon: faThLarge }
    ],
    selectedValue: 'list',
    isDisabled: false,
    isHidden: signal(false)
  },
};

export const WithoutIcons: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' }
    ],
    selectedValue: 'opt1',
    isDisabled: false,
    isHidden: signal(false)
  },
};

export const YesNo: Story = {
  args: {
    options: [
      { label: 'Yes', value: true, icon: faCheck },
      { label: 'No', value: false, icon: faTimes }
    ],
    selectedValue: true,
    isDisabled: false,
    isHidden: signal(false)
  },
};

export const DarkLight: Story = {
  args: {
    options: [
      { label: 'Light', value: 'light', icon: faSun },
      { label: 'Dark', value: 'dark', icon: faMoon }
    ],
    selectedValue: 'light',
    isDisabled: false,
    isHidden: signal(false)
  },
};

export const Disabled: Story = {
  args: {
    options: [
      { label: 'List', value: 'list', icon: faList },
      { label: 'Grid', value: 'grid', icon: faThLarge }
    ],
    selectedValue: 'list',
    isDisabled: true,
    isHidden: signal(false)
  },
};

export const SecondSelected: Story = {
  args: {
    options: [
      { label: 'List', value: 'list', icon: faList },
      { label: 'Grid', value: 'grid', icon: faThLarge }
    ],
    selectedValue: 'grid',
    isDisabled: false,
    isHidden: signal(false)
  },
};
