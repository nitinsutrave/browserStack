'use strict'

const https = require('https')
const querystring = require('querystring')

const BrowserStack = function (config) {
  // Set the common vars required for the APIs
  const host = 'api.browserstack.com'
  const username = config.username
  const accessKey = config.accessKey
  const auth = `${username}:${accessKey}`

  // Helper to parse the response received for the http request
  const parseResponse = function (res, callback) {
    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', (chunk) => { rawData += chunk })
    res.on('end', () => {
      callback(rawData)
    })
  }

  // Helper to make the http request
  const httpRequest = function (method, path, callback) {
    const req = https.request({
      method,
      host,
      path,
      auth
    }, (res) => {
      parseResponse(res, callback)
    })
    req.end();
  }

  // The methods that will be exposed for this module
  const wrapperMethods = {

    // The API for getting the browsers
    getBrowsers: function (options, callback) {
      const queryParams = querystring.stringify(options)
      var path = '/4/browsers'
      if (queryParams) {
        path = `${path}?${queryParams}`
      }
      httpRequest('GET', path, callback)
    },

    // The API for creating a worker
    createWorker: function (options, callback) {
      if (options.url) {
        options.url = encodeURI(options.url)
      }
      const queryParams = querystring.stringify(options)
      var path = '/4/worker'
      if (queryParams) {
        path = `${path}?${queryParams}`
      }

      httpRequest('POST', path, callback)
    },

    // The API for terminating a worker
    terminateWorker: function (options, callback) {
      const path = `/4/worker/${options.workerId}`
      httpRequest('DELETE', path, callback)
    },

    // The API for getting the status for a given worker
    getWorkerStatus: function (options, callback) {
      const path = `/4/worker/${options.workerId}`
      httpRequest('GET', path, callback)
    },

    // The API for getting a list of all workers
    getWorkers: function (callback) {
      const path = '/4/workers'
      httpRequest('GET', path, callback)
    },

    getStatus: function (callback) {
      const path = '/4/status'
      httpRequest('GET', path, callback)
    },

    getScreenshot: function (options, callback) {
      const path = `/4/worker/${options.workerId}/screenshot.${options.format || 'json'}`
      httpRequest('GET', path, callback)
    }
  }

  return wrapperMethods
}

module.exports = BrowserStack
