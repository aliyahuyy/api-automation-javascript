import request from 'supertest';
import { describe, it } from 'mocha'
import { expect } from 'chai'

// // Tambahkan opsi untuk melacak laporan
// const mochawesome = require('mochawesome');
// const reportDir = 'mochawesome-report';

const baseUrl = "https://kasir-api.zelz.my.id";

describe('POST LOGIN', () => {
    global.testData = {};

    it('login valid data', async function () {
      this.timeout(5000); //5detik
        const payload = { //data yang akan dikirim
          "email": "coffee2024_1@gmail.com",
          "password": "nopass123"
        }
        const response = await request(baseUrl).post('/authentications')
          .send(payload)
          .set("Content-Type","application/json")  //header
          
          //console.log('Response:', response.body); // Log untuk melihat isi respons
  
        // Lakukan assert untuk memastikan respons sesuai dengan yang diharapkan using chai
        expect(response.body).to.exist; // Pastikan body ada
        expect(response.status).to.equal(201); // Jika API benar-benar mengembalikan 201
        // expect(response.message).to.equal("Authentication berhasil ditambahkan");
        expect(response.body.data).to.be.an('object', 'Data must be an object');
        expect(response.body.data).to.have.property('accessToken');
        expect(response.body.data).to.have.property('refreshToken');

        // Simpan respons ke global object
        global.testData.token = response.body.data.accessToken;
    });

// // Gunakan opsi reporter mochawesome
// const options = {
//   reporterOptions: {
//     reportDir: reportDir,
//     reportFilename: 'report',
//     reportTitle: 'Mochawesome Report',
//   },
// };

// // Tambahkan opsi ke run() function untuk menggunakan opsi reporter mochawesome
// mochawesome.reporter('mochawesome', options);
  });