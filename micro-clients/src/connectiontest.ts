import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

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
const clientProxy: ClientProxy = ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'api_to_client_queue',
    },
  });

//ClientProxyFactory.create(connectionOptions);

// Test function to publish a test message to the queue
async function testConnection(): Promise<void> {
  try {
    // Send a test message to the queue
    await clientProxy.emit('test_event', { message: 'Test message' }).toPromise();
    console.log('Message sent successfully. Connection to broker is working.');
  } catch (error) {
    console.error('Failed to send message:', error);
  } finally {
    // Close the connection
    await clientProxy.close();
  }
}

// Call the test function
testConnection();
