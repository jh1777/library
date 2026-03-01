import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCircleCheck, faCircleExclamation, faInfoCircle, faTriangleExclamation,
  faTrash, faExternalLink, faCopy, faTimes, faPlay, faStop,
  faShapes, faToggleOn, faLayerGroup, faTable, faGauge, faBars,
  faWindowMaximize, faSliders, faList, faGrip, faPencil,
  faCircleDot,
  faBarChart
} from '@fortawesome/free-solid-svg-icons';

import { BadgeComponent, ButtonComponent, SwitchComponent, SwitchButtonComponent, SwitchButtonOptionComponent, CardComponent, CardSectionBasicComponent, EntryContainerComponent, EntryKeyValueComponent, EntryMetricComponent, EntryTileComponent, EntryTileItemComponent, MetricTileComponent, ValueTileComponent, TabComponent, TabsComponent, ToolbarComponent, ListComponent, ListFooterComponent, ListItemComponent, AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderComponent, ModalComponent, ConfirmationModalComponent, DrawerComponent, SignpostComponent, ButtonGroupComponent, GridComponent, SideMenuComponent, SideMenuEntryComponent, SideMenuSectionComponent, SideMenuSubEntryComponent, TableComponent, ITableData, InputComponent, ContentComponent, ListItemKpiComponent, ListComponentInterface, BarChartComponent, ChartDataSet } from '../../../../projects/ui/src/public-api';

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
    ToolbarComponent, ListComponent, ListFooterComponent, ListItemComponent, ListItemKpiComponent,
    AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderComponent,
    ModalComponent, ConfirmationModalComponent, DrawerComponent,
    SignpostComponent,
    ButtonGroupComponent,
    GridComponent,
    SideMenuComponent, SideMenuEntryComponent, SideMenuSectionComponent, SideMenuSubEntryComponent,
    TableComponent,
    InputComponent,
    ListItemKpiComponent,
    BarChartComponent
],
  templateUrl: './showcase-page.component.html',
  styleUrls: ['./showcase-page.component.scss']
})
export class ShowcasePageComponent {
  content = inject(ContentComponent, {optional: true});
  list2ViewChild = signal<ListComponent | null>(null);

  @ViewChild('list2')
  set list2ViewChildRef(value: ListComponent | undefined) {
    this.list2ViewChild.set(value ?? null);
  }

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
  faCharts = signal<IconDefinition>(faBarChart);
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
  showDrawer = signal<boolean>(false);
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

  // --- Demo State: Bar Chart ---
  barChartData = signal<ChartDataSet>({ label: 'Example Data', data: [
    { label: 'Category A', value: 30, color: '#3b82f6' },
    { label: 'Category B', value: 80, color: '#10b981' },
    { label: 'Category C', value: 45, color: '#f59e0b' },
    { label: 'Category D', value: 60, color: '#ef4444' },
    { label: 'Category E', value: 20, color: '#ef4444' },
    { label: 'Category F', value: 90, color: '#8b5cf6' },
    { label: 'Category G', value: 55, color: '#3b82f6' }
  ]});

  // --- Utility ---
  onBannerUndo = () => {
    console.log('[ShowcasePage] Undo action triggered');
  };

  log(event: any) {
    console.log('[ShowcasePage]', event);
  }

