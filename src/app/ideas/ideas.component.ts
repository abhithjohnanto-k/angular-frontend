import { AfterViewInit, Component,  ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';





export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
}

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent  {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource!: MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Define the URL of your Java API to fetch the JSON data
    const apiEndpoint = 'http://localhost:8080/users';

    // Make a GET request to the Java API
    this.http.get(apiEndpoint).subscribe(
      (data: any) => {
        // 'data' now contains the JSON string received from the API
        this.initializeDataSource(data);

        console.log('JSON data from API:', data);
      },
      (error) => {
        console.error('Error fetching JSON data from the API:', error);
      }
    );
  }

  initializeDataSource(jsonData: any) {
    const data = jsonData.data; // Assuming your JSON structure contains a 'data' property

    this.dataSource = new MatTableDataSource<PeriodicElement>(data);
    this.dataSource.paginator = this.paginator;
  }
}

