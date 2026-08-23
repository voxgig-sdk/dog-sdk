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
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'name' => 'message',
              'short' => 'Array of sub-breed names',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
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
                  'parts' => [
                    'breed',
                    '{id}',
                    'list',
                  ],
                  'rename' => [
                    'param' => [
                      'breed' => 'id',
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
                  'parts' => [
                    'breeds',
                    'list',
                    'all',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.message`',
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
                  'parts' => [
                    'breed',
                    '{breed_id}',
                    '{sub_breed}',
                    'images',
                  ],
                  'rename' => [
                    'param' => [
                      'breed' => 'breed_id',
                      'subBreed' => 'sub_breed',
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
                  'parts' => [
                    'breed',
                    '{breed_id}',
                    'images',
                  ],
                  'rename' => [
                    'param' => [
                      'breed' => 'breed_id',
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
                  'parts' => [
                    'breed',
                    '{breed_id}',
                    'images',
                    'random',
                    '{count}',
                  ],
                  'rename' => [
                    'param' => [
                      'breed' => 'breed_id',
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
                  'parts' => [
                    'breed',
                    '{breed_id}',
                    '{sub_breed}',
                    'images',
                    'random',
                  ],
                  'rename' => [
                    'param' => [
                      'breed' => 'breed_id',
                      'subBreed' => 'sub_breed',
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
                  'parts' => [
                    'breed',
                    '{breed_id}',
                    'images',
                    'random',
                  ],
                  'rename' => [
                    'param' => [
                      'breed' => 'breed_id',
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
                  'parts' => [
                    'breeds',
                    'image',
                    'random',
                    '{count}',
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
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/breeds/image/random',
                  'parts' => [
                    'breeds',
                    'image',
                    'random',
                  ],
                  'select' => [
                    '$action' => 'random',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
