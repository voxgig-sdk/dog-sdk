# Dog SDK configuration


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
            "short": "Array of sub-breed names",
            "type": "`$ARRAY`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
                  "res": "`body.message`",
                },
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
                "parts": [
                  "breeds",
                  "list",
                  "all",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.message`",
                },
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
                  "res": "`body.message`",
                },
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
                  "res": "`body.message`",
                },
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
              },
              {
                "args": {},
                "kind": "http",
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
