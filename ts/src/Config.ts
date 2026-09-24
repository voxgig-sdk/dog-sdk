
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Dog',
        slug: "dog",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://dog.ceo/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        breed: {
        },
  
        image: {
        },
  
    }
  }


  entity = {
    "breed": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "breed",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/breed/{breed}/list",
              "segments": [
                {
                  "lit": "breed"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "list"
                }
              ],
              "parts": [
                "breed",
                "{id}",
                "list"
              ],
              "rename": {
                "param": {
                  "breed": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.message`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "breed",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "hound"
                  }
                ]
              },
              "select": {
                "$action": "list",
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/breeds/list/all",
              "segments": [
                {
                  "lit": "breeds"
                },
                {
                  "lit": "list"
                },
                {
                  "lit": "all"
                }
              ],
              "parts": [
                "breeds",
                "list",
                "all"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.message`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "image": {
      "fields": [
        {
          "name": "message",
          "title": "Message",
          "type": "`$ARRAY`",
          "short": "Array of random image URLs for the breed"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`"
        }
      ],
      "name": "image",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/breed/{breed}/{subBreed}/images",
              "segments": [
                {
                  "lit": "breed"
                },
                {
                  "var": "breed_id"
                },
                {
                  "var": "sub_breed"
                },
                {
                  "lit": "images"
                }
              ],
              "parts": [
                "breed",
                "{breed_id}",
                "{sub_breed}",
                "images"
              ],
              "rename": {
                "param": {
                  "breed": "breed_id",
                  "subBreed": "sub_breed"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.message`"
              },
              "args": {
                "params": [
                  {
                    "name": "breed_id",
                    "orig": "breed",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "hound"
                  },
                  {
                    "name": "sub_breed",
                    "orig": "sub_breed",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "afghan"
                  }
                ]
              },
              "select": {
                "exist": [
                  "breed_id",
                  "sub_breed"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/breed/{breed}/images",
              "segments": [
                {
                  "lit": "breed"
                },
                {
                  "var": "breed_id"
                },
                {
                  "lit": "images"
                }
              ],
              "parts": [
                "breed",
                "{breed_id}",
                "images"
              ],
              "rename": {
                "param": {
                  "breed": "breed_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.message`"
              },
              "args": {
                "params": [
                  {
                    "name": "breed_id",
                    "orig": "breed",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "hound"
                  }
                ]
              },
              "select": {
                "exist": [
                  "breed_id"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/breed/{breed}/images/random/{count}",
              "segments": [
                {
                  "lit": "breed"
                },
                {
                  "var": "breed_id"
                },
                {
                  "lit": "images"
                },
                {
                  "lit": "random"
                },
                {
                  "var": "count"
                }
              ],
              "parts": [
                "breed",
                "{breed_id}",
                "images",
                "random",
                "{count}"
              ],
              "rename": {
                "param": {
                  "breed": "breed_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "breed_id",
                    "orig": "breed",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "hound"
                  },
                  {
                    "name": "count",
                    "orig": "count",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "breed_id",
                  "count"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/breed/{breed}/{subBreed}/images/random",
              "segments": [
                {
                  "lit": "breed"
                },
                {
                  "var": "breed_id"
                },
                {
                  "var": "sub_breed"
                },
                {
                  "lit": "images"
                },
                {
                  "lit": "random"
                }
              ],
              "parts": [
                "breed",
                "{breed_id}",
                "{sub_breed}",
                "images",
                "random"
              ],
              "rename": {
                "param": {
                  "breed": "breed_id",
                  "subBreed": "sub_breed"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "breed_id",
                    "orig": "breed",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "hound"
                  },
                  {
                    "name": "sub_breed",
                    "orig": "sub_breed",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "afghan"
                  }
                ]
              },
              "select": {
                "$action": "random",
                "exist": [
                  "breed_id",
                  "sub_breed"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/breed/{breed}/images/random",
              "segments": [
                {
                  "lit": "breed"
                },
                {
                  "var": "breed_id"
                },
                {
                  "lit": "images"
                },
                {
                  "lit": "random"
                }
              ],
              "parts": [
                "breed",
                "{breed_id}",
                "images",
                "random"
              ],
              "rename": {
                "param": {
                  "breed": "breed_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "breed_id",
                    "orig": "breed",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "hound"
                  }
                ]
              },
              "select": {
                "$action": "random",
                "exist": [
                  "breed_id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/breeds/image/random/{count}",
              "segments": [
                {
                  "lit": "breeds"
                },
                {
                  "lit": "image"
                },
                {
                  "lit": "random"
                },
                {
                  "var": "count"
                }
              ],
              "parts": [
                "breeds",
                "image",
                "random",
                "{count}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "count",
                    "orig": "count",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "count"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/breeds/image/random",
              "segments": [
                {
                  "lit": "breeds"
                },
                {
                  "lit": "image"
                },
                {
                  "lit": "random"
                }
              ],
              "parts": [
                "breeds",
                "image",
                "random"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {
                "$action": "random"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.breed"
          ],
          [
            "$.main.kit.entity.breed"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

