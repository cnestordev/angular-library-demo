import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ml-mylib',
  template: `
    <div class="container">
      <input type="text" (keydown.enter)="markText($event.target)" />
      <div #content [hidden]="true">
        <ng-content></ng-content>
      </div>
      <div [innerHTML]="controlledContent"></div>
    </div>
  `,
  styles: [
    `
      .mark {
        background-color: yellow;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MylibComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;

  originalContent!: string;
  controlledContent!: string;

  constructor() {}

  ngOnInit(): void {
    // Created a setTimeout to give time for the content to load
    setTimeout(() => {
      this.controlledContent = this.originalContent =
        this.content.nativeElement.textContent;
    }, 2000);
  }

  markText(value: any) {
    this.controlledContent = this.originalContent;
    this.controlledContent = this.originalContent.replace(
      new RegExp(value.value, 'g'),
      `<span class="mark">${value.value}</span>`
    );
  }
}
