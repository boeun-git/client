const {createServer} = require("http");
const app = require("./app");
const socketIo = require('socket.io');
const ioClient = require('socket.io-client');
require("dotenv").config();

describe('Socket.IO Test', () => {

    beforeAll(() => {

    });


  afterAll(() => {

  });

  test('should join a room', (done) => {
  
  });

  test('should leave a room', (done) => {
  
  });

  test('should send and receive messages', (done) => {

  });
});
