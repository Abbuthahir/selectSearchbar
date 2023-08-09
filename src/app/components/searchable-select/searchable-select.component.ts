import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
})
export class SearchableSelectComponent implements OnChanges {
  @Input() title: any = 'Search';
  @Input() data: any[] = [];
  @Input() multiple = false;
  @Input() itemTextField: any = 'name';
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter()
  isOpen = false;
  selected: any[] = [];
  filtered: any[] = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.filtered = this.data;
  }

  open() {
    this.isOpen = true;
  }
  cancel() {
    this.isOpen = false;
  }
  select() {
    const selected = this.data.filter((item) => item.selected)
    this.selected = selected;
    this.selectedChanged.emit(selected)
    this.isOpen = false;
  }
  itemSelected() {
    this.selected = this.data.filter((item) => item.selected);
    if (!this.multiple && this.selected.length) {
      this.selectedChanged.emit(this.selected)
      this.isOpen = false;
      // this.selected = [];
      this.data.map(item => item.selected = false)
    }
  }
  filter(event: SearchbarCustomEvent) {
    const filter = event.target.value?.toLowerCase();
    this.filtered = this.data.filter(item => {
      return this.leaf(item).toLowerCase().indexOf(filter) >= 0
    })
  }

  leaf = (obj: any) =>
    this.itemTextField.split('.').reduce((value: any, el: any) => value[el], obj);

}
