const gpio = require('onoff').Gpio
const fetch = require('node-fetch');
const light = new gpio(12, 'out');
const button = new gpio(26,'in','both');


button.watch((err, value) => {
    if (err){
        console.log("An error has occured.");
        throw err;
    }
    //Alert user button has been clicked.
    console.log("Button clicked!");
    light.writeSync(1);

    setTimeout(function(){light.writeSync(0)}, 1000)
});

const lightOff = () => {
    light.writeSync(0)
}

//Handle Ctrl+C to exit cleanly
process.on('SIGINT', () => {
    lightOff()
    button.unexport();
    process.exit();
})

lightOff();