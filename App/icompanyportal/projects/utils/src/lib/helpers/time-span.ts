import { padNumber } from './pad-number';

export class TimeSpan {
  get totalSeconds() {
    let totalSeconds = this.hours * Math.pow(60, 2);
    totalSeconds += this.minutes * 60;
    totalSeconds += this.seconds;
    return totalSeconds;
  }

  get hours() {
    return this._hours;
  }

  set hours(val: number) {
    this._hours = val;
    this.sanitize();
  }

  get minutes() {
    return this._minutes;
  }

  set minutes(val: number) {
    this._minutes = val;
    this.sanitize();
  }

  get seconds() {
    return this._seconds;
  }

  set seconds(val: number) {
    this._seconds = val;
    this.sanitize();
  }

  // tslint:disable-next-line: variable-name
  constructor(private _hours: number, private _minutes: number, private _seconds: number) {
    this.hours = this.hours ? this.hours : 0;
    this.minutes = this.minutes ? this.minutes : 0;
    this.seconds = this.seconds ? this.seconds : 0;
    this.sanitize();
  }

  static fromSeconds(seconds: number) {
    return new TimeSpan(0, 0, seconds);
  }

  sanitize() {
    if (this.seconds >= 60) {
      this._minutes += Math.floor(this.seconds / 60);
      this._seconds = this.seconds % 60;
    }
    if (this._minutes >= 60) {
      this._hours += Math.floor(this.minutes / 60);
      this._minutes = this.minutes % 60;
    }
  }

  toString() {
    return `${padNumber(this.hours)}:${padNumber(this.minutes)}:${padNumber(this.seconds)}`;
  }
}
