const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const { Kafka, Partitioners } = require('kafkajs');
const schema = require('./models/dataSchema');
require('./config/database');

const app = express();
app.use(bodyParser.json());

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const admin = kafka.admin();

const run = async () => {
  await admin.connect();
  const retentionTime = 2 * 60 * 60 * 1000;

  try {
    const topic = 'loco-data';
    const topicExists = await admin.listTopics();

    if (!topicExists.includes(topic)) {
      await admin.createTopics({
        topics: [
          {
            topic,
            numPartitions: 1,
            replicationFactor: 1,
            configEntries: [
              { name: 'retention.ms', value: `${retentionTime}` }
            ]
          }
        ]
      });
      console.log(`Topic "${topic}" created successfully.`);
    } else {
      console.log(`Topic "${topic}" already exists.`);
    }

    if (topicExists.includes(topic)) {
      const consumer = kafka.consumer({ groupId: 'loco-group' });
      await consumer.connect();
      await consumer.subscribe({ topic: 'loco-data' });

      await consumer.run({
        eachMessage: async ({ message }) => {
          try {
            const receiveData = JSON.parse(message.value.toString());
            console.log('Data received from Kafka:', receiveData);

            const Order = mongoose.model('locomotive', schema);

            const order = new Order({
              LocoCode: receiveData.LocoCode,
              LocoName: receiveData.LocoName,
              LocoLength: receiveData.LocoLength,
              LocoWidth: receiveData.LocoWidth,
              LocoHeigth: receiveData.LocoHeigth,
              Status: receiveData.Status,
              DateAndTime: receiveData.DateAndTime
            });

            const savedOrder = await order.save();
            console.log('Data saved to MongoDB:', savedOrder);
          } catch (error) {
            console.error('Error saving to MongoDB:', error);
          }
        }
      });
    } else {
      console.log('Consumer cannot be started as the topic does not exist.');
    }
  } catch (error) {
    console.error('Error creating or checking topic:', error);
  } finally {
    await admin.disconnect();
  }
};

run().catch(console.error);

app.post("/receive-data", async (req, res) => {
  const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
  });

  await producer.connect();

  const receiveData = req.body;
  console.log("Received data:", receiveData);

  try {
    await producer.send({
      topic: 'loco-data',
      messages: [{ value: JSON.stringify(receiveData) }]
    });

    console.log('Pesan berhasil dikirim ke Kafka:', receiveData);
    res.status(200).json({ message: 'Pesan berhasil dikirim ke Kafka' });
  } catch (error) {
    console.error('Gagal mengirim pesan ke Kafka:', error);
    res.status(500).json({ error: 'Gagal mengirim pesan ke Kafka' });
  } finally {
    await producer.disconnect();
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
