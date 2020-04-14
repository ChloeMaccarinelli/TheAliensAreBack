import {Component, EventEmitter, OnInit} from '@angular/core';
import {DatabaseConnexion, DataSourceObservable} from '../utils/database';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {PageEvent} from '@angular/material/paginator';
import {Case} from '../class/case';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  view: any[] = [(window.innerWidth - 30) , 700];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Lieu';
  showYAxisLabel = true;
  yAxisLabel = 'Nb témoignages';
  timeline = true;

  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false


  public arrayLieuCount = [];
  public arrayTypeCount = [];
  public arrayAnneeCount = [];
  public arrayObservationLieuCount = [];

  databaseConnexion;
  dataSource: DataSourceObservable | null;
  dataSourceTable: MatTableDataSource<Case>;
  databaseSizeObservable: DataSourceObservable;
  databaseSize: number;
  finishedLoading = false;
  event;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.event = new EventEmitter();
    this.databaseConnexion = new DatabaseConnexion(this.http);
    this.dataSource = new DataSourceObservable(this.databaseConnexion);
    this.databaseSizeObservable = new DataSourceObservable(this.databaseConnexion);

    this.databaseSizeObservable.getDatabaseSize().subscribe((size) => {this.databaseSize = size[0]; });


    this.databaseConnexion.fetchComsWithSize(this.databaseSize, 0);

    this.dataSource.connect().subscribe((coms) => { this.afterDataResponse(coms); });
  }

  /**
   * afterDataResponse(coms) will execute after database sent it's response
   * call methods to make the table work properly
   *
   * @param coms : response from database
   */
  afterDataResponse(coms) {

    let added = false;

    // Comptage des lieux des témoignages
    for (let i = 0; i < coms.length; i++) {

      added = false;

      for (let j = 0; j < this.arrayLieuCount.length; j++) {
        if (coms[i].cas_zone_nom === this.arrayLieuCount[j].name) {
          this.arrayLieuCount[j].value++;
          added = true;
        }
      }
      if (!added) {
        this.arrayLieuCount.push({"name" : coms[i].cas_zone_nom, "value" : 1});
      }
    }


    // Comptage des types de cas
    for (let i = 0; i < coms.length; i++) {

      added = false;

      for (let j = 0; j < this.arrayTypeCount.length; j++) {
        if (coms[i].cas_classification === this.arrayTypeCount[j].name) {
          this.arrayTypeCount[j].value++;
          added = true;
        }
      }
      if (!added) {
        this.arrayTypeCount.push({"name" : coms[i].cas_classification, "value" : 1});
      }
    }

    // Comptage années des types D
    for (let i = 0; i < coms.length; i++) {

      added = false;

      for (let j = 0; j < this.arrayAnneeCount.length; j++) {
        if (coms[i].cas_AAAA === this.arrayAnneeCount[j].name &&
            coms[i].cas_classification === 'D' ||
            coms[i].cas_classification === 'D1' ||
            coms[i].cas_classification === 'D2'
        ) {
          this.arrayAnneeCount[j].value++;
          added = true;
        }
      }
      if (!added && (
          coms[i].cas_classification === 'D' ||
          coms[i].cas_classification === 'D1' ||
          coms[i].cas_classification === 'D2')
      ) {
        this.arrayAnneeCount.push({"name": coms[i].cas_AAAA, "value": 1});
      }
    }


    // Comptage lieux d'observation de classe D
    for (let i = 0; i < coms.length; i++) {

      added = false;

      for (let j = 0; j < this.arrayObservationLieuCount.length; j++) {
        if (coms[i].obs_1_cadre_reference_type === this.arrayObservationLieuCount[j].name &&
            coms[i].cas_classification === 'D' ||
            coms[i].cas_classification === 'D1' ||
            coms[i].cas_classification === 'D2'
        ) {
          this.arrayObservationLieuCount[j].value++;
          added = true;
        }
      }
      if (!added && (
          coms[i].cas_classification === 'D' ||
          coms[i].cas_classification === 'D1' ||
          coms[i].cas_classification === 'D2')
      ) {
        let nomCas = '';

        if (coms[i].obs_1_cadre_reference_type === '') {
          nomCas = 'Inconnu';
        } else {
          nomCas = coms[i].obs_1_cadre_reference_type;
        }

        this.arrayObservationLieuCount.push({"name": nomCas, "value": 1});
      }
    }




    console.log(this.arrayLieuCount);
    console.log(this.arrayTypeCount);
    console.log(this.arrayAnneeCount);

    if (this.arrayLieuCount.length > 0) {
      this.finishedLoading = true;
    }
  }
}
