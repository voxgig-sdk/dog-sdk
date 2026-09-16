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
            "type": "`$STRING`",
          },
          {
            "name": "message",
            "short": "Array of sub-breed names",
            "type": "`$ARRAY`",
          },
          {
            "name": "status",
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
                "args": {
                  "params": [
                    {
                      "example": "hound",
                      "kind": "param",
                      "name": "id",
                      "orig": "breed",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/breed/{breed}/list",
                "rename": {
                  "param": {
                    "breed": "id",
                  },
                },
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
                "select": {
                  "$action": "list",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.message`",
                },
                "parts": [
                  "breed",
                  "{id}",
                  "list",
                ],
              },
            ],
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
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.message`",
                },
                "parts": [
                  "breeds",
                  "list",
                  "all",
                ],
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
            "short": "Array of random image URLs for the breed",
            "type": "`$ARRAY`",
          },
          {
            "name": "status",
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
                "args": {
                  "params": [
                    {
                      "example": "hound",
                      "kind": "param",
                      "name": "breed_id",
                      "orig": "breed",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "afghan",
                      "kind": "param",
                      "name": "sub_breed",
                      "orig": "sub_breed",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/breed/{breed}/{subBreed}/images",
                "rename": {
                  "param": {
                    "breed": "breed_id",
                    "subBreed": "sub_breed",
                  },
                },
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
                "select": {
                  "exist": [
                    "breed_id",
                    "sub_breed",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.message`",
                },
                "parts": [
                  "breed",
                  "{breed_id}",
                  "{sub_breed}",
                  "images",
                ],
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
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/breed/{breed}/images",
                "rename": {
                  "param": {
                    "breed": "breed_id",
                  },
                },
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
                "select": {
                  "exist": [
                    "breed_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.message`",
                },
                "parts": [
                  "breed",
                  "{breed_id}",
                  "images",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "count",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/breed/{breed}/images/random/{count}",
                "rename": {
                  "param": {
                    "breed": "breed_id",
                  },
                },
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
                "parts": [
                  "breed",
                  "{breed_id}",
                  "images",
                  "random",
                  "{count}",
                ],
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
                    },
                    {
                      "example": "afghan",
                      "kind": "param",
                      "name": "sub_breed",
                      "orig": "sub_breed",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/breed/{breed}/{subBreed}/images/random",
                "rename": {
                  "param": {
                    "breed": "breed_id",
                    "subBreed": "sub_breed",
                  },
                },
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
                "parts": [
                  "breed",
                  "{breed_id}",
                  "{sub_breed}",
                  "images",
                  "random",
                ],
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
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/breed/{breed}/images/random",
                "rename": {
                  "param": {
                    "breed": "breed_id",
                  },
                },
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
                "parts": [
                  "breed",
                  "{breed_id}",
                  "images",
                  "random",
                ],
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
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "count",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "breeds",
                  "image",
                  "random",
                  "{count}",
                ],
              },
              {
                "args": {},
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
                "select": {
                  "$action": "random",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "breeds",
                  "image",
                  "random",
                ],
              },
            ],
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
