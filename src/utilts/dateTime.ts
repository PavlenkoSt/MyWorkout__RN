class DateTime {
  private addZero(number: number) {
    if (+number < 10) {
      return `0${number}`;
    }

    return number;
  }

  public getTodayDate() {
    const date = new Date();

    const year = date.getFullYear();
    const month = this.addZero(date.getMonth() + 1);
    const day = this.addZero(date.getDate());

    return `${year}-${month}-${day}`;
  }

  public isToday(dateString: string) {
    return dateString === this.getTodayDate();
  }

  public getCurrentTime() {
    const date = new Date();
    return `${this.addZero(date.getHours())}-${this.addZero(
      date.getMinutes(),
    )}-${this.addZero(date.getSeconds())}`;
  }

  public getCurrentDateTime() {
    return this.getTodayDate() + 'T' + this.getCurrentTime();
  }
}

export default new DateTime();
