const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './app.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition).myapp;

const client = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());

// Пример создания нового пользователя
client.CreateUser(
  {
    username: 'new_user',
    password: 'new_password',
    full_name: 'New User',
  },
  (error, response) => {
    if (!error) {
      console.log(response.message);
    } else {
      console.error(error.details);
    }
  }
);