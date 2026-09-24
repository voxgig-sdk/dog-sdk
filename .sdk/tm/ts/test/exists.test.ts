
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DogSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = DogSDK.test()
    equal(testsdk instanceof DogSDK, true,
      'DogSDK.test() must return a client synchronously')
  })

})
