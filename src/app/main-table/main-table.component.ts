import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import {DatabaseConnexion, DataSourceObservable} from '../utils/database';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Case} from '../class/case';
import {MatSort} from '@angular/material/sort';




export interface CasDossier {
  id_cas: string;
  cas_nom_dossier: string;
  cas_zone_nom: string;
  cas_date_maj: string;
  cas_resume_web: string;
}


@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MainTableComponent implements OnInit {


  columnsToDisplay = ['id_cas', 'cas_zone_nom', 'cas_date_maj', 'cas_nom_dossier'];
  expandedElement: CasDossier | null;
  databaseConnexion;
  dataSource: DataSourceObservable | null;
  dataSourceTable: MatTableDataSource<Case>;
  databaseSizeObservable: DataSourceObservable;
  databaseSize: number;
  anneeSelect: number;
  typeCas = ['A', 'B', 'C', 'D', 'D1', 'D2'];
  typeCasSelected = '';
  yearSelectedVar = '';
  coms;
  actualComs;

  // MatPaginator Output
  pageEvent: PageEvent;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('Loading table');

    this.databaseConnexion = new DatabaseConnexion(this.http);
    this.dataSource = new DataSourceObservable(this.databaseConnexion);
    this.databaseSizeObservable = new DataSourceObservable(this.databaseConnexion);

    this.pageEvent = new PageEvent();

    this.databaseSizeObservable.getDatabaseSize().subscribe((size) => {this.databaseSize = size[0]; });

    this.pageEvent.pageSize = this.databaseSize;
    this.pageEvent.pageIndex = 0;

    this.databaseConnexion.fetchComsWithSize(this.pageEvent.pageSize, this.pageEvent.pageIndex);

    this.dataSource.connect().subscribe((coms) => { this.afterDataResponse(coms); });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTable.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTable.paginator) {
      this.dataSourceTable.paginator.firstPage();
    }
  }



  /**
   * afterDataResponse(coms) will execute after database sent it's response
   * call methods to make the table work properly
   *
   * @param coms : response from database
   */
  afterDataResponse(coms) {

    this.coms = coms;
    this.actualComs = coms;
    this.dataSourceTable = new MatTableDataSource(coms);

    this.dataSourceTable.paginator = this.paginator;
    this.dataSourceTable.sort = this.sort;
  }


  typeSelected() {

    let newComs = [];

    if (this.typeCasSelected === '' && this.yearSelectedVar !== '') { this.yearSelected(); return null; }

    for (let i = 0; i < this.coms.length; i++) {
      if (this.coms[i].cas_classification === this.typeCasSelected) {
        if (this.yearSelectedVar === '' || this.yearSelectedVar === this.coms[i].cas_AAAA)
        newComs.push(this.coms[i]);
      }
    }

    if (this.typeCasSelected === '' && this.yearSelectedVar === '') {
      newComs = this.coms;
    }

    this.dataSourceTable = new MatTableDataSource(newComs);
    this.dataSourceTable.paginator = this.paginator;
    this.dataSourceTable.sort = this.sort;
  }

  yearSelected() {

    let newComs = [];

    if (this.yearSelectedVar === '' && this.typeCasSelected !== '') { this.typeSelected(); return null; }


    for (let i = 0; i < this.coms.length; i++) {
      if (this.coms[i].cas_AAAA === this.yearSelectedVar) {
        if (this.typeCasSelected === '' || this.typeCasSelected === this.coms[i].cas_classification) {
          newComs.push(this.coms[i]);
        }
      }


    }

    if (this.yearSelectedVar === '' && this.typeCasSelected === '') {
      newComs = this.coms;
    }

    this.dataSourceTable = new MatTableDataSource(newComs);
    this.dataSourceTable.paginator = this.paginator;
    this.dataSourceTable.sort = this.sort;
  }

  /**
   * Converti le taux reçu en pourcentage
   *
   * @param taux
   */
  convertTauxInPourcent(taux: string) {
    taux = taux.replace(' ', '.');

    return Number(taux) * 100;
  }

  checkIfEmpty(str: string) {
    if (str.length === 0) { return 'Inconnu'; } else { return str; }
  }

  generateAnnees() {
    // @ts-ignore
    const annees: [string] = [];

    for (let i = 1937; i < 2021; i++) {
      annees.push(i.toString());
    }

    return annees;
  }

  uptadeTable() {
  }
}
