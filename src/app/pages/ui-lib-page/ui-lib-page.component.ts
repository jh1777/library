

import { AfterContentInit, Component, OnInit, ViewChild, signal } from "@angular/core";
import { BadgeComponent, ButtonComponent, ModalComponent, ConfirmationModalComponent,
  CardComponent, EntryTileComponent, TabComponent, TabsComponent, CardSectionBasicComponent,
  EntryKeyValueComponent, EntryTileItemComponent, SwitchComponent, MenuBarComponent, SignpostComponent,
  EntryContainerComponent, EntryMetricComponent, MenuItemComponent, AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderComponent,
  ToolbarComponent, ValueTileComponent, GridComponent, MetricTileComponent
 } from "../../../../projects/ui/src/public-api";

 import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faStop, faCircleCheck, faCircleExclamation, faInfoCircle, faTriangleExclamation, faTrash, faExternalLink, faCopy, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'ui-lib-page',
    standalone: true,
    imports: [ConfirmationModalComponent, SignpostComponent, BadgeComponent, SwitchComponent, ModalComponent, AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderComponent, CardSectionBasicComponent, MenuItemComponent, MenuBarComponent, TabComponent, TabsComponent, GridComponent, ValueTileComponent, MetricTileComponent, ToolbarComponent, ButtonComponent, CardComponent, EntryTileComponent, EntryKeyValueComponent, EntryTileItemComponent, EntryContainerComponent, EntryMetricComponent],
    templateUrl: './ui-lib-page.component.html',
    styleUrls: ['./ui-lib-page.component.scss']
  })
  export class UiLibPageComponent  {
    @ViewChild('signpost') signpost!: SignpostComponent;


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


    openSignpost(event: MouseEvent) {
      this.signpost?.show(event);
    }

    showModal = signal<boolean>(false);

    showConfModal = signal<boolean>(false);
  openModal() {
    this.showModal.set(!this.showModal());
  }

  openConfModal() {
    this.showConfModal.set(!this.showConfModal());
  }
    //showModal = signal<boolean>(false);

    toggleState = signal<boolean>(false);

    activeTabIndex = signal<number>(0);

    inputValue = signal<string>("Initial Value");

    log($event: any) {
      console.log("(UiLibPageComponent) Event Logging", $event);
    }
  }