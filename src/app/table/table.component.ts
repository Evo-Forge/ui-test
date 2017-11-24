import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent  {

  @Input('totalRows') totalRows: string;

  rows = [];
  selected = [];
  rowsCached = [];

  constructor() {
    this.load();
  }

  load() {
    this.fetch((data) => {
      this.rows = data.splice(0, Number.parseInt(this.totalRows) || 20);
      this.rowsCached = [...this.rows];
    });
    this.selected = [];
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/MOCK_DATA_1000.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onSelect({ selected }) {
    // console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  hasRows() {
    return this.rows.length > 0;
  }

  remove() {
    this.rows = this.rows.filter( r => this.selected.indexOf(r) < 0);
    this.selected = [];
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const isSearchLength = (Number.parseInt(val) && val.length >= 1 || val.length > 3);

    // filter our data
    const temp = this.rowsCached.filter((d) => {
      return (!isSearchLength) || !val ||
        (isSearchLength && Object.keys(d).some(k => d[k].toString().toLowerCase().indexOf(val) !== -1));
    });

    // update the rows
    this.rows = temp;

    // Whenever the filter changes, always go back to the first page
    //this.table.offset = 0;
  }
}
