import React from 'react';

export function LayoutWelcome() {
  const username = localStorage.getItem('username');
  let teamName;

  if (username === 'business') {
    teamName = 'Business Team';
  } else if (username === 'marketing') {
    teamName = 'Marketing Team';
  } else if (username === 'netmonk') {
    teamName = 'Netmonk';
  } else if (username === 'po-netmonk') {
    teamName = 'PO Netmonk';
  } else if (username === 'tim-doa-dbt') {
    teamName = 'Tim DOA DBT';
  } else if (username === 'tim-fulfillment') {
    teamName = 'Tim Fulfillment';
  } else if (username === 'SDA-pusat') {
    teamName = 'Tim SDA Pusat';
  } else if (username === 'SDA Telkom') {
    teamName = 'Tim SDA Telkom';
  } else if (username === 'treg-1') {
    teamName = 'TREG-1';
  } else if (username === 'treg-2') {
    teamName = 'TREG-2';
  } else if (username === 'treg-3') {
    teamName = 'TREG-3';
  } else if (username === 'treg-4') {
    teamName = 'TREG-4';
  } else if (username === 'treg-5') {
    teamName = 'TREG-5';
  } else if (username === 'treg-6') {
    teamName = 'TREG-6';
  } else if (username === 'treg-7') {
    teamName = 'TREG-7';
  } else if (username === 'witel-aceh') {
    teamName = 'Witel Aceh';
  } else if (username === 'witel-babel') {
    teamName = 'Witel Babel';
  } else if (username === 'witel-bengkulu') {
    teamName = 'Witel Bengkulu';
  } else if (username === 'witel-jambi') {
    teamName = 'Witel Jambi';
  } else if (username === 'witel-lampung') {
    teamName = 'Witel Lampung';
  } else if (username === 'witel-medan') {
    teamName = 'Witel Medan';
  } else if (username === 'witel-ridar') {
    teamName = 'Witel Ridar';
  } else if (username === 'witel-rikep') {
    teamName = 'Witel Rikep';
  } else if (username === 'witel-sumbar') {
    teamName = 'Witel Sumbar';
  } else if (username === 'witel-sumsel') {
    teamName = 'Witel Sumsel';
  } else if (username === 'witel-sumut') {
    teamName = 'Witel Sumut';
  } else if (username === 'witel-banten') {
    teamName = 'Witel Banten';
  } else if (username === 'witel-bekasi') {
    teamName = 'Witel Bekasi';
  } else if (username === 'witel-bogor') {
    teamName = 'Witel Bogor';
  } else if (username === 'witel-jakbar') {
    teamName = 'Witel Jakbar';
  } else if (username === 'witel-jakpus') {
    teamName = 'Witel Jakpus';
  } else if (username === 'witel-jaksel') {
    teamName = 'Witel Jaksel';
  } else if (username === 'witel-jaktim') {
    teamName = 'Witel Jaktim';
  } else if (username === 'witel-jakut') {
    teamName = 'Witel Jakut';
  } else if (username === 'witel-tangerang') {
    teamName = 'Witel Tangerang';
  } else if (username === 'witel-bandung') {
    teamName = 'Witel Bandung';
  } else if (username === 'witel-cirebon') {
    teamName = 'Witel Cirebon';
  } else if (username === 'witel-karawang') {
    teamName = 'Witel Karawang';
  } else if (username === 'witel-sukabumi') {
    teamName = 'Witel Sukabumi';
  } else if (username === 'witel-tasikmalaya') {
    teamName = 'Witel Tasikmalaya';
  } else if (username === 'witel-bandung-barat') {
    teamName = 'Witel Bandung Barat';
  } else if (username === 'witel-yogyakarta') {
    teamName = 'Witel Yogyakarta';
  } else if (username === 'witel-kudus') {
    teamName = 'Witel Kudus';
  } else if (username === 'witel-magelang') {
    teamName = 'Witel Magelang';
  } else if (username === 'witel-pekalongan') {
    teamName = 'Witel Pekalongan';
  } else if (username === 'witel-purwokerto') {
    teamName = 'Witel Purwokerto';
  } else if (username === 'witel-semarang') {
    teamName = 'Witel Semarang';
  } else if (username === 'witel-solo') {
    teamName = 'Witel Solo';
  } else if (username === 'witel-denpasar') {
    teamName = 'Witel Denpasar';
  } else if (username === 'witel-gresik') {
    teamName = 'Witel Gresik';
  } else if (username === 'witel-jember') {
    teamName = 'Witel Jember';
  } else if (username === 'witel-kediri') {
    teamName = 'Witel Kediri';
  } else if (username === 'witel-madiun') {
    teamName = 'Witel Madiun';
  } else if (username === 'witel-malang') {
    teamName = 'Witel Malang';
  } else if (username === 'witel-ntb') {
    teamName = 'Witel NTB';
  } else if (username === 'witel-ntt') {
    teamName = 'Witel NTT';
  } else if (username === 'witel-pasuruan') {
    teamName = 'Witel Pasuruan';
  } else if (username === 'witel-surabaya-selatan') {
    teamName = 'Witel Surabaya Selatan';
  } else if (username === 'witel-singaraja') {
    teamName = 'Witel Singaraja';
  } else if (username === 'witel-surabaya-utara') {
    teamName = 'Witel Surabaya Utara';
  } else if (username === 'witel-sidoarjo') {
    teamName = 'Witel Sidoarjo';
  } else if (username === 'witel-madura') {
    teamName = 'Witel Madura';
  } else if (username === 'witel-balikpapan') {
    teamName = 'Witel Balikpapan';
  } else if (username === 'witel-kalbar') {
    teamName = 'Witel Kalbar';
  } else if (username === 'witel-kalsel') {
    teamName = 'Witel Kalsel';
  } else if (username === 'witel-kaltara') {
    teamName = 'Witel Kaltara';
  } else if (username === 'witel-kalteng') {
    teamName = 'Witel Kalteng';
  } else if (username === 'witel-samarinda') {
    teamName = 'Witel Samarinda';
  } else if (username === 'witel-gorontalo') {
    teamName = 'Witel Gorontalo';
  } else if (username === 'witel-makassar') {
    teamName = 'Witel Makassar';
  } else if (username === 'witel-maluku') {
    teamName = 'Witel Maluku';
  } else if (username === 'witel-papua') {
    teamName = 'Witel Papua';
  } else if (username === 'witel-papua-barat') {
    teamName = 'Witel Papua Barat';
  } else if (username === 'witel-sulselbar') {
    teamName = 'Witel Sulselbar';
  } else if (username === 'witel-sulteng') {
    teamName = 'Witel Sulteng';
  } else if (username === 'witel-sultra') {
    teamName = 'Witel Sultra';
  } else if (username === 'witel-sulutmalut') {
    teamName = 'Witel Sulutmalut';
  } else {
    teamName = 'Name Team';
  }

  return (
    <div className="flex flex-col space-y-2 mb-6">
      <h1 className="font-bold text-4xl text-gunmetal-90">Welcome, {teamName}!</h1>
      <p className="text-lg font-medium text-gunmetal-80">
        This dashboard aims to monitor the progress of your project.
      </p>
    </div>
  );
}

export default LayoutWelcome;
