# homebridge-clap-sensors

A plugin for [Homebridge](https://github.com/nfarina/homebridge/) which provides sensors for detecting claps.

This is actually exposed as motion sensors within HomeKit, but it doesn't really matter since its basically the same thing. Detection can be used for triggering scenarios of your liking, such as turning of the lights when clapping twice.


## Dependencies

Dependens on [clap-detector](https://github.com/tom-s/clap-detector), which is automatically installed via npm. Clap detector in turn requires sox, which should be installed for your system before proceeding with the installation of this plugin.

Please see the README for [clap-detector](https://github.com/tom-s/clap-detector#readme) for further details regarding its dependencies in general and sox in particular.


## Installation

Install this plugin globally:

```
npm install -g homebridge-clap-sensors
```


## Configuration

Add the following to the `accessories` part of your Homebridge `config.json` file:

```

        {
            "platform": "ClapSensors",
            "name": "ClapSensors",
            "clapInterval": 2000,
            "resetAfter": 1000,
            "sensors": [
                {
                    "name": "Single clap",
                    "numberOfClaps": 1
                },
                {
                    "name": "Double clap",
                    "numberOfClaps": 2
                },
                {
                    "name": "Triple clap",
                    "numberOfClaps": 3
                }
            ]
        }
```
### Options explained

- **platform**: Has to be `ClapSensors`.
- **name**: Name of the sensor as it appears in HomeKit.
- **numberOfClaps** and **clapInterval**: How many claps that should be detected within the interval (milliseconds) in order for the sensor to trigger.
- **resetAfter**: The time (in milliseconds) it should take for the sensor to get back to its normal state, starting to listening for further claps.
