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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
								"parts": []any{
									"breed",
									"{id}",
									"list",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"breed": "id",
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
								"parts": []any{
									"breeds",
									"list",
									"all",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.message`",
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
								"parts": []any{
									"breed",
									"{breed_id}",
									"{sub_breed}",
									"images",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"breed": "breed_id",
										"subBreed": "sub_breed",
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
								"parts": []any{
									"breed",
									"{breed_id}",
									"images",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"breed": "breed_id",
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
								"parts": []any{
									"breed",
									"{breed_id}",
									"images",
									"random",
									"{count}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"breed": "breed_id",
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
								"parts": []any{
									"breed",
									"{breed_id}",
									"{sub_breed}",
									"images",
									"random",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"breed": "breed_id",
										"subBreed": "sub_breed",
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
								"parts": []any{
									"breed",
									"{breed_id}",
									"images",
									"random",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"breed": "breed_id",
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
								"parts": []any{
									"breeds",
									"image",
									"random",
									"{count}",
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
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/breeds/image/random",
								"parts": []any{
									"breeds",
									"image",
									"random",
								},
								"select": map[string]any{
									"$action": "random",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
