
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Case} from '../class/case';
import {DataSource} from '@angular/cdk/table';
import {CollectionViewer} from '@angular/cdk/collections';


@Injectable({
    providedIn: 'root',
})
export class DatabaseConnexion {
    dataChange: BehaviorSubject<object[]> = new BehaviorSubject<object[]>([]);
    countDatabaseChange: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    selectedComChange: BehaviorSubject<Case> = new BehaviorSubject<Case>(new Case());
    get data(): object[] { return this.dataChange.value; }

    private getAllUrl: string;
    private getDatabaseSizeUrl: string;

    constructor(
        private http: HttpClient
    ) {
        // If we are on local, we have to subs
        this.getAllUrl = 'http://localhost:8080/api/v1/cas';
        this.getDatabaseSizeUrl = 'http://localhost:8080/api/v1/count';
    }

    fetchComs() {
        this.fetchAllComs();
    }

    fetchComsWithSize(size: number, page: number) {
        this.fetchAllComsWithSize(size, page);
    }

    private fetchAllComs() {

        const res: HttpHeaders = new HttpHeaders();

        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.set('Content-Type', 'application/json');

        this.http.get(this.getAllUrl).subscribe(response => this.addDataAfterFetch(response));
    }

    private fetchAllComsWithSize(size: number, page: number) {

        const res: HttpHeaders = new HttpHeaders();

        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.set('Content-Type', 'application/json');

        this.http.get(this.getAllUrl + '?pagesize=' + size + '&page=' + page).subscribe(response => this.addDataAfterFetch(response));
    }


    private getDatabaseSize() {

        const res: HttpHeaders = new HttpHeaders();

        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.set('Content-Type', 'application/json');

        // @ts-ignore
        this.http.get(this.getDatabaseSizeUrl).subscribe(response => this.countDatabaseChange.next(response.count));
    }

    /**
     * After fetching all communications, prepare datas to fill datachange
     *
     * @param resp(response of HTTP request)
     */
    private addDataAfterFetch(resp: object) {


        console.log(resp);
        // @ts-ignore
        this.dataChange.next(resp.data);
        // @ts-ignore
        this.countDatabaseChange.next(resp.count);
    }
}

export class DataSourceObservable extends DataSource<any> {
    constructor(private database: DatabaseConnexion) {
        super();
    }

    connect(): Observable<object[]> {
        return this.database.dataChange;
    }

    getDatabaseSize(): Observable<number[]> {
        return this.database.countDatabaseChange;
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }
}
