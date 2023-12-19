const PROTO_PATH = "../product.proto";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const ProductService = grpc.loadPackageDefinition(packageDefinition).ProductService;
const client = new ProductService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

module.exports = client;