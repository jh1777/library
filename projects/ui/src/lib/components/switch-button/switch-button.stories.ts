import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SwitchButtonComponent } from './switch-button.component';
import { SwitchButtonOptionComponent } from './option/switch-button-option.component';
import { signal } from '@angular/core';
import { faList, faThLarge, faCheck, faTimes, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<SwitchButtonComponent> = {
  title: 'UI/SwitchButton',
  component: SwitchButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [SwitchButtonOptionComponent],
    })
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SwitchButtonComponent>;

export const Default: Story = {
  args: {
    selectedValue: 'list',
    isDisabled: false,
    isHidden: signal(false)
  },
  render: (args) => ({
    props: { ...args, faList, faThLarge },
    template: `
      <ui-switch-button [(selectedValue)]="selectedValue" [isDisabled]="isDisabled">
        <ui-switch-button-option label="List" value="list" [icon]="faList"></ui-switch-button-option>
        <ui-switch-button-option label="Grid" value="grid" [icon]="faThLarge"></ui-switch-button-option>
      </ui-switch-button>
    `
  })
};

export const WithoutIcons: Story = {
  args: {
    selectedValue: 'opt1',
    isDisabled: false,
    isHidden: signal(false)
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-switch-button [(selectedValue)]="selectedValue" [isDisabled]="isDisabled">
        <ui-switch-button-option label="Option 1" value="opt1"></ui-switch-button-option>
        <ui-switch-button-option label="Option 2" value="opt2"></ui-switch-button-option>
      </ui-switch-button>
    `
  })
};

export const YesNo: Story = {
  args: {
    selectedValue: true,
    isDisabled: false,
    isHidden: signal(false)
  },
  render: (args) => ({
    props: { ...args, faCheck, faTimes },
    template: `
      <ui-switch-button [(selectedValue)]="selectedValue" [isDisabled]="isDisabled">
        <ui-switch-button-option label="Yes" [value]="true" [icon]="faCheck"></ui-switch-button-option>
        <ui-switch-button-option label="No" [value]="false" [icon]="faTimes"></ui-switch-button-option>
      </ui-switch-button>
    `
  })
};

export const DarkLight: Story = {
  args: {
    selectedValue: 'light',
    isDisabled: false,
    isHidden: signal(false)
  },
  render: (args) => ({
    props: { ...args, faSun, faMoon },
    template: `
      <ui-switch-button [(selectedValue)]="selectedValue" [isDisabled]="isDisabled">
        <ui-switch-button-option label="Light" value="light" [icon]="faSun"></ui-switch-button-option>
        <ui-switch-button-option label="Dark" value="dark" [icon]="faMoon"></ui-switch-button-option>
      </ui-switch-button>
    `
  })
};

export const Disabled: Story = {
  args: {
    selectedValue: 'list',
    isDisabled: true,
    isHidden: signal(false)
  },
  render: (args) => ({
    props: { ...args, faList, faThLarge },
    template: `
      <ui-switch-button [(selectedValue)]="selectedValue" [isDisabled]="isDisabled">
        <ui-switch-button-option label="List" value="list" [icon]="faList"></ui-switch-button-option>
        <ui-switch-button-option label="Grid" value="grid" [icon]="faThLarge"></ui-switch-button-option>
      </ui-switch-button>
    `
  })
};

export const SecondSelected: Story = {
  args: {
    selectedValue: 'grid',
    isDisabled: false,
    isHidden: signal(false)
  },
  render: (args) => ({
    props: { ...args, faList, faThLarge },
    template: `
      <ui-switch-button [(selectedValue)]="selectedValue" [isDisabled]="isDisabled">
        <ui-switch-button-option label="List" value="list" [icon]="faList"></ui-switch-button-option>
        <ui-switch-button-option label="Grid" value="grid" [icon]="faThLarge"></ui-switch-button-option>
      </ui-switch-button>
    `
  })
};
