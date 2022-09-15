export function convertDate(times) {
  let date = new Date(times);
  let month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  let day =
    date.getDate().toLocaleString().length === 1
      ? `0${date.getDate().toLocaleString()}`
      : date.getDate().toLocaleString();
  let year = date.getFullYear();
  return `${day} ${month[date.getMonth()]} ${year}`;
}
