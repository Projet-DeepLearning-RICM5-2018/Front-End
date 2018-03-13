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

  constructor(
    private _statsService: StatsService,
  ) { }

  ngOnInit() {
    this._statsService.getAccuracy().subscribe(
      res => {
        this.accuracyData = res;
      }
    );
    this._statsService.getTodayPrediction().subscribe(
      res => this.todayPred = res
    )
  }

}
