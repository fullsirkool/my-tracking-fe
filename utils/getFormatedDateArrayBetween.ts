export default (from: Date = new Date(), to: Date = new Date()): string[] => {
  const startDate = new Date(from);
  const endDate = new Date(to);

  const dateList: string[] = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dateList.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateList;
};
