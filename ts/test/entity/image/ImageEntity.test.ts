

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DogSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ImageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DOG_TEST_LIVE=TRUE.
  afterEach(liveDelay('DOG_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DogSDK.test()
    const ent = testsdk.Image()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DOG_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'image.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"message":{"a":true,"h":"Message","n":"message","r":false,"sh":"Array of random image URLs for the breed","t":"`$ARRAY`","key$":"message","index$":0},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":1}},"name":"image","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /breed/{breed}/{subBreed}/images","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"hound","k":"param","n":"breed_id","or":"breed","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"afghan","k":"param","n":"sub_breed","or":"sub_breed","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/breed/{breed}/{subBreed}/images","q":{"exist":["breed_id","sub_breed"]},"r":{"param":{"breed":"breed_id","subBreed":"sub_breed"}},"s":[{"lit":"breed"},{"var":"breed_id"},{"var":"sub_breed"},{"lit":"images"}],"t":{"req":"`reqdata`","res":"`body.message`"},"index$":0},{"a":true,"co":{"id":"GET /breed/{breed}/images","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"hound","k":"param","n":"breed_id","or":"breed","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/breed/{breed}/images","q":{"exist":["breed_id"]},"r":{"param":{"breed":"breed_id"}},"s":[{"lit":"breed"},{"var":"breed_id"},{"lit":"images"}],"t":{"req":"`reqdata`","res":"`body.message`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /breed/{breed}/images/random/{count}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"hound","k":"param","n":"breed_id","or":"breed","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"count","or":"count","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/breed/{breed}/images/random/{count}","q":{"exist":["breed_id","count"]},"r":{"param":{"breed":"breed_id"}},"s":[{"lit":"breed"},{"var":"breed_id"},{"lit":"images"},{"lit":"random"},{"var":"count"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /breed/{breed}/{subBreed}/images/random","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"hound","k":"param","n":"breed_id","or":"breed","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"afghan","k":"param","n":"sub_breed","or":"sub_breed","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/breed/{breed}/{subBreed}/images/random","q":{"$action":"random","exist":["breed_id","sub_breed"]},"r":{"param":{"breed":"breed_id","subBreed":"sub_breed"}},"s":[{"lit":"breed"},{"var":"breed_id"},{"var":"sub_breed"},{"lit":"images"},{"lit":"random"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /breed/{breed}/images/random","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"hound","k":"param","n":"breed_id","or":"breed","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/breed/{breed}/images/random","q":{"$action":"random","exist":["breed_id"]},"r":{"param":{"breed":"breed_id"}},"s":[{"lit":"breed"},{"var":"breed_id"},{"lit":"images"},{"lit":"random"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /breeds/image/random/{count}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"count","or":"count","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/breeds/image/random/{count}","q":{"exist":["count"]},"r":{},"s":[{"lit":"breeds"},{"lit":"image"},{"lit":"random"},{"var":"count"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /breeds/image/random","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/breeds/image/random","q":{"$action":"random"},"r":{},"s":[{"lit":"breeds"},{"lit":"image"},{"lit":"random"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.breed"],["$.main.kit.entity.breed"]]},"key$":"image","name__orig":"image","Name":"Image","name_":"image","name-":"image","NAME":"IMAGE","index$":1}, {"active":true,"entity":"image","key$":"BasicImageFlow","kind":"basic","name":"BasicImageFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"breed_id":"breed01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"image_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"image_ref01","srcdatavar":"image_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-image_ref01"}}],"index$":1}]}, 'Image', {"GET /breed/{breed}/{subBreed}/images":{"protocol":"http","operationId":"getSubBreedImages","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"description":"Array of image URLs for the sub-breed","items":{"type":"string"},"key$":"message","type":"array"},"status":{"example":"success","key$":"status","type":"string"}},"index$":0}}}},"404":{"description":"Breed or sub-breed not found","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"error"},"message":{"type":"string","example":"Breed not found"}}}}}}},"parameters":[{"name":"breed","in":"path","required":true,"description":"The breed name","schema":{"type":"string"},"example":"hound","index$":0},{"name":"subBreed","in":"path","required":true,"description":"The sub-breed name","schema":{"type":"string"},"example":"afghan","index$":1}],"securitySource":"unspecified"},"GET /breed/{breed}/images":{"protocol":"http","operationId":"getBreedImages","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"description":"Array of image URLs for the breed","items":{"type":"string"},"key$":"message","type":"array"},"status":{"example":"success","key$":"status","type":"string"}},"index$":0}}}},"404":{"description":"Breed not found","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"error"},"message":{"type":"string","example":"Breed not found"}}}}}}},"parameters":[{"name":"breed","in":"path","required":true,"description":"The breed name","schema":{"type":"string"},"example":"hound","index$":0}],"securitySource":"unspecified"},"GET /breed/{breed}/images/random/{count}":{"protocol":"http","operationId":"getMultipleRandomBreedImages","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"array","description":"Array of random image URLs for the breed","items":{"type":"string"},"key$":"message"},"status":{"type":"string","example":"success","key$":"status"}},"index$":0}}}},"404":{"description":"Breed not found","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"error"},"message":{"type":"string","example":"Breed not found"}}}}}}},"parameters":[{"name":"breed","in":"path","required":true,"description":"The breed name","schema":{"type":"string"},"example":"hound","index$":0},{"name":"count","in":"path","required":true,"description":"Number of random images to return","schema":{"type":"integer","minimum":1,"maximum":50},"index$":1}],"securitySource":"unspecified"},"GET /breed/{breed}/{subBreed}/images/random":{"protocol":"http","operationId":"getRandomSubBreedImage","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"description":"URL of random image for the sub-breed","key$":"message","type":"string"},"status":{"example":"success","key$":"status","type":"string"}}}}}},"404":{"description":"Breed or sub-breed not found","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"error"},"message":{"type":"string","example":"Breed not found"}}}}}}},"parameters":[{"name":"breed","in":"path","required":true,"description":"The breed name","schema":{"type":"string"},"example":"hound","index$":0},{"name":"subBreed","in":"path","required":true,"description":"The sub-breed name","schema":{"type":"string"},"example":"afghan","index$":1}],"securitySource":"unspecified"},"GET /breed/{breed}/images/random":{"protocol":"http","operationId":"getRandomBreedImage","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"description":"URL of random image for the breed","key$":"message","type":"string"},"status":{"example":"success","key$":"status","type":"string"}}}}}},"404":{"description":"Breed not found","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"error"},"message":{"type":"string","example":"Breed not found"}}}}}}},"parameters":[{"name":"breed","in":"path","required":true,"description":"The breed name","schema":{"type":"string"},"example":"hound","index$":0}],"securitySource":"unspecified"},"GET /breeds/image/random/{count}":{"protocol":"http","operationId":"getMultipleRandomDogImages","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"array","description":"Array of URLs of random dog images","items":{"type":"string"},"key$":"message"},"status":{"type":"string","example":"success","key$":"status"}},"index$":0}}}}},"parameters":[{"name":"count","in":"path","required":true,"description":"Number of random images to return (max 50)","schema":{"type":"integer","minimum":1,"maximum":50},"index$":0}],"securitySource":"unspecified"},"GET /breeds/image/random":{"protocol":"http","operationId":"getRandomDogImage","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"description":"URL of the random dog image","example":"https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg","key$":"message","type":"string"},"status":{"example":"success","key$":"status","type":"string"}}}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let image_ref01_data = Object.values(setup.data.existing.image)[0] as any

    // LIST
    const image_ref01_ent = client.Image()
    const image_ref01_match: any = {}
    image_ref01_match['breed_id'] = setup.idmap['breed01']

    const image_ref01_list = (await image_ref01_ent.list(image_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/image/ImageTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DogSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['image01','image02','image03','breed01','breed02','breed03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DOG_TEST_IMAGE_ENTID': idmap,
    'DOG_TEST_LIVE': 'FALSE',
    'DOG_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DOG_TEST_IMAGE_ENTID']

  const live = 'TRUE' === env.DOG_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DOG_TEST_IMAGE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DogSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.DOG_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
