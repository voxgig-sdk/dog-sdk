

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


describe('BreedEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DOG_TEST_LIVE=TRUE.
  afterEach(liveDelay('DOG_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DogSDK.test()
    const ent = testsdk.Breed()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DOG_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'breed.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"breed","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /breed/{breed}/list","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"hound","k":"param","n":"id","or":"breed","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/breed/{breed}/list","q":{"$action":"list","exist":["id"]},"r":{"param":{"breed":"id"}},"s":[{"lit":"breed"},{"var":"id"},{"lit":"list"}],"t":{"req":"`reqdata`","res":"`body.message`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /breeds/list/all","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/breeds/list/all","q":{},"r":{},"s":[{"lit":"breeds"},{"lit":"list"},{"lit":"all"}],"t":{"req":"`reqdata`","res":"`body.message`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"breed","name__orig":"breed","Name":"Breed","name_":"breed","name-":"breed","NAME":"BREED","index$":0}, {"active":true,"entity":"breed","key$":"BasicBreedFlow","kind":"basic","name":"BasicBreedFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"breed":"breed01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"breed_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"breed_ref01","srcdatavar":"breed_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-breed_ref01"}}],"index$":1}]}, 'Breed', {"GET /breed/{breed}/list":{"protocol":"http","operationId":"listSubBreeds","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"description":"Array of sub-breed names","items":{"type":"string"},"key$":"message","type":"array"},"status":{"example":"success","key$":"status","type":"string"}}}}}},"404":{"description":"Breed not found","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"error"},"message":{"type":"string","example":"Breed not found"}}}}}}},"parameters":[{"name":"breed","in":"path","required":true,"description":"The breed name","schema":{"type":"string"},"example":"hound","index$":0}],"securitySource":"unspecified"},"GET /breeds/list/all":{"protocol":"http","operationId":"listAllBreeds","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"additionalProperties":{"items":{"type":"string"},"type":"array","key$":"additionalProperties"},"description":"Object containing breed names as keys and sub-breeds as array values","example":{"affenpinscher":[],"african":[],"hound":["afghan","basset","blood","english","ibizan","plott","walker"],"key$":"example"},"key$":"message","type":"object"},"status":{"example":"success","key$":"status","type":"string"}}}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let breed_ref01_data = Object.values(setup.data.existing.breed)[0] as any

    // LIST
    const breed_ref01_ent = client.Breed()
    const breed_ref01_match: any = {}
    breed_ref01_match['breed'] = setup.idmap['breed01']

    const breed_ref01_list = (await breed_ref01_ent.list(breed_ref01_match)).map((e: any) => e.data())


    // LOAD
    const breed_ref01_match_dt0: any = {}
    breed_ref01_match_dt0.id = breed_ref01_data.id
    const breed_ref01_data_dt0 = (await breed_ref01_ent.load(breed_ref01_match_dt0)).data()
    assert(breed_ref01_data_dt0.id === breed_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/breed/BreedTestData.json')

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
    ['breed01','breed02','breed03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DOG_TEST_BREED_ENTID': idmap,
    'DOG_TEST_LIVE': 'FALSE',
    'DOG_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DOG_TEST_BREED_ENTID']

  const live = 'TRUE' === env.DOG_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DOG_TEST_BREED_ENTID']
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
  
