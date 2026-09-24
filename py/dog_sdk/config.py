# Dog SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Dog",
            "slug": "dog",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "breed",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "list",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.message`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "breed",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "hound",
                    },
                  ],
                },
                "select": {
                  "$action": "list",
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
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
                    "lit": "breeds",
                  },
                  {
                    "lit": "list",
                  },
                  {
                    "lit": "all",
                  },
                ],
                "parts": [
                  "breeds",
                  "list",
                  "all",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.message`",
                },
                "args": {},
                "select": {},
              },
            ],
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
            "title": "Message",
            "type": "`$ARRAY`",
            "short": "Array of random image URLs for the breed",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
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
                    "lit": "breed",
                  },
                  {
                    "var": "breed_id",
                  },
                  {
                    "var": "sub_breed",
                  },
                  {
                    "lit": "images",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.message`",
                },
                "args": {
                  "params": [
                    {
                      "name": "breed_id",
                      "orig": "breed",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "hound",
                    },
                    {
                      "name": "sub_breed",
                      "orig": "sub_breed",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "afghan",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "breed_id",
                    "sub_breed",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/breed/{breed}/images",
                "segments": [
                  {
                    "lit": "breed",
                  },
                  {
                    "var": "breed_id",
                  },
                  {
                    "lit": "images",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.message`",
                },
                "args": {
                  "params": [
                    {
                      "name": "breed_id",
                      "orig": "breed",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "hound",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "breed_id",
                  ],
                },
              },
            ],
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
                    "lit": "breed",
                  },
                  {
                    "var": "breed_id",
                  },
                  {
                    "lit": "images",
                  },
                  {
                    "lit": "random",
                  },
                  {
                    "var": "count",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "breed_id",
                      "orig": "breed",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "hound",
                    },
                    {
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "breed_id",
                    "count",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/breed/{breed}/{subBreed}/images/random",
                "segments": [
                  {
                    "lit": "breed",
                  },
                  {
                    "var": "breed_id",
                  },
                  {
                    "var": "sub_breed",
                  },
                  {
                    "lit": "images",
                  },
                  {
                    "lit": "random",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "breed_id",
                      "orig": "breed",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "hound",
                    },
                    {
                      "name": "sub_breed",
                      "orig": "sub_breed",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "afghan",
                    },
                  ],
                },
                "select": {
                  "$action": "random",
                  "exist": [
                    "breed_id",
                    "sub_breed",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/breed/{breed}/images/random",
                "segments": [
                  {
                    "lit": "breed",
                  },
                  {
                    "var": "breed_id",
                  },
                  {
                    "lit": "images",
                  },
                  {
                    "lit": "random",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "breed_id",
                      "orig": "breed",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "hound",
                    },
                  ],
                },
                "select": {
                  "$action": "random",
                  "exist": [
                    "breed_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/breeds/image/random/{count}",
                "segments": [
                  {
                    "lit": "breeds",
                  },
                  {
                    "lit": "image",
                  },
                  {
                    "lit": "random",
                  },
                  {
                    "var": "count",
                  },
                ],
                "parts": [
                  "breeds",
                  "image",
                  "random",
                  "{count}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "count",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/breeds/image/random",
                "segments": [
                  {
                    "lit": "breeds",
                  },
                  {
                    "lit": "image",
                  },
                  {
                    "lit": "random",
                  },
                ],
                "parts": [
                  "breeds",
                  "image",
                  "random",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "random",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.breed",
            ],
            [
              "$.main.kit.entity.breed",
            ],
          ],
        },
      },
    },
    }
