const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

let encodedAddress = encodeURIComponent(argv.address)
let geocodeURL =  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBzjZBXOGIkSkWINShtVAlSFFsXGlE56gM`

axios.get(geocodeURL).then((res) => {
  if (res.data.status === 'ZERO_RESULTS') {
    throw new Error ('Unable to find address')
  }
  console.log(res.data)
}).catch((error) => {
  if (error.code === 'ENOTFOUND') {
    console.log('Unable to connect to API')
  } else {
    console.log(error.message)
  }
})


