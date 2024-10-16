
import {Kafka} from "kafkajs";
const Topicname = "zap-events"

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
  })


async function main() {
  const consumer = kafka.consumer({groupId: 'main-worker'});
  await consumer.connect();
  await consumer.subscribe({ topic: Topicname, fromBeginning: true })

  await consumer.run({
    autoCommit:false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      })
      //
      await new Promise(r => setTimeout(r, 1000));
      //
      console.log("processing done")
      //
      await consumer.commitOffsets([{
        topic : Topicname,
        partition : partition,
        offset : (parseInt(message.offset) + 1).toString()
      }])
    },
  })
}

main()