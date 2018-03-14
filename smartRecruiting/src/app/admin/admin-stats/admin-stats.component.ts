import { Component, OnInit } from '@angular/core';
import {StatsService} from '../../services/stats.service';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.css']
})
export class AdminStatsComponent implements OnInit {

  public accuracyData: any;
  public todayPred: any;

  public accuracyError: boolean;
  public todayError: boolean;

  constructor(
    private _statsService: StatsService,
  ) { }

  ngOnInit() {
    this.accuracyError = false;
    this.todayError = false;
    this._statsService.getAccuracy().subscribe(
      res => {
        this.accuracyData = res;
      }, error2 => {
        this.accuracyError = true;
      }
    );
     this._statsService.getTodayPrediction().subscribe(
      res => {
        this.todayPred = res;
      }, error2 => {
        this.todayError = true;
      }
    );
  }

}
