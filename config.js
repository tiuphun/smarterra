module.exports = {
    mqtt: {
      brokerUrl: 'mqtt://broker.hivemq.com:1883',
      topic: 'ict66/smarterra/sensors/',
      username: 'emqx',
      password: 'public',
      commandTopic: 'ict66/smarterra/commands'
    },
    mongodb: {
      uri: 'mongodb+srv://tiuphun:pQjEEQUNfbnrP2Ck@smartterra.vuoaa.mongodb.net/?retryWrites=true&w=majority&appName=SmartTerra'
    }
  };
  