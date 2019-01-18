import baseAddons from 'node_modules/@storybook/addons'
import { ADDON_LOADED_EVENT } from '../addons/provider'

function traceMethodCalls(obj) {
  const handler = {
    get(target, propKey, receiver) {
      const targetValue = Reflect.get(target, propKey, receiver)
      if (typeof targetValue === 'function') {
        return function (...args) {
          // console.log('ADDONS CALL', propKey, args)
          const returnValue = targetValue.apply(this, args)
          if (propKey === 'register') {
            // let the provider know that a new addon was registered so it can load the addon
            const getChannel = Reflect.get(target, 'getChannel', receiver)
            const channel = getChannel.apply(this)
            channel.emit(ADDON_LOADED_EVENT, args[0])
          }

          return returnValue
        }
      } else {
        return targetValue
      }
    }
  }
  return new Proxy(obj, handler)
}

const addons = traceMethodCalls(baseAddons)
export default addons
