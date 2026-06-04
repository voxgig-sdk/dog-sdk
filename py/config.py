# Dog SDK configuration


def make_config():
    return {
        "main": {
            "name": "Dog",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://dog.ceo/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "breed": {},
                "image": {},
            },
        },
        "entity": {
      "breed": {
        "fields": [
          {
            "name": "message",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "status",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "breed",
        "op": {
          "list": {
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
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/breed/{breed}/list",
                "parts": [
                  "breed",
                  "{id}",
                  "list",
                ],
                "rename": {
                  "param": {
                    "breed": "id",
                  },
                },
                "select": {
                  "$action": "list",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "method": "GET",
                "orig": "/breeds/list/all",
                "parts": [
                  "breeds",
                  "list",
                  "all",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "image": {
        "fields": [
          {
            "name": "message",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "status",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "image",
        "op": {
          "list": {
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
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "afghan",
                      "kind": "param",
                      "name": "sub_breed",
                      "orig": "sub_breed",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/breed/{breed}/{subBreed}/images",
                "parts": [
                  "breed",
                  "{breed_id}",
                  "{sub_breed}",
                  "images",
                ],
                "rename": {
                  "param": {
                    "breed": "breed_id",
                    "subBreed": "sub_breed",
                  },
                },
                "select": {
                  "exist": [
                    "breed_id",
                    "sub_breed",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "hound",
                      "kind": "param",
                      "name": "breed_id",
                      "orig": "breed",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/breed/{breed}/images",
                "parts": [
                  "breed",
                  "{breed_id}",
                  "images",
                ],
                "rename": {
                  "param": {
                    "breed": "breed_id",
                  },
                },
                "select": {
                  "exist": [
                    "breed_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
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
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "param",
                      "name": "count",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/breed/{breed}/images/random/{count}",
                "parts": [
                  "breed",
                  "{breed_id}",
                  "images",
                  "random",
                  "{count}",
                ],
                "rename": {
                  "param": {
                    "breed": "breed_id",
                  },
                },
                "select": {
                  "exist": [
                    "breed_id",
                    "count",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "hound",
                      "kind": "param",
                      "name": "breed_id",
                      "orig": "breed",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "afghan",
                      "kind": "param",
                      "name": "sub_breed",
                      "orig": "sub_breed",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/breed/{breed}/{subBreed}/images/random",
                "parts": [
                  "breed",
                  "{breed_id}",
                  "{sub_breed}",
                  "images",
                  "random",
                ],
                "rename": {
                  "param": {
                    "breed": "breed_id",
                    "subBreed": "sub_breed",
                  },
                },
                "select": {
                  "$action": "random",
                  "exist": [
                    "breed_id",
                    "sub_breed",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 1,
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "hound",
                      "kind": "param",
                      "name": "breed_id",
                      "orig": "breed",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/breed/{breed}/images/random",
                "parts": [
                  "breed",
                  "{breed_id}",
                  "images",
                  "random",
                ],
                "rename": {
                  "param": {
                    "breed": "breed_id",
                  },
                },
                "select": {
                  "$action": "random",
                  "exist": [
                    "breed_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 2,
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "count",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/breeds/image/random/{count}",
                "parts": [
                  "breeds",
                  "image",
                  "random",
                  "{count}",
                ],
                "select": {
                  "exist": [
                    "count",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 3,
              },
              {
                "method": "GET",
                "orig": "/breeds/image/random",
                "parts": [
                  "breeds",
                  "image",
                  "random",
                ],
                "select": {
                  "$action": "random",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "index$": 4,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "breed",
            ],
            [
              "breed",
              "random",
            ],
          ],
        },
      },
    },
    }
