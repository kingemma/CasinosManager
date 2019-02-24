import { Component, OnInit, OnDestroy } from '@angular/core';
import { MockDataService, DashboardDto } from '../../../shared/service-proxy/mockdata.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  dashboardDto: DashboardDto = new DashboardDto();

  public timePromise: any;
 
  constructor(private service: MockDataService) {

  }

  ngOnInit() {
    this.timePromise = setInterval(
      () => {
        this.service.getDashboard()
          .subscribe((result) => {
            this.dashboardDto = result;
          });
      }, 5000);
  }

  ngOnDestroy() {
    clearTimeout(this.timePromise);
  }

}
