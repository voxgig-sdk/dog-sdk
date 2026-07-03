# Dog SDK configuration

module DogConfig
  def self.make_config
    {
      "main" => {
        "name" => "Dog",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://dog.ceo/api",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "breed" => {},
          "image" => {},
        },
      },
      "entity" => {
        "breed" => {
          "fields" => [
            {
              "active" => true,
              "name" => "message",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "status",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
          ],
          "name" => "breed",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "hound",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "breed",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/breed/{breed}/list",
                  "parts" => [
                    "breed",
                    "{id}",
                    "list",
                  ],
                  "rename" => {
                    "param" => {
                      "breed" => "id",
                    },
                  },
                  "select" => {
                    "$action" => "list",
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "method" => "GET",
                  "orig" => "/breeds/list/all",
                  "parts" => [
                    "breeds",
                    "list",
                    "all",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "image" => {
          "fields" => [
            {
              "active" => true,
              "name" => "message",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "status",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
          ],
          "name" => "image",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "hound",
                        "kind" => "param",
                        "name" => "breed_id",
                        "orig" => "breed",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => "afghan",
                        "kind" => "param",
                        "name" => "sub_breed",
                        "orig" => "sub_breed",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/breed/{breed}/{subBreed}/images",
                  "parts" => [
                    "breed",
                    "{breed_id}",
                    "{sub_breed}",
                    "images",
                  ],
                  "rename" => {
                    "param" => {
                      "breed" => "breed_id",
                      "subBreed" => "sub_breed",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "breed_id",
                      "sub_breed",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "hound",
                        "kind" => "param",
                        "name" => "breed_id",
                        "orig" => "breed",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/breed/{breed}/images",
                  "parts" => [
                    "breed",
                    "{breed_id}",
                    "images",
                  ],
                  "rename" => {
                    "param" => {
                      "breed" => "breed_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "breed_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
              ],
              "key$" => "list",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "hound",
                        "kind" => "param",
                        "name" => "breed_id",
                        "orig" => "breed",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/breed/{breed}/images/random/{count}",
                  "parts" => [
                    "breed",
                    "{breed_id}",
                    "images",
                    "random",
                    "{count}",
                  ],
                  "rename" => {
                    "param" => {
                      "breed" => "breed_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "breed_id",
                      "count",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "hound",
                        "kind" => "param",
                        "name" => "breed_id",
                        "orig" => "breed",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => "afghan",
                        "kind" => "param",
                        "name" => "sub_breed",
                        "orig" => "sub_breed",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/breed/{breed}/{subBreed}/images/random",
                  "parts" => [
                    "breed",
                    "{breed_id}",
                    "{sub_breed}",
                    "images",
                    "random",
                  ],
                  "rename" => {
                    "param" => {
                      "breed" => "breed_id",
                      "subBreed" => "sub_breed",
                    },
                  },
                  "select" => {
                    "$action" => "random",
                    "exist" => [
                      "breed_id",
                      "sub_breed",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "hound",
                        "kind" => "param",
                        "name" => "breed_id",
                        "orig" => "breed",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/breed/{breed}/images/random",
                  "parts" => [
                    "breed",
                    "{breed_id}",
                    "images",
                    "random",
                  ],
                  "rename" => {
                    "param" => {
                      "breed" => "breed_id",
                    },
                  },
                  "select" => {
                    "$action" => "random",
                    "exist" => [
                      "breed_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 2,
                },
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "count",
                        "orig" => "count",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/breeds/image/random/{count}",
                  "parts" => [
                    "breeds",
                    "image",
                    "random",
                    "{count}",
                  ],
                  "select" => {
                    "exist" => [
                      "count",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 3,
                },
                {
                  "active" => true,
                  "args" => {},
                  "method" => "GET",
                  "orig" => "/breeds/image/random",
                  "parts" => [
                    "breeds",
                    "image",
                    "random",
                  ],
                  "select" => {
                    "$action" => "random",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 4,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
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
  end


  def self.make_feature(name)
    require_relative 'features'
    DogFeatures.make_feature(name)
  end
end
