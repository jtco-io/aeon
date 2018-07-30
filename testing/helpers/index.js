import {Selenium} from './selenium'

export const selenium = new Selenium()

beforeAll(async () => {
  await selenium.load().then(() => console.log('Selenium Driver Successfully Loaded'))
})

afterAll(async () => {
  // Cleanup `process.on('exit')` event handlers to prevent a memory leak caused by the combination of `jest` & `tmp`.
  for (const listener of process.listeners('exit')) {
    listener()
    process.removeListener('exit', listener)
  }
  await selenium.quit()
})


export const defaultTimeout = 10e3
