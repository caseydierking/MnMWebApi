const gpio = require('onoff').Gpio
const light = new gpio(12, 'out');


const sleep = (howLong) => {
    return new Promise((resolve) => {
        setTimeout(resolve, howLong)
    })
}

const cycleLight = async () => {
    while (true){
    light.writeSync(1);
    await sleep(3000)
    light.writeSync(0)
    await sleep(1000)
    }
}

const lightOff = () => {
    light.writeSync(0)
}

//Handle Ctrl+C to exit cleanly
process.on('SIGINT', () => {
    lightOff()
    process.exit();
})

lightOff();
cycleLight();
