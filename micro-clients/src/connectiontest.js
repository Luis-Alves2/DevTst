"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var microservices_1 = require("@nestjs/microservices");
// Define connection options for RabbitMQ
/*
const connectionOptions = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'], // Replace with your broker URL if necessary
    queue: 'api_to_client_queue', // Replace with the name of the queue you want to test
  },
};
*/
// Create a client proxy with the connection options
var clientProxy = microservices_1.ClientProxyFactory.create({
    transport: microservices_1.Transport.RMQ,
    options: {
        urls: ['amqp://localhost:5672'],
        queue: 'api_to_client_queue',
    },
});
//ClientProxyFactory.create(connectionOptions);
// Test function to publish a test message to the queue
function testConnection() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 5]);
                    // Send a test message to the queue
                    return [4 /*yield*/, clientProxy.emit('test_event', { message: 'Test message' }).toPromise()];
                case 1:
                    // Send a test message to the queue
                    _a.sent();
                    console.log('Message sent successfully. Connection to broker is working.');
                    return [3 /*break*/, 5];
                case 2:
                    error_1 = _a.sent();
                    console.error('Failed to send message:', error_1);
                    return [3 /*break*/, 5];
                case 3: 
                // Close the connection
                return [4 /*yield*/, clientProxy.close()];
                case 4:
                    // Close the connection
                    _a.sent();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Call the test function
testConnection();
