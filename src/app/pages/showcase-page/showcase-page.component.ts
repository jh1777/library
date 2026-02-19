import { Component, inject, signal, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleCheck, faCircleExclamation, faInfoCircle, faTriangleExclamation,
  faTrash, faExternalLink, faCopy, faTimes, faPlay, faStop,
  faShapes, faToggleOn, faLayerGroup, faTable, faGauge, faBars,
  faWindowMaximize, faSliders, faList, faGrip, faPencil,
  faCircleDot
} from '@fortawesome/free-solid-svg-icons';

import { BadgeComponent, ButtonComponent, SwitchComponent, SwitchButtonComponent, SwitchButtonOptionComponent, CardComponent, CardSectionBasicComponent, EntryContainerComponent, EntryKeyValueComponent, EntryMetricComponent, EntryTileComponent, EntryTileItemComponent, MetricTileComponent, ValueTileComponent, TabComponent, TabsComponent, ToolbarComponent, ListComponent, ListItemComponent, AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderComponent, ModalComponent, ConfirmationModalComponent, SignpostComponent, ButtonGroupComponent, GridComponent, SideMenuComponent, SideMenuEntryComponent, SideMenuSectionComponent, SideMenuSubEntryComponent, TableComponent, ITableData, InputComponent, ContentComponent, ListItemKpiComponent } from '../../../../projects/ui/src/public-api';

@Component({
  selector: 'app-showcase-page',
  standalone: true,
  imports: [
    BadgeComponent, ButtonComponent, SwitchComponent, SwitchButtonComponent, SwitchButtonOptionComponent,
    CardComponent, CardSectionBasicComponent,
    EntryContainerComponent, EntryKeyValueComponent, EntryMetricComponent,
    EntryTileComponent, EntryTileItemComponent,
    MetricTileComponent, ValueTileComponent,
    TabComponent, TabsComponent,
    ToolbarComponent, ListComponent, ListItemComponent, ListItemKpiComponent,
    AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderComponent,
    ModalComponent, ConfirmationModalComponent,
    SignpostComponent,
    ButtonGroupComponent,
    GridComponent,
    SideMenuComponent, SideMenuEntryComponent, SideMenuSectionComponent, SideMenuSubEntryComponent,
    TableComponent,
    InputComponent,
    ListItemKpiComponent
],
  templateUrl: './showcase-page.component.html',
  styleUrls: ['./showcase-page.component.scss']
})
export class ShowcasePageComponent {

  content = inject(ContentComponent, {optional: true});

  // --- Icons ---
  faCheck = signal<IconDefinition>(faCircleCheck);
  faError = signal<IconDefinition>(faCircleExclamation);
  faInfo = signal<IconDefinition>(faInfoCircle);
  faWarning = signal<IconDefinition>(faTriangleExclamation);
  faTrash = signal<IconDefinition>(faTrash);
  faExternalLink = signal<IconDefinition>(faExternalLink);
  faCopy = signal<IconDefinition>(faCopy);
  faTimes = signal<IconDefinition>(faTimes);
  faPlay = signal<IconDefinition>(faPlay);
  faStop = signal<IconDefinition>(faStop);
  faPencil = signal<IconDefinition>(faPencil);
  faList = signal<IconDefinition>(faList);
  faGrip = signal<IconDefinition>(faGrip);

  // --- Side Menu Navigation icons ---
  faShapes = signal<IconDefinition>(faShapes);
  faToggleOn = signal<IconDefinition>(faToggleOn);
  faLayerGroup = signal<IconDefinition>(faLayerGroup);
  faTable = signal<IconDefinition>(faTable);
  faGauge = signal<IconDefinition>(faGauge);
  faBars = signal<IconDefinition>(faBars);
  faWindowMaximize = signal<IconDefinition>(faWindowMaximize);
  faSliders = signal<IconDefinition>(faSliders);
  faCircleDot = signal<IconDefinition>(faCircleDot);
  // --- Navigation ---
  activeSection = signal<string | number | boolean>('basics');

  // --- Demo State: Basics ---
  toggleState = signal<boolean>(false);
  switchButtonValue = signal<string>('list');
  buttonGroupItems = signal<string[]>(['Option A', 'Option B', 'Option C']);
  selectedGroupItems = signal<string[]>([]);

  onGroupItemsChange(items: string[]) {
    this.selectedGroupItems.set(items);
  }

  // --- Demo State: Tabs ---
  activeTabIndex = signal<number>(0);

  // --- Demo State: Modal ---
  showModal = signal<boolean>(false);
  showConfModal = signal<boolean>(false);

  // --- Demo State: Signpost ---
  @ViewChild('demoSignpost') demoSignpost!: SignpostComponent;

  openSignpost(event: MouseEvent) {
    this.demoSignpost?.show(event);
  }

  // --- Demo State: Input ---
  inputValue = signal<string>('Hello World');

  // --- Demo State: Table ---
  tableData = signal<ITableData>({
    columns: [
      { label: 'Name',  isSortable: true },
      { label: 'Status', isSortable: true },
      { label: 'Updated', isSortable: true },
      { label: 'Value', isSortable: true }
    ],
    rows: [
      { rowIndex: 0, isClickable: true, cells: [
        { value: 'Service Alpha' }, { value: 'Running', style: 'color: #2cd345' }, { value: '2 min ago' }, { value: '98.5%' }
      ], onClickCallback: (i) => this.log('Row clicked: ' + i) },
      { rowIndex: 1, isClickable: true, cells: [
        { value: 'Service Beta' }, { value: 'Degraded', style: 'color: #dea035' }, { value: '15 min ago' }, { value: '72.1%' }
      ], onClickCallback: (i) => this.log('Row clicked: ' + i) },
      { rowIndex: 2, isClickable: true, cells: [
        { value: 'Service Gamma' }, { value: 'Stopped', style: 'color: #e45048' }, { value: '1 hour ago' }, { value: '0%' }
      ], onClickCallback: (i) => this.log('Row clicked: ' + i) },
      { rowIndex: 3, isClickable: false, cells: [
        { value: 'Service Delta' }, { value: 'Running', style: 'color: #2cd345' }, { value: '5 min ago' }, { value: '99.9%' }
      ], onClickCallback: () => {} }
    ]
  });

  // --- Utility ---
  onBannerUndo = () => {
    console.log('[ShowcasePage] Undo action triggered');
  };

  log(event: any) {
    console.log('[ShowcasePage]', event);
  }

  // --- List Demo State ---
  listData = signal<string>('');

  onListItemClick($event: { text: string; data: any }) {
    this.listData.set(JSON.stringify($event, null, 2));
  }
}
