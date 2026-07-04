// Typed models for the Dog SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Breed is the typed data model for the breed entity.
type Breed struct {
	Message *map[string]any `json:"message,omitempty"`
	Status *string `json:"status,omitempty"`
}

// BreedLoadMatch mirrors the breed fields as an all-optional match
// filter (Go analog of Partial<Breed>).
type BreedLoadMatch struct {
	Message *map[string]any `json:"message,omitempty"`
	Status *string `json:"status,omitempty"`
}

// BreedListMatch is the typed request payload for Breed.ListTyped.
type BreedListMatch struct {
	Id string `json:"id"`
}

// Image is the typed data model for the image entity.
type Image struct {
	Message *[]any `json:"message,omitempty"`
	Status *string `json:"status,omitempty"`
}

// ImageLoadMatch is the typed request payload for Image.LoadTyped.
type ImageLoadMatch struct {
	BreedId string `json:"breed_id"`
	Count int `json:"count"`
	SubBreed string `json:"sub_breed"`
}

// ImageListMatch is the typed request payload for Image.ListTyped.
type ImageListMatch struct {
	BreedId string `json:"breed_id"`
	SubBreed string `json:"sub_breed"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
