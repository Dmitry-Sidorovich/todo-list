import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public week: string[] = [
    'Monday',
    'Tuesday ',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  public monthSelect: any;
  public dateSelect: any;
  public dateValue: any;

  constructor() {
  }

  ngOnInit(): void {
    this.getDaysFromDate(11, 2021)
  }

  getDaysFromDate(month: any, year: any) {

    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    this.monthSelect = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format('dddd'),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });
  }

  clickDay(day: any) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    this.dateValue  = moment(parse)
  }

  changeMonth(flag: any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month');
      this.getDaysFromDate(prevDate.format('MM'), prevDate.format('YYYY'));
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month');
      this.getDaysFromDate(nextDate.format('MM'), nextDate.format('YYYY'));
    }
  }

}
