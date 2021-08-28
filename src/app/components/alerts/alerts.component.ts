import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Alert} from "../../models/alert-model";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {AuthService} from "../../services/auth.service";
import {MatPaginator} from "@angular/material/paginator";

export interface TableAlert extends Alert {
  checked: boolean
}

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})

export class AlertsComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['name', 'description', 'severity', 'date', 'source', 'alert_id', 'checked'];
  dataSource: MatTableDataSource<TableAlert> = new MatTableDataSource<TableAlert>([]);

  timer = 1;
  intervalSub: any;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private service: DataService,
    private http: AuthService) {

    this.service.connect();
  }

  messages: TableAlert[] = [];
  user = this.http.getUserName();
  messagesFromLocalStorage = localStorage.getItem(this.user)

  ngOnInit() {

    if (this.messagesFromLocalStorage) {
      console.log(this.messagesFromLocalStorage);
      this.dataSource = new MatTableDataSource<TableAlert>(JSON.parse(this.messagesFromLocalStorage));
      setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }
      )
    }

    this.service.messages$.subscribe(mess => {
        this.dataSource = new MatTableDataSource([
            {
              "name": mess.name,
              "description": mess.description,
              "date": mess.date,
              "source": mess.source,
              "alert_id": mess.alert_id,
              "severity": mess.severity,
              "checked": false
            },
            ...this.dataSource.data
          ]
        )
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.service.setToLocalStorage(this.user, this.dataSource.data);
      }
    )


  }

  ngAfterViewInit(): void {
    this.intervalSub = setInterval(() => {
      this.timerFunc();
    }, 1000);
  }

  timerFunc(): void {
    if (this.timer < 15) {
      this.timer++
    } else {
      this.timer = 1
    }
  }


  onCheck(value: any): void {
    const tempMess: TableAlert[] = this.dataSource.data.filter(obj => {
      return obj.alert_id === value.alert_id;
    })

    this.dataSource.data = this.dataSource.data.filter(function (obj) {
      return obj.alert_id !== value.alert_id;
    });

    tempMess[0].checked = true;

    this.dataSource.data = [...this.dataSource.data, ...tempMess]
  }

  ngOnDestroy() {
    this.intervalSub.unsubscribe;
  }
}
