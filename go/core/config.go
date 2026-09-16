package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Dog",
			"slug": "dog",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://dog.ceo/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"breed": map[string]any{},
				"image": map[string]any{},
			},
		},
		"entity": map[string]any{
			"breed": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message",
						"short": "Array of sub-breed names",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "breed",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "hound",
											"kind": "param",
											"name": "id",
											"orig": "breed",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/breed/{breed}/list",
								"rename": map[string]any{
									"param": map[string]any{
										"breed": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "breed",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "list",
									},
								},
								"select": map[string]any{
									"$action": "list",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.message`",
								},
								"parts": []any{
									"breed",
									"{id}",
									"list",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/breeds/list/all",
								"segments": []any{
									map[string]any{
										"lit": "breeds",
									},
									map[string]any{
										"lit": "list",
									},
									map[string]any{
										"lit": "all",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.message`",
								},
								"parts": []any{
									"breeds",
									"list",
									"all",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"image": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "message",
						"short": "Array of random image URLs for the breed",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
				},
				"name": "image",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "hound",
											"kind": "param",
											"name": "breed_id",
											"orig": "breed",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "afghan",
											"kind": "param",
											"name": "sub_breed",
											"orig": "sub_breed",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/breed/{breed}/{subBreed}/images",
								"rename": map[string]any{
									"param": map[string]any{
										"breed": "breed_id",
										"subBreed": "sub_breed",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "breed",
									},
									map[string]any{
										"var": "breed_id",
									},
									map[string]any{
										"var": "sub_breed",
									},
									map[string]any{
										"lit": "images",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"breed_id",
										"sub_breed",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.message`",
								},
								"parts": []any{
									"breed",
									"{breed_id}",
									"{sub_breed}",
									"images",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "hound",
											"kind": "param",
											"name": "breed_id",
											"orig": "breed",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/breed/{breed}/images",
								"rename": map[string]any{
									"param": map[string]any{
										"breed": "breed_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "breed",
									},
									map[string]any{
										"var": "breed_id",
									},
									map[string]any{
										"lit": "images",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"breed_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.message`",
								},
								"parts": []any{
									"breed",
									"{breed_id}",
									"images",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "hound",
											"kind": "param",
											"name": "breed_id",
											"orig": "breed",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "count",
											"orig": "count",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/breed/{breed}/images/random/{count}",
								"rename": map[string]any{
									"param": map[string]any{
										"breed": "breed_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "breed",
									},
									map[string]any{
										"var": "breed_id",
									},
									map[string]any{
										"lit": "images",
									},
									map[string]any{
										"lit": "random",
									},
									map[string]any{
										"var": "count",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"breed_id",
										"count",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"breed",
									"{breed_id}",
									"images",
									"random",
									"{count}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "hound",
											"kind": "param",
											"name": "breed_id",
											"orig": "breed",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "afghan",
											"kind": "param",
											"name": "sub_breed",
											"orig": "sub_breed",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/breed/{breed}/{subBreed}/images/random",
								"rename": map[string]any{
									"param": map[string]any{
										"breed": "breed_id",
										"subBreed": "sub_breed",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "breed",
									},
									map[string]any{
										"var": "breed_id",
									},
									map[string]any{
										"var": "sub_breed",
									},
									map[string]any{
										"lit": "images",
									},
									map[string]any{
										"lit": "random",
									},
								},
								"select": map[string]any{
									"$action": "random",
									"exist": []any{
										"breed_id",
										"sub_breed",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"breed",
									"{breed_id}",
									"{sub_breed}",
									"images",
									"random",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "hound",
											"kind": "param",
											"name": "breed_id",
											"orig": "breed",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/breed/{breed}/images/random",
								"rename": map[string]any{
									"param": map[string]any{
										"breed": "breed_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "breed",
									},
									map[string]any{
										"var": "breed_id",
									},
									map[string]any{
										"lit": "images",
									},
									map[string]any{
										"lit": "random",
									},
								},
								"select": map[string]any{
									"$action": "random",
									"exist": []any{
										"breed_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"breed",
									"{breed_id}",
									"images",
									"random",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "count",
											"orig": "count",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/breeds/image/random/{count}",
								"segments": []any{
									map[string]any{
										"lit": "breeds",
									},
									map[string]any{
										"lit": "image",
									},
									map[string]any{
										"lit": "random",
									},
									map[string]any{
										"var": "count",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"breeds",
									"image",
									"random",
									"{count}",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/breeds/image/random",
								"segments": []any{
									map[string]any{
										"lit": "breeds",
									},
									map[string]any{
										"lit": "image",
									},
									map[string]any{
										"lit": "random",
									},
								},
								"select": map[string]any{
									"$action": "random",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"breeds",
									"image",
									"random",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"breed",
						},
						[]any{
							"breed",
							"random",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
