const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      index: true
    },
    nomorSc: {
      type: Number,
      index: true
    },
    namaPelanggan: {
      type: String,
      required: [true, 'Customer Name is required!']
    },
    nomorHpPelanggan: {
      type: String
    },
    emailPelanggan: {
      type: String,
      validate: {
        validator(v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`
      },
      index: true
    },
    nomorInternet: {
      type: String
    },
    treg: {
      type: String,
      enum: ['TREG-1', 'TREG-2', 'TREG-3', 'TREG-4', 'TREG-5', 'TREG-6', 'TREG-7'],
      required: [true, 'TREG is required!']
    },
    witel: {
      type: String,
      enum: [
        'ACEH',
        'BABEL',
        'BENGKULU',
        'JAMBI',
        'LAMPUNG',
        'MEDAN',
        'RIDAR',
        'RIKEP',
        'SUMBAR',
        'SUMSEL',
        'SUMUT',
        'BANTEN',
        'BEKASI',
        'BOGOR',
        'JAKBAR',
        'JAKPUS',
        'JAKSEL',
        'JAKTIM',
        'JAKUT',
        'TANGERANG',
        'BANDUNG',
        'CIREBON',
        'KARAWANG',
        'SUKABUMI',
        'TASIKMALAYA',
        'BANDUNG BARAT',
        'YOGYAKARTA',
        'KUDUS',
        'MAGELANG',
        'PEKALONGAN',
        'PURWOKERTO',
        'SEMARANG',
        'SOLO',
        'DENPASAR',
        'JEMBER',
        'KEDIRI',
        'MADIUN',
        'MALANG',
        'NTB',
        'NTT',
        'PASURUAN',
        'SURABAYA SELATAN',
        'SINGARAJA',
        'SURABAYA UTARA',
        'SIDOARJO',
        'MADURA',
        'BALIKPAPAN',
        'KALBAR',
        'KALSEL',
        'KALTARA',
        'KALTENG',
        'SAMARINDA',
        'GORONTALO',
        'MAKASSAR',
        'MALUKU',
        'PAPUA',
        'PAPUA BARAT',
        'SULSELBAR',
        'SULTENG',
        'SULTRA',
        'SULUTMALUT'
      ],
      required: [true, 'Witel is required!']
    },
    produk: {
      type: String,
      enum: ['Netmonk HI', 'Netmonk Prime']
    },
    pic: {
      type: String
    },
    sid: {
      type: Number
    },
    statusAktivasi: {
      type: String,
      enum: ['Activated', 'Not Activated', 'Deactivated']
    },
    statusFulfillment: {
      type: String,
      enum: [
        'Butuh Dokumen SPK/Kontrak',
        'Canceled Order',
        'Completed by Netmonk (next PJM)',
        'Proses Aktivasi Akun',
        'Proses BAA dan Closing WFM'
      ]
    },
    statusResume: {
      type: String,
      enum: [
        'OSS - PROVISIONING START',
        'MYCX - SEND OPEN PAPERLESS',
        'OSS - TESTING SERVICE',
        'OSS - PROVISIONING DESAIN',
        '7 | OSS - PROVISIONING ISSUED',
        '10 | OSS - PROVISIONING COMPLETE',
        'OSS - FALLOUT',
        'MYCX - FAIL'
      ]
    },
    statusWFM: {
      type: String,
      enum: ['To Do', 'On Progress', 'Closed', 'Cancel']
    },
    tanggalOrder: {
      type: Date,
      default: Date.now
    },
    orderCreatedDate: {
      type: Date,
      default: Date.now
    },
    orderClosingDate: {
      type: Date,
      default: () => Date.now() + 30 * 24 * 60 * 60 * 1000
    },
    username: {
      type: String
    },
    password: {
      type: String,
      set: (password) => {
        if (password.length < 4) {
          return password;
        }
        return password[0] + '*'.repeat(password.length - 2) + password[password.length - 1];
      }
    },
    secretKey: {
      type: String,
      set: (secretKey) => {
        if (secretKey.length < 4) {
          return secretKey;
        }
        return secretKey[0] + '*'.repeat(secretKey.length - 2) + secretKey[secretKey.length - 1];
      }
    },
    catatan: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
