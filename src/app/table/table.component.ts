import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
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
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    if ( event.type == "click" && event.cellIndex > 0 ) {
      console.log(event);
      this.gotoRow(event.row.id);
    }
  }

  hasRows() {
    return this.rows.length > 0;
  }

  remove() {
    this.rows = this.rows.filter( r => this.selected.indexOf(r) < 0);
    this.rowsCached = this.rowsCached.filter( r => this.selected.indexOf(r) < 0);
    this.selected = [];
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const isSearchLength = (Number.parseInt(val) && val.length >= 1 || val.length > 3);

    // filter data
    const temp = this.rowsCached.filter((d) => {
      return (!isSearchLength) || !val ||
        (isSearchLength && Object.keys(d).some(k => d[k].toString().toLowerCase().indexOf(val) !== -1));
    });

    // update the rows
    this.rows = temp;

    // Whenever the filter changes, always go back to the first page
    //this.table.offset = 0;
  }

  gotoRow(id) {
    this.router.navigate(['/edit/' + id]);
  }
}
