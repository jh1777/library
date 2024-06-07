
import { CommonModule } from "@angular/common";
import { AfterContentInit, Component, OnInit, ViewChild, signal } from "@angular/core";
import { BadgeComponent, ButtonComponent, ModalComponent, ConfirmationModalComponent,
  CardComponent, EntryTileComponent, TabComponent, TabsComponent, CardSectionBasicComponent,
  EntryKeyValueComponent, EntryTileItemComponent, SwitchComponent, MenuBarComponent, SignpostComponent,
  EntryContainerComponent, EntryMetricComponent, MenuItemComponent, AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderComponent,
  ToolbarComponent, ValueTileComponent, GridComponent, MetricTileComponent
 } from "../../../../projects/ui/src/public-api";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";

@Component({
    selector: 'ui-lib-page',
    standalone: true,
    imports: [CommonModule, OverlayModule, PortalModule, ConfirmationModalComponent, SignpostComponent, BadgeComponent, SwitchComponent, ModalComponent, AccordionComponent, AccordionPanelComponent, AccordionPanelHeaderComponent, CardSectionBasicComponent, MenuItemComponent, MenuBarComponent, TabComponent, TabsComponent, GridComponent, ValueTileComponent, MetricTileComponent, ToolbarComponent, ButtonComponent, CardComponent, EntryTileComponent, EntryKeyValueComponent, EntryTileItemComponent, EntryContainerComponent, EntryMetricComponent],
    templateUrl: './ui-lib-page.component.html',
    styleUrls: ['./ui-lib-page.component.scss']
  })
  export class UiLibPageComponent  {
    @ViewChild('signpost') signpost!: SignpostComponent;

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