export const Witel = () => {
  const username = localStorage.getItem('username');
  let teamName;

  if (username === 'witel-aceh') {
    teamName = 'Aceh';
  } else if (username === 'witel-babel') {
    teamName = 'Babel';
  } else if (username === 'witel-bengkulu') {
    teamName = 'Bengkulu';
  } else if (username === 'witel-jambi') {
    teamName = 'Jambi';
  } else if (username === 'witel-lampung') {
    teamName = 'Lampung';
  } else if (username === 'witel-medan') {
    teamName = 'Medan';
  } else if (username === 'witel-ridar') {
    teamName = 'Ridar';
  } else if (username === 'witel-rikep') {
    teamName = 'Rikep';
  } else if (username === 'witel-sumbar') {
    teamName = 'Sumbar';
  } else if (username === 'witel-sumsel') {
    teamName = 'Sumsel';
  } else if (username === 'witel-sumut') {
    teamName = 'Sumut';
  } else if (username === 'witel-banten') {
    teamName = 'Banten';
  } else if (username === 'witel-bekasi') {
    teamName = 'Bekasi';
  } else if (username === 'witel-bogor') {
    teamName = 'Bogor';
  } else if (username === 'witel-jakbar') {
    teamName = 'Jakbar';
  } else if (username === 'witel-jakpus') {
    teamName = 'Jakpus';
  } else if (username === 'witel-jaksel') {
    teamName = 'Jaksel';
  } else if (username === 'witel-jaktim') {
    teamName = 'Jaktim';
  } else if (username === 'witel-jakut') {
    teamName = 'Jakut';
  } else if (username === 'witel-tangerang') {
    teamName = 'Tangerang';
  } else if (username === 'witel-bandung') {
    teamName = 'Bandung';
  } else if (username === 'witel-cirebon') {
    teamName = 'Cirebon';
  } else if (username === 'witel-karawang') {
    teamName = 'Karawang';
  } else if (username === 'witel-sukabumi') {
    teamName = 'Sukabumi';
  } else if (username === 'witel-tasikmalaya') {
    teamName = 'Tasikmalaya';
  } else if (username === 'witel-bandung-barat') {
    teamName = 'Bandung Barat';
  } else if (username === 'witel-yogyakarta') {
    teamName = 'Yogyakarta';
  } else if (username === 'witel-kudus') {
    teamName = 'Kudus';
  } else if (username === 'witel-magelang') {
    teamName = 'Magelang';
  } else if (username === 'witel-pekalongan') {
    teamName = 'Pekalongan';
  } else if (username === 'witel-purwokerto') {
    teamName = 'Purwokerto';
  } else if (username === 'witel-semarang') {
    teamName = 'Semarang';
  } else if (username === 'witel-solo') {
    teamName = 'Solo';
  } else if (username === 'witel-denpasar') {
    teamName = 'Denpasar';
  } else if (username === 'witel-gresik') {
    teamName = 'Gresik';
  } else if (username === 'witel-jember') {
    teamName = 'Jember';
  } else if (username === 'witel-kediri') {
    teamName = 'Kediri';
  } else if (username === 'witel-madiun') {
    teamName = 'Madiun';
  } else if (username === 'witel-malang') {
    teamName = 'Malang';
  } else if (username === 'witel-ntb') {
    teamName = 'NTB';
  } else if (username === 'witel-ntt') {
    teamName = 'NTT';
  } else if (username === 'witel-pasuruan') {
    teamName = 'Pasuruan';
  } else if (username === 'witel-surabaya-selatan') {
    teamName = 'Surabaya Selatan';
  } else if (username === 'witel-singaraja') {
    teamName = 'Singaraja';
  } else if (username === 'witel-surabaya-utara') {
    teamName = 'Surabaya Utara';
  } else if (username === 'witel-sidoarjo') {
    teamName = 'Sidoarjo';
  } else if (username === 'witel-madura') {
    teamName = 'Madura';
  } else if (username === 'witel-balikpapan') {
    teamName = 'Balikpapan';
  } else if (username === 'witel-kalbar') {
    teamName = 'Kalbar';
  } else if (username === 'witel-kalsel') {
    teamName = 'Kalsel';
  } else if (username === 'witel-kaltara') {
    teamName = 'Kaltara';
  } else if (username === 'witel-kalteng') {
    teamName = 'Kalteng';
  } else if (username === 'witel-samarinda') {
    teamName = 'Samarinda';
  } else if (username === 'witel-gorontalo') {
    teamName = 'Gorontalo';
  } else if (username === 'witel-makassar') {
    teamName = 'Makassar';
  } else if (username === 'witel-maluku') {
    teamName = 'Maluku';
  } else if (username === 'witel-papua') {
    teamName = 'Papua';
  } else if (username === 'witel-papua-barat') {
    teamName = 'Papua Barat';
  } else if (username === 'witel-sulselbar') {
    teamName = 'Sulselbar';
  } else if (username === 'witel-sulteng') {
    teamName = 'Sulteng';
  } else if (username === 'witel-sultra') {
    teamName = 'Sultra';
  } else if (username === 'witel-sulutmalut') {
    teamName = 'Sulutmalut';
  } else {
    teamName = 'Name Team';
  }

  teamName = teamName.toUpperCase();

  return teamName;
};

export default Witel;
