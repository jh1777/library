import { Meta, StoryObj, argsToTemplate, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';
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
import { provideAnimations } from '@angular/platform-browser/animations';
import { SwitchComponent } from '../switch';
import { BadgeComponent } from '../badge';
import { ButtonComponent } from '../button';


interface AccordionArgs {
  header?: string;
  panelLabel?: string;
}

// https://storybook.js.org/tutorials/intro-to-storybook/angular/en/composite-component/

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta = {
  title: 'UI/Accordion',
  component: AccordionComponent,
  //subcomponents: { AccordionPanelComponent, AccordionPanelHeaderComponent },
  decorators: [
    moduleMetadata({
      //👇 Imports both components to allow component composition with Storybook
      imports: [ClarityModule, AccordionPanelComponent, AccordionPanelHeaderComponent, SwitchComponent, BadgeComponent, ButtonComponent, CommonModule],
      providers: [provideAnimations()], 
    }),
    // componentWrapperDecorator(
    //     (story) => `<div style="margin: 3em">${story}</div>`
    // ),
  ],
  
  tags: [],
  
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    header: "The Accordion Header",
    panelLabel: "Header #1"
  },
  argTypes: {
    
    header: { control: 'text' },
    panelLabel: { control: 'text', name: 'Label', description: 'The label of the accordion panel', }
  },
  render: (args: AccordionArgs) => ButtonWebComponentWithBadge(args)

} satisfies Meta<AccordionArgs>;

const AccordionPanelComponentTemplate = (args: AccordionArgs) => {
  return `<ui-accordion-panel>
              <ui-accordion-panel-header label="${args.panelLabel}">
              </ui-accordion-panel-header>
              Some Content
          </ui-accordion-panel>`;
} 

export const ButtonWebComponentWithBadge = (args: AccordionArgs) => {

  return { args: args, template: `
    <ui-accordion header="${args.header}" description="${args.header}">
          ${AccordionPanelComponentTemplate(args)}
      </ui-accordion>
  `};
};

export default meta;
type Story = StoryObj<AccordionArgs>;



export const Headers: Story = {
  argTypes: {
    header: { control: 'text' },
  },
  args: {
      header: "The Accordion Header"
  },
};

/*
export const Simple: Story = {
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

export const Panels: Story = {
  args: {
      header: "Some Panels",
      description: "Variation of Panels",        
  },
  render: (args) => ({
      props: args,
      template: `
      <ui-accordion [header]="header" [description]="description">
          <ui-accordion-panel>
              <ui-accordion-panel-header label="Default"></ui-accordion-panel-header>
              Any Content
          </ui-accordion-panel>
          <ui-accordion-panel>
              <ui-accordion-panel-header label="Attention Style" [style]=1></ui-accordion-panel-header>
              Any Content
          </ui-accordion-panel>
          <ui-accordion-panel [isCollapsed]=false>
              <ui-accordion-panel-header label="Expanded by default" ></ui-accordion-panel-header>
              Any Content
          </ui-accordion-panel>
          <ui-accordion-panel [isDisabled]=true>
              <ui-accordion-panel-header label="Disabled" ></ui-accordion-panel-header>
              Any Content
          </ui-accordion-panel>
      </ui-accordion>
  `,
  }),
};

export const Nested: Story = {
  args: {
      header: "Nested Components",
      description: "Panels with nested components",        
  },
  render: (args) => ({
      props: args,
      template: `
      <ui-accordion [header]="header" [description]="description">
          <ui-accordion-panel>
              <ui-accordion-panel-header label="Button Component">
                <ui-button label="Okay" icon="check" [style]=1></ui-button>
              </ui-accordion-panel-header>
              Any Content
          </ui-accordion-panel>
          <ui-accordion-panel>
              <ui-accordion-panel-header label="Badge Component">
                <ui-badge value="7"></ui-badge>
              </ui-accordion-panel-header>
              Any Content
          </ui-accordion-panel>
          <ui-accordion-panel>
              <ui-accordion-panel-header label="Switch Component">
                <ui-switch label="Activated"></ui-switch>
              </ui-accordion-panel-header>
              Any Content
          </ui-accordion-panel>
      </ui-accordion>
  `,
  }),
  
};
*/