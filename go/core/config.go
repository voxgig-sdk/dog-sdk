package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Dog",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://dog.ceo/api",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
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
						"active": true,
						"name": "message",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "status",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
				},
				"name": "breed",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "hound",
											"kind": "param",
											"name": "id",
											"orig": "breed",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"image": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "message",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "status",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
				},
				"name": "image",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "hound",
											"kind": "param",
											"name": "breed_id",
											"orig": "breed",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "afghan",
											"kind": "param",
											"name": "sub_breed",
											"orig": "sub_breed",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "hound",
											"kind": "param",
											"name": "breed_id",
											"orig": "breed",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 1,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "hound",
											"kind": "param",
											"name": "breed_id",
											"orig": "breed",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "count",
											"orig": "count",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "hound",
											"kind": "param",
											"name": "breed_id",
											"orig": "breed",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "afghan",
											"kind": "param",
											"name": "sub_breed",
											"orig": "sub_breed",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "hound",
											"kind": "param",
											"name": "breed_id",
											"orig": "breed",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 2,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"kind": "param",
											"name": "count",
											"orig": "count",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
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
								"index$": 3,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{},
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
								"index$": 4,
							},
						},
						"key$": "load",
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