  // --- List Demo State ---
  listContent = signal<ListComponentInterface[]>(
    [
      { id: '1', icon: faInfoCircle, text: 'Service Alpha - API latency', data: { label: 'p95 (ms)', value: 180, style: 'positive', percentage: -10, refValue: 200, delta: -20 } },
      { id: '2', icon: faExternalLink, text: 'Service Beta - Error rate', data: { label: 'Errors (%)', value: 1.2, style: 'negative', percentage: 20, refValue: 1.0, delta: 0.2 } },
      { id: '3', icon: faInfoCircle, text: 'Service Gamma - Throughput', data: { label: 'req/s', value: 920, style: 'positive', percentage: 5, refValue: 875, delta: 45 } },
      { id: '4', icon: faInfoCircle, text: 'Service Delta - Availability', data: { label: 'Uptime (%)', value: 99.95, style: 'positive', percentage: 0.05, refValue: 99.90, delta: 0.05 } },
      { id: '5', icon: faInfoCircle, text: 'Service Epsilon - Cache hit rate', data: { label: 'Hit rate (%)', value: 86, style: 'neutral', percentage: 0, refValue: 86, delta: 0 } },
      { id: '6', icon: faInfoCircle, text: 'North America - Active users', data: { label: 'DAU (k)', value: 128, style: 'positive', percentage: 8, refValue: 118, delta: 10 } },
      { id: '7', icon: faInfoCircle, text: 'Europe - Conversion rate', data: { label: 'CR (%)', value: 2.4, style: 'negative', percentage: -12, refValue: 2.7, delta: -0.3 } },
      { id: '8', icon: faPlay, text: 'APAC - Avg order value', data: { label: 'AOV (USD)', value: 64, style: 'positive', percentage: 6.7, refValue: 60, delta: 4 } },
      { id: '9', icon: faInfoCircle, text: 'Email - Open rate', data: { label: 'Open (%)', value: 38, style: 'neutral', percentage: 0, refValue: 38, delta: 0 } },
      { id: '10', icon: faInfoCircle, text: 'Push - Click rate', data: { label: 'CTR (%)', value: 4.1, style: 'positive', percentage: 10, refValue: 3.7, delta: 0.4 } },
      { id: '11', icon: faInfoCircle, text: 'Landing page - Bounce rate', data: { label: 'Bounce (%)', value: 42, style: 'negative', percentage: 7, refValue: 39, delta: 3 } },
      { id: '12', icon: faInfoCircle, text: 'Checkout - Abandonment', data: { label: 'Abandon (%)', value: 18, style: 'positive', percentage: -10, refValue: 20, delta: -2 } },
      { id: '13', icon: faCircleCheck, text: 'Inventory - Stockouts', data: { label: 'SKU count', value: 14, style: 'negative', percentage: 16.7, refValue: 12, delta: 2 } },
      { id: '14', icon: faPlay, text: 'Support - First response time', data: { label: 'Minutes', value: 22, style: 'positive', percentage: -12, refValue: 25, delta: -3 } },
      { id: '15', icon: faInfoCircle, text: 'Support - CSAT', data: { label: 'Score', value: 4.6, style: 'positive', percentage: 4.5, refValue: 4.4, delta: 0.2 } },
      { id: '16', icon: faInfoCircle, text: 'Billing - Failed charges', data: { label: 'Rate (%)', value: 0.9, style: 'positive', percentage: -25, refValue: 1.2, delta: -0.3 } },
      { id: '17', icon: faShapes, text: 'Data pipeline - Freshness', data: { label: 'Delay (min)', value: 6, style: 'neutral', percentage: 0, refValue: 6, delta: 0 } },
      { id: '18', icon: faInfoCircle, text: 'Mobile app - Crash rate', data: { label: 'Crashes (%)', value: 0.4, style: 'positive', percentage: -20, refValue: 0.5, delta: -0.1 } },
      { id: '19', icon: faInfoCircle, text: 'Web app - Core Web Vitals', data: { label: 'LCP (s)', value: 2.1, style: 'positive', percentage: -8.7, refValue: 2.3, delta: -0.2 } },
      { id: '20', icon: faInfoCircle, text: 'Search - Zero results', data: { label: 'Rate (%)', value: 3.6, style: 'negative', percentage: 12.5, refValue: 3.2, delta: 0.4 } },
      { id: '21', icon: faPencil, text: 'Recommendations - CTR', data: { label: 'CTR (%)', value: 6.8, style: 'positive', percentage: 9.7, refValue: 6.2, delta: 0.6 } },
      { id: '22', icon: faInfoCircle, text: 'Fraud - Review queue', data: { label: 'Items', value: 58, style: 'negative', percentage: 16, refValue: 50, delta: 8 } },
      { id: '23', icon: faInfoCircle, text: 'Shipping - On-time delivery', data: { label: 'OTD (%)', value: 96.2, style: 'positive', percentage: 1.2, refValue: 95.1, delta: 1.1 } },
      { id: '24', icon: faInfoCircle, text: 'Warehouse - Pick accuracy', data: { label: 'Accuracy (%)', value: 99.1, style: 'positive', percentage: 0.3, refValue: 98.8, delta: 0.3 } }
    ]
  );

  listData = signal<string>('');

  list2SummaryKpi = computed(() => {
    if (this.activeSection() !== 'list') {
      return null;
    }
    return this.list2ViewChild()?.calculateSummaryKpiResults('negative', 'sum') ?? null;
  });

  onListItemClick($event: { text: string; data: any }) {
    this.listData.set(JSON.stringify($event, null, 2));
  }
}
