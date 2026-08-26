
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
          "type": "`$STRING`"
        },
        {
          "name": "message",
          "short": "Array of sub-breed names",
          "type": "`$ARRAY`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        }
      ],
      "name": "breed",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "hound",
                    "kind": "param",
                    "name": "id",
                    "orig": "breed",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/breed/{breed}/list",
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
              "select": {
                "$action": "list",
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.message`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/breeds/list/all",
              "parts": [
                "breeds",
                "list",
                "all"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.message`"
              }
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
          "short": "Array of random image URLs for the breed",
          "type": "`$ARRAY`"
        },
        {
          "name": "status",
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
              "args": {
                "params": [
                  {
                    "example": "hound",
                    "kind": "param",
                    "name": "breed_id",
                    "orig": "breed",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "afghan",
                    "kind": "param",
                    "name": "sub_breed",
                    "orig": "sub_breed",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/breed/{breed}/{subBreed}/images",
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
              "select": {
                "exist": [
                  "breed_id",
                  "sub_breed"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.message`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "example": "hound",
                    "kind": "param",
                    "name": "breed_id",
                    "orig": "breed",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/breed/{breed}/images",
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
              "select": {
                "exist": [
                  "breed_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.message`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "hound",
                    "kind": "param",
                    "name": "breed_id",
                    "orig": "breed",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "count",
                    "orig": "count",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/breed/{breed}/images/random/{count}",
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
              "select": {
                "exist": [
                  "breed_id",
                  "count"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "example": "hound",
                    "kind": "param",
                    "name": "breed_id",
                    "orig": "breed",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "afghan",
                    "kind": "param",
                    "name": "sub_breed",
                    "orig": "sub_breed",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/breed/{breed}/{subBreed}/images/random",
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
              "select": {
                "$action": "random",
                "exist": [
                  "breed_id",
                  "sub_breed"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "example": "hound",
                    "kind": "param",
                    "name": "breed_id",
                    "orig": "breed",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/breed/{breed}/images/random",
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
              "select": {
                "$action": "random",
                "exist": [
                  "breed_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "count",
                    "orig": "count",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/breeds/image/random/{count}",
              "parts": [
                "breeds",
                "image",
                "random",
                "{count}"
              ],
              "select": {
                "exist": [
                  "count"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/breeds/image/random",
              "parts": [
                "breeds",
                "image",
                "random"
              ],
              "select": {
                "$action": "random"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "breed"
          ],
          [
            "breed",
            "random"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config
}

