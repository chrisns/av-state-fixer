const axios = require('axios').default
const { HARMONY, NEO, INTERVAL } = process.env




const run = () => axios.get(`${HARMONY}/hubs/lounge/status`)
  .then(response => response.data.current_activity.slug)
  .then(async activity => {
    console.log(`current activity is:${activity}`)
    switch (activity) {
      case 'fire-tv':
        await neo('on', 1)
        await neoSwitch(0, 1)
        break
      case 'virgin-tv':
        await neo('on', 1)
        await neoSwitch(2, 1)
        await virginPower(true)
        break
      case 'appletv':
        await neo('on', 1)
        await neoSwitch(3, 1)
        break
      case 'xbox':
        await neo('on', 1)
        await neoSwitch(1, 1)
        break
      case 'shield':
        await neo('on', 1)
        await neoSwitch(4, 1)
        break
      case 'firetv-in-kitchen':
        await neo('on', 0)
        await neoSwitch(0, 0)
        break
      case 'virgin-in-kitchen':
        await neo('on', 0)
        await neoSwitch(2, 0)
        await virginPower(true)
        break
      case 'appletv-in-kitchen':
        await neo('on', 0)
        await neoSwitch(3, 0)
        break
      case 'xbox-in-kitchen':
        await neo('on', 0)
        await neoSwitch(1, 0)
        break
      case 'poweroff':
        await neo('off', 1)
        await neo('off', 0)
        await virginPower(false)
        break
    }
  })
  .catch(error => console.error(error))

const neo = (action, output) => axios.get(`${NEO}/CEC/${action}/Output/${output}`)
const neoSwitch = (input, output) => axios.get(`${NEO}/Port/set/${input}/${output}`)

const virginPower = desiredState =>
  axios.get(`${NEO}/Port/List`)
    .then(response => {
      let port = response.data.Ports.filter(port => port.Name == "TiVO")[0]
      console.log(`current port status is: ${port.Status}, desired state is ${desiredState ? 0 : 3}`)
      if (port.Status !== (desiredState ? 0 : 3)) {
        return axios.post(`${HARMONY}/hubs/lounge/devices/virginmedia/commands/power-toggle`, {})
          .then(response => console.log(response.data))
      }
    })


run()
setInterval(run, 1000 * INTERVAL)
