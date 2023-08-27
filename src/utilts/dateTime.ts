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
}

export default new DateTime();
