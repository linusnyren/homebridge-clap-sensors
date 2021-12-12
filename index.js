let ClapDetector = require('clap-detector');
let Service, Characteristic;

module.exports = function (homebridge) {
  Homebridge = homebridge;
  Hap = homebridge.hap;
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerPlatform('homebridge-clap-sensors', "ClapSensors", clapSensors);
};

function clapSensors(log, config) {
  this.log = log;
  this.name = config.name;
  this.clapInterval = config.clapInterval;
  this.resetAfter = config.resetAfter;
  this.sensors = config.sensors;
  this.clap = new ClapDetector.default();

  this.sensors.forEach(sensor => {
    registerSensor(sensor, this.clap)
  });

}

const registerSensor = (sensor, clap) => {
  const uuid = Hap.uuid.generate(sensor.name);
  const accessory = new Homebridge.platformAccessory(sensor.name, uuid);
  const service = new Service.MotionSensor(sensor.name);

  clap.addClapsListener(claps => {
      service.setCharacteristic(Characteristic.MotionDetected, true);
      setTimeout(() => {
        service.setCharacteristic(Characteristic.MotionDetected, false);
      }, 1000)
  }, { number: sensor.numberOfClaps, delay: sensor.numberOfClaps == 1 ? 0 : this.clapInterval })

  accessory.getService(Hap.Service.AccessoryInformation)
    .setCharacteristic(Hap.Characteristic.Manufacturer, "Linus Nyrén")
    .setCharacteristic(Hap.Characteristic.Model, "Clap Sensor "+sensor.numberOfClaps);
  
  accessory.addService(service);
  Homebridge.publishExternalAccessories('homebridge-clap-sensors', [accessory]);
}