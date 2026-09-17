<?php
declare(strict_types=1);

// Dog SDK configuration

class DogConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Dog",
                "slug" => "dog",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://dog.ceo/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "breed" => [],
                    "image" => [],
                ],
            ],
            "entity" => [
        'breed' => [
          'fields' => [
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'breed',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'hound',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'breed',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/breed/{breed}/list',
                  'rename' => [
                    'param' => [
                      'breed' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'breed',
                    ],
                    [
                      'var' => 'id',
                    ],
                    [
                      'lit' => 'list',
                    ],
                  ],
                  'select' => [
                    '$action' => 'list',
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.message`',
                  ],
                  'parts' => [
                    'breed',
                    '{id}',
                    'list',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/breeds/list/all',
                  'segments' => [
                    [
                      'lit' => 'breeds',
                    ],
                    [
                      'lit' => 'list',
                    ],
                    [
                      'lit' => 'all',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.message`',
                  ],
                  'parts' => [
                    'breeds',
                    'list',
                    'all',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'image' => [
          'fields' => [
            [
              'name' => 'message',
              'short' => 'Array of random image URLs for the breed',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'image',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'hound',
                        'kind' => 'param',
                        'name' => 'breed_id',
                        'orig' => 'breed',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'afghan',
                        'kind' => 'param',
                        'name' => 'sub_breed',
                        'orig' => 'sub_breed',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/breed/{breed}/{subBreed}/images',
                  'rename' => [
                    'param' => [
                      'breed' => 'breed_id',
                      'subBreed' => 'sub_breed',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'breed',
                    ],
                    [
                      'var' => 'breed_id',
                    ],
                    [
                      'var' => 'sub_breed',
                    ],
                    [
                      'lit' => 'images',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'breed_id',
                      'sub_breed',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.message`',
                  ],
                  'parts' => [
                    'breed',
                    '{breed_id}',
                    '{sub_breed}',
                    'images',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'hound',
                        'kind' => 'param',
                        'name' => 'breed_id',
                        'orig' => 'breed',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/breed/{breed}/images',
                  'rename' => [
                    'param' => [
                      'breed' => 'breed_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'breed',
                    ],
                    [
                      'var' => 'breed_id',
                    ],
                    [
                      'lit' => 'images',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'breed_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.message`',
                  ],
                  'parts' => [
                    'breed',
                    '{breed_id}',
                    'images',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'hound',
                        'kind' => 'param',
                        'name' => 'breed_id',
                        'orig' => 'breed',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'count',
                        'orig' => 'count',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/breed/{breed}/images/random/{count}',
                  'rename' => [
                    'param' => [
                      'breed' => 'breed_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'breed',
                    ],
                    [
                      'var' => 'breed_id',
                    ],
                    [
                      'lit' => 'images',
                    ],
                    [
                      'lit' => 'random',
                    ],
                    [
                      'var' => 'count',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'breed_id',
                      'count',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'breed',
                    '{breed_id}',
                    'images',
                    'random',
                    '{count}',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'hound',
                        'kind' => 'param',
                        'name' => 'breed_id',
                        'orig' => 'breed',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'afghan',
                        'kind' => 'param',
                        'name' => 'sub_breed',
                        'orig' => 'sub_breed',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/breed/{breed}/{subBreed}/images/random',
                  'rename' => [
                    'param' => [
                      'breed' => 'breed_id',
                      'subBreed' => 'sub_breed',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'breed',
                    ],
                    [
                      'var' => 'breed_id',
                    ],
                    [
                      'var' => 'sub_breed',
                    ],
                    [
                      'lit' => 'images',
                    ],
                    [
                      'lit' => 'random',
                    ],
                  ],
                  'select' => [
                    '$action' => 'random',
                    'exist' => [
                      'breed_id',
                      'sub_breed',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'breed',
                    '{breed_id}',
                    '{sub_breed}',
                    'images',
                    'random',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'hound',
                        'kind' => 'param',
                        'name' => 'breed_id',
                        'orig' => 'breed',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/breed/{breed}/images/random',
                  'rename' => [
                    'param' => [
                      'breed' => 'breed_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'breed',
                    ],
                    [
                      'var' => 'breed_id',
                    ],
                    [
                      'lit' => 'images',
                    ],
                    [
                      'lit' => 'random',
                    ],
                  ],
                  'select' => [
                    '$action' => 'random',
                    'exist' => [
                      'breed_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'breed',
                    '{breed_id}',
                    'images',
                    'random',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'count',
                        'orig' => 'count',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/breeds/image/random/{count}',
                  'segments' => [
                    [
                      'lit' => 'breeds',
                    ],
                    [
                      'lit' => 'image',
                    ],
                    [
                      'lit' => 'random',
                    ],
                    [
                      'var' => 'count',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'count',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'breeds',
                    'image',
                    'random',
                    '{count}',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/breeds/image/random',
                  'segments' => [
                    [
                      'lit' => 'breeds',
                    ],
                    [
                      'lit' => 'image',
                    ],
                    [
                      'lit' => 'random',
                    ],
                  ],
                  'select' => [
                    '$action' => 'random',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'breeds',
                    'image',
                    'random',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'breed',
              ],
              [
                'breed',
                'random',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return DogFeatures::make_feature($name);
    }
}
