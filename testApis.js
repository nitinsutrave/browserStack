'use strict'

const BrowserStack = require('./index')

const main = function () {
  const bs = BrowserStack({
    username: '', // Set your username here
    accessKey: '' // Set your access key here
  })

  // bs.createWorker({
  //   os: 'android',
  //   os_version: '4.3',
  //   url: 'www.google.com'
  // },
  //   (data) => {
  //   console.log('data: ' +data)
  // })

  // bs.getWorkerStatus({
  //   workerId: '83049462'
  // },
  //   (data) => {
  //   console.log('data: ' +data)
  // })

  // bs.getWorkers(
  //   (data) => {
  //   console.log('data: ' +data)
  // })

// bs.terminateWorker({
//     workerId: '83049620'
//   },
//     (data) => {
//     console.log('data: ' +data)
//   })

  bs.getScreenshot({
    workerId: '83049675',
    format: 'xml'
  },
    (data) => {
    console.log('data: ' +data)
  })
}

main()
