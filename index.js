const axios = require('axios').default
const {HARMONY, HDANYWHERE} = process.env
// const TiVoDiscovery = require('tivo-remote')

const run = () => axios.get(`${HARMONY}/hubs/lounge/status`)
.then(response => response.data.current_activity.slug)
.then(async activity => {
  console.log(`current activity is:${activity}`)
  switch (activity) {
    case 'fire-tv':
      await matrixOn()
      await matrixSwitch('c', 2)
      await tvOn()
    break
    case 'virgin-tv':
      await matrixOn()
      await matrixSwitch('c', 1)
      await tvOn()
      break
    case 'kodi':
      await matrixOn()
      await matrixSwitch('c', 3)
      await tvOn()
      break
    case 'xbox':
      await matrixOn()
      await matrixSwitch('c', 4)
      await tvOn()
      break
    case 'firetv-in-kitchen':
      await matrixOn()
      await matrixSwitch('d', 2)
      await tvOff()
      break
    case 'virgin-in-kitchen':
      await matrixOn()
      await matrixSwitch('d', 1)
      await tvOff()
      break
    case 'kodi-in-kitchen':
      await matrixOn()
      await matrixSwitch('d', 3)
      await tvOff()
      break
    case 'xbox-in-kitchen':
      await matrixOn()
      await matrixSwitch('d', 4)
      await tvOff()
      break
    case 'poweroff':
      await tvOff()
      await matrixOff()
      break
  }
})
.catch(error => console.error(error))



// var device = 

// TiVoDiscovery.on('founddevice', (device) => {
//         console.log(`Found a device: ${device.name} (${device.ip})`);
//     })
//     // .on('lostdevice', (device) => {
//     //     console.log(`Lost a device: ${device.name} (${device.ip})`);
//     // })
//     .discover();

// const dev = new TiVoRemote({name: 'virgin', addresses: ['192.168.0.55']})
// dev.sendIrcode('STANDBY')
// dev.deinit()

const tvOn = () => axios.post(`${HDANYWHERE}/api/command/irpass/11`, {"irdata":"0000,006C,0022,0002,015B,00AD,0016,0016,0016,0016,0016,0041,0016,0016,0016,0016,0016,0016,0016,0016,0016,0016,0016,0041,0016,0041,0016,0016,0016,0041,0016,0041,0016,0041,0016,0041,0016,0041,0016,0041,0016,0016,0016,0016,0016,0016,0016,0041,0016,0041,0016,0041,0016,0016,0016,0016,0016,0041,0016,0041,0016,0041,0016,0016,0016,0016,0016,0016,0016,0041,0016,05F7,015B,0057,0016,0E6C"})
const tvOff = () => axios.post(`${HDANYWHERE}/api/command/irpass/11`, {"irdata":"0000,006C,0022,0002,015B,00AD,0016,0016,0016,0016,0016,0041,0016,0016,0016,0016,0016,0016,0016,0016,0016,0016,0016,0041,0016,0041,0016,0016,0016,0041,0016,0041,0016,0041,0016,0041,0016,0041,0016,0016,0016,0041,0016,0016,0016,0016,0016,0041,0016,0041,0016,0041,0016,0016,0016,0041,0016,0016,0016,0041,0016,0041,0016,0016,0016,0016,0016,0016,0016,0041,0016,05F7,015B,0057,0016,0E6C"})

const matrixOn = () => axios.get(`${HDANYWHERE}/api/power/1`)
const matrixOff = () => axios.get(`${HDANYWHERE}/api/power/0`)
const matrixSwitch = (output, input) => axios.get(`${HDANYWHERE}/api/control/switch/${output}/${input}`)



run()
