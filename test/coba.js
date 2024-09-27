// // Import library dan module yang diperlukan
// const supertest = require('supertest');
// const chai = require('chai');
// const app = require('../test'); // Gantilah dengan path sesuai dengan struktur proyek Anda

// // Inisialisasi Supertest dengan aplikasi
// const request = supertest(app);
// const expect = chai.expect;

// // Test case pertama
// describe('First Test', () => {
//   it('should return "Hello, World!"', async () => {
//     // Kirim permintaan GET ke endpoint
//     const response = await request.get('/hello');

//     // Asssertion menggunakan Chai
//     expect(response.status).to.equal(200);
//     expect(response.body.message).to.equal('Hello, World!');
//   });
// });

const request = require('supertest'); // Import Supertest
const chai = require('chai');
const expect = chai.expect;

// describe('POST LOGIN', () => {
//     it('login valid data', async () => {
//         const response = await request.post('https://kasir-api.zelz.my.id/authentications').set('Authorization', 'Bearer yourAccessToken').send({
//           key1: 'coffee2024_1@gmail.com',
//           key2: 'nopass123',
//         });  
//           // Lakukan asertasi (assertions) untuk memastikan respons sesuai dengan yang diharapkan
//           expect(response.status).to.equal(201); // 201 Created
//           expect(response.body).toHaveProperty('key1', 'value1');
//           expect(response.body).toHaveProperty('key2', 'value2');
//          // Tambahkan asertasi lain sesuai kebutuhan
//          // Menambahkan expect untuk memastikan respons adalah 200 OK
//         console.log((await response).status);
//         console.log((await response).body);
//     })
// });

describe('POST LOGIN', () => {
  it('login valid data', async () => {
      const response = await request
        .post('https://kasir-api.zelz.my.id/authentications')
        // .set('Authorization', 'Bearer yourAccessToken') // Ganti yourAccessToken dengan token yang valid jika diperlukan
        .send({
          email: 'coffee2024_1@gmail.com', // Pastikan key ini sesuai dengan API
          password: 'nopass123',               // Pastikan key ini sesuai dengan API
        });

      // Lakukan asertasi untuk memastikan respons sesuai dengan yang diharapkan
      expect(response.status).to.equal(201); // Jika API benar-benar mengembalikan 201
      expect(response.body).to.have.property('email').that.equals('coffee2024_1@gmail.com');
      expect(response.body).to.have.property('password').that.equals('nopass123');
      
      // Cetak status dan body respons untuk debugging
      console.log(response.status); // 201 atau status lain
      console.log(response.body);   // Cetak seluruh body dari respons
  });
});
