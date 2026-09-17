-- Dog SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Dog",
      slug = "dog",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://dog.ceo/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["breed"] = {},
        ["image"] = {},
      },
    },
    entity = {
      ["breed"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "breed",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "hound",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "breed",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/breed/{breed}/list",
                ["rename"] = {
                  ["param"] = {
                    ["breed"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "breed",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "list",
                  },
                },
                ["select"] = {
                  ["$action"] = "list",
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.message`",
                },
                ["parts"] = {
                  "breed",
                  "{id}",
                  "list",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/breeds/list/all",
                ["segments"] = {
                  {
                    ["lit"] = "breeds",
                  },
                  {
                    ["lit"] = "list",
                  },
                  {
                    ["lit"] = "all",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.message`",
                },
                ["parts"] = {
                  "breeds",
                  "list",
                  "all",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["image"] = {
        ["fields"] = {
          {
            ["name"] = "message",
            ["short"] = "Array of random image URLs for the breed",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "status",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "image",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "hound",
                      ["kind"] = "param",
                      ["name"] = "breed_id",
                      ["orig"] = "breed",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "afghan",
                      ["kind"] = "param",
                      ["name"] = "sub_breed",
                      ["orig"] = "sub_breed",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/breed/{breed}/{subBreed}/images",
                ["rename"] = {
                  ["param"] = {
                    ["breed"] = "breed_id",
                    ["subBreed"] = "sub_breed",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "breed",
                  },
                  {
                    ["var"] = "breed_id",
                  },
                  {
                    ["var"] = "sub_breed",
                  },
                  {
                    ["lit"] = "images",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "breed_id",
                    "sub_breed",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.message`",
                },
                ["parts"] = {
                  "breed",
                  "{breed_id}",
                  "{sub_breed}",
                  "images",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "hound",
                      ["kind"] = "param",
                      ["name"] = "breed_id",
                      ["orig"] = "breed",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/breed/{breed}/images",
                ["rename"] = {
                  ["param"] = {
                    ["breed"] = "breed_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "breed",
                  },
                  {
                    ["var"] = "breed_id",
                  },
                  {
                    ["lit"] = "images",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "breed_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.message`",
                },
                ["parts"] = {
                  "breed",
                  "{breed_id}",
                  "images",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "hound",
                      ["kind"] = "param",
                      ["name"] = "breed_id",
                      ["orig"] = "breed",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/breed/{breed}/images/random/{count}",
                ["rename"] = {
                  ["param"] = {
                    ["breed"] = "breed_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "breed",
                  },
                  {
                    ["var"] = "breed_id",
                  },
                  {
                    ["lit"] = "images",
                  },
                  {
                    ["lit"] = "random",
                  },
                  {
                    ["var"] = "count",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "breed_id",
                    "count",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "breed",
                  "{breed_id}",
                  "images",
                  "random",
                  "{count}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "hound",
                      ["kind"] = "param",
                      ["name"] = "breed_id",
                      ["orig"] = "breed",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "afghan",
                      ["kind"] = "param",
                      ["name"] = "sub_breed",
                      ["orig"] = "sub_breed",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/breed/{breed}/{subBreed}/images/random",
                ["rename"] = {
                  ["param"] = {
                    ["breed"] = "breed_id",
                    ["subBreed"] = "sub_breed",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "breed",
                  },
                  {
                    ["var"] = "breed_id",
                  },
                  {
                    ["var"] = "sub_breed",
                  },
                  {
                    ["lit"] = "images",
                  },
                  {
                    ["lit"] = "random",
                  },
                },
                ["select"] = {
                  ["$action"] = "random",
                  ["exist"] = {
                    "breed_id",
                    "sub_breed",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "breed",
                  "{breed_id}",
                  "{sub_breed}",
                  "images",
                  "random",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "hound",
                      ["kind"] = "param",
                      ["name"] = "breed_id",
                      ["orig"] = "breed",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/breed/{breed}/images/random",
                ["rename"] = {
                  ["param"] = {
                    ["breed"] = "breed_id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "breed",
                  },
                  {
                    ["var"] = "breed_id",
                  },
                  {
                    ["lit"] = "images",
                  },
                  {
                    ["lit"] = "random",
                  },
                },
                ["select"] = {
                  ["$action"] = "random",
                  ["exist"] = {
                    "breed_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "breed",
                  "{breed_id}",
                  "images",
                  "random",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/breeds/image/random/{count}",
                ["segments"] = {
                  {
                    ["lit"] = "breeds",
                  },
                  {
                    ["lit"] = "image",
                  },
                  {
                    ["lit"] = "random",
                  },
                  {
                    ["var"] = "count",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "breeds",
                  "image",
                  "random",
                  "{count}",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/breeds/image/random",
                ["segments"] = {
                  {
                    ["lit"] = "breeds",
                  },
                  {
                    ["lit"] = "image",
                  },
                  {
                    ["lit"] = "random",
                  },
                },
                ["select"] = {
                  ["$action"] = "random",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "breeds",
                  "image",
                  "random",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "breed",
            },
            {
              "breed",
              "random",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
