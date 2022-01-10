const zigbeeHerdsmanConverters = require('zigbee-herdsman-converters');

const exposes = zigbeeHerdsmanConverters.exposes;
const ea = exposes.access;
const e = exposes.presets;
const fz = zigbeeHerdsmanConverters.fromZigbeeConverters;
const tz = zigbeeHerdsmanConverters.toZigbeeConverters;

const ptvo_switch = zigbeeHerdsmanConverters.findByDevice({modelID: 'ptvo.switch'});
fz.legacy = ptvo_switch.meta.tuyaThermostatPreset;



const device = {
    zigbeeModel: ['ptvo.reedswitch'],
    model: 'ptvo.reedswitch',
    vendor: 'Custom devices (DiY)',
    description: '[Configurable firmware](https://ptvo.info/zigbee-configurable-firmware-features/)',
    fromZigbee: [fz.ignore_basic_report, fz.battery, fz.on_off, fz.ptvo_switch_analog_input, fz.ptvo_multistate_action, fz.legacy.ptvo_switch_buttons,],
    toZigbee: [tz.ptvo_switch_trigger, tz.on_off, tz.ptvo_switch_analog_input,],
    exposes: [e.battery(),
      e.switch().withEndpoint('l2'),
      e.temperature().withEndpoint('l3'),
      e.humidity().withEndpoint('l3'),
      e.action(['single', 'double', 'triple', 'hold', 'release']),
      e.battery_voltage(),
],
    meta: {
        multiEndpoint: true,
        
    },
    endpoint: (device) => {
        return {
            l2: 2, l3: 3, l1: 1,
        };
    },
    
};

module.exports = device;
