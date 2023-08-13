class DatesService {
  today = new Date().toISOString().split('T')[0];

  isPassedDate = (date: Date) => new Date(this.today) > date;
}

export default new DatesService();
