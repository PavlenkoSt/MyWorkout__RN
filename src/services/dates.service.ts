class DatesService {
  today = new Date().toISOString().split('T')[0];
}

export default new DatesService();
