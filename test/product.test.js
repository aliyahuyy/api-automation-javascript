import request from 'supertest';
import { describe, it } from 'mocha'
import { expect } from 'chai'

// // Tambahkan opsi untuk melacak laporan
// const mochawesome = require('mochawesome');
// const reportDir = 'mochawesome-report';


const baseUrl = "https://kasir-api.zelz.my.id";
    //It Create
    //It Get
    //It Delete
    //Flow CRUD di API AUTOMATION

describe('fitur product', () => {
    global.testData = {};
//CREATE
it("Positive - Success Add Product", async () =>{
    //POST method
    const payload = { //data yang akan dikirim
        "category_id" : "b0faa020-1729-4bed-bac6-974e0d1a278b",
        "code": "A314ASDDFIER3432",
        "name": "Taro Seaweed",
        "price": "5000",
        "cost": "3000",
        "stock": "5"
      }
      const token = global.testData.token
      const response = await request(baseUrl).post('/products')
        .send(payload)
        //header
        .set('accept','application/json')
        .set('Authorization', `Bearer ${token}`)
        //console.log('Response:', response.body); // Log untuk melihat isi respons
        

        // Lakukan assert untuk memastikan respons sesuai dengan yang diharapkan using chai
        expect(response.body).to.exist; // Pastikan body ada
        expect(response.status).to.equal(201); // Jika API benar-benar mengembalikan 201
        expect(response.body.message).to.equal("Product berhasil ditambahkan")
        expect(response.body.data).to.be.an('object', 'Data must be an object');

        global.testData.productId = response.body.data.productId
});

//GET
it('Positive - get Product detail', async () => {
    const token = global.testData.token
    const productId = global.testData.productId

    const response = await request(baseUrl).get(`/products/${productId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)

        expect(response.body).to.exist; // Pastikan body ada
        expect(response.status).to.equal(200);
        expect(response.body.data.product).to.have.property('code');
        expect(response.body.data.product).to.have.property('name');
        expect(response.body.data.product).to.have.property('description');
        expect(response.body.data.product).to.have.property('price');
        expect(response.body.data.product).to.have.property('cost');
        expect(response.body.data.product).to.have.property('cost_average');
        expect(response.body.data.product).to.have.property('category_name');
        expect(response.body.data.product).to.have.property('category_id');
        expect(response.body.data.product).to.have.property('stock');
});

//UPDATE
it("Positive - Success Update Product", async () =>{
    //PUT method
    const payload = { //data yang akan dikirim
        "category_id" : "b0faa020-1729-4bed-bac6-974e0d1a278b",
        "code": "A314ASDDFIER3432",
        "name": "Taro Seaweed",
        "price": "3500",
        "cost": "3000",
        "stock": "5"
      }
      const token = global.testData.token
      const productId = global.testData.productId
      const response = await request(baseUrl).put(`/products/${productId}`)
        .send(payload)
        //header
        .set('accept','application/json')
        .set('Authorization', `Bearer ${token}`)
        //console.log('Response:', response.body); // Log untuk melihat isi respons
        

        // Lakukan assert untuk memastikan respons sesuai dengan yang diharapkan using chai
        expect(response.body).to.exist; // Pastikan body ada
        expect(response.status).to.equal(200); // Jika API benar-benar mengembalikan 201
        expect(response.body.message).to.equal("Product berhasil diupdate")
        expect(response.body.data).to.be.an('object', 'Data must be an object');
});

//DELETE
it("Positive - Success Delete Product", async () =>{
    //DELETE Method
      const token = global.testData.token
      const productId = global.testData.productId
      const response = await request(baseUrl).delete(`/products/${productId}`)
        //header
        .set('accept','application/json')
        .set('Authorization', `Bearer ${token}`)
        //console.log('Response:', response.body); // Log untuk melihat isi respons
        

        // Lakukan assert untuk memastikan respons sesuai dengan yang diharapkan using chai
        expect(response.status).to.equal(200); // Jika API benar-benar mengembalikan 201
        expect(response.body.status).to.equal("success")
        expect(response.body.message).to.equal("Product berhasil dihapus")
});

// // Gunakan opsi reporter mochawesome
// const options = {
//     reporterOptions: {
//       reportDir: reportDir,
//       reportFilename: 'report',
//       reportTitle: 'Mochawesome Report',
//     },
//   };
  
//   // Tambahkan opsi ke run() function untuk menggunakan opsi reporter mochawesome
//   mochawesome.reporter('mochawesome', options);
})
