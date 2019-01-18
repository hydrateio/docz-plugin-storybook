import addons from '@storybook/addons'
import createChannel from './docz-transport'

function traceMethodCalls(obj) {
  const handler = {
    get(target, propKey, receiver) {
      const targetValue = Reflect.get(target, propKey, receiver)
      if (typeof targetValue === 'function') {
        return function (...args) {
          // console.log('CHANNEL CALL', propKey, args)
          return targetValue.apply(this, args) // (A)
        }
      } else {
        return targetValue
      }
    }
  }
  return new Proxy(obj, handler)
}

const tempChannel = createChannel({ page: 'manager' })

export const channel = traceMethodCalls(tempChannel)
console.log('setting channel')
addons.setChannel(channel)
