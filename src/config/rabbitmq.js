const amqplib = require('amqplib/callback_api');

const queue = 'register';


//sender
export const sender = (data) => amqplib.connect('amqp://localhost', (err, cnt) => {
    if (err) {
        throw err;
    }
    cnt.createChannel((err, channel1) => {
        if (err) {
            throw err;
        }
        channel1.assertQueue(queue);
        channel1.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    });
});

//receiver
const receiver = () => amqplib.connect('amqp://localhost', (err, cnt) => {
    if (err) {
        throw err;
    }
    cnt.createChannel((err, channel2) => {
        if (err) {
            throw err;
        }

        channel2.assertQueue(queue)
        channel2.consume(queue, (data) => {
            if (data !== null) {

                const msg = data.content.toString();
               channel2.ack(data);
                
                console.log("Message Received.....");
            
            }else
            {
                console.log("Consumer cancelled .....")
            }
        });
    });
});
receiver();




















// const amqplib = require('amqplib/callback_api');
// const queue = 'register';

// export const sender =(data) =>amqplib.connect('amqp://localhost', (err, cnt) => {
//     if (err) {
//         throw err;
//     }
//     cnt.createChannel((err, channel1) => {
//         if (err) {
//             throw err;
//         }
//         let msg = data;
//         channel1.assertQueue(queue);
//         channel1.sendToQueue(queue, Buffer.from(msg));
//     });

// });

// const receiver = () => amqplib.connect('amqp://localhost', (err, cnt) => {
//     if (err) {
//         throw err;
//     }
//     cnt.createChannel((err, channel2) => {
//         if (err) {
//             throw err;
//         }
//         channel2.assertQueue(queue);
//         channel2.consume(queue, (msg) => {
//             if (msg !== null) {
            
//                 console.log(msg.content.toString());
                
//             }
//             else {
//                 console.log("consumer cancelled")
//             }            
//         });
//     });
// });
// receiver();