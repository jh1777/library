import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild, effect, input } from '@angular/core';
import { UIBaseComponent } from '../../shared';
import { CommonModule } from '@angular/common';
import { SignpostPosition } from './signpost.models';

@Component({
  selector: 'ui-signpost',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signpost.component.html',
  styleUrl: './signpost.component.scss'
})
export class SignpostComponent extends UIBaseComponent  {

  top: number = 0;
  left: number = 0;

  /**
   * Offset the signpost position vertically (can be also negative)  
   * Default: 0  
   * (optional)  
   */
  offsetY = input<number>(0);

  /**
   * Offset the signpost position horizontally (can be also negative)  
   * Default: 0  
   * (optional)  
   */
  offsetX = input<number>(0);

  /**
   * Styled text containing the signpost content  
   * Can be formatted using html 
   */
  text = input<string>();

  constructor(private el: ElementRef) {
    super();
    this.isHidden.set(true);
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick($event: MouseEvent): void {
    if (!this.el.nativeElement.contains($event.target)) {
      this.hide();
    }
  }

  /**
   * Shows the Signpost  
   * @param event MouseEvent
   */
  show(event: MouseEvent): void {
    if (!this.isHidden()) {
      this.hide();
      return;
    }
    
    if (event) {
      this.isHidden.set(false);
      const pos = this.calcPosition(event);

      this.top = pos.y;
      this.left = pos.x;

      // Temporärer visueller Marker
      /*
      const marker = document.createElement('div');
      marker.style.position = 'absolute';
      marker.style.top = `${this.top}px`;
      marker.style.left = `${this.left}px`;
      marker.style.width = '10px';
      marker.style.height = '10px';
      marker.style.backgroundColor = 'red';
      document.body.appendChild(marker);
      */

      this.isHidden.set(false);
    }  else {
      console.error('MouseEvent is not defined');
    }
  }

  /**
   * Calculates Signpost position
   * @param event MouseEvent
   * @param position SignpostPosition (NOT supported yet)
   * @returns { x: number, y: number }
   */
  private calcPosition(event: MouseEvent): { x: number, y: number } {
    const targetRect = (event.target as HTMLElement).getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    console.log(`scrollTop: ${scrollTop}, scrollLeft: ${scrollLeft}`);

    let directionOffsetX = 20;
    let directionOffsetY = 0;
    //const signpostWidth = this.signpostEf?.nativeElement?.width ?? 0;
    //if (position == SignpostPosition.Right) {
    //  directionOffsetX -= this.signpostWidth;
    //}
    const posY = event.clientY + scrollTop + this.offsetY() + directionOffsetY;
    const posX = event.clientX + scrollLeft + this.offsetX() + directionOffsetX;

    // this.top = targetRect.top + scrollTop;
    // this.left = targetRect.left + scrollLeft;

    return { x: posX, y: posY };
  }

  /**
   * Use this to hide the signpost manually
   */
  public hide(): void {
    this.isHidden.set(true);
    
  }

}
