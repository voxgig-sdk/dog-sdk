package voxgigdogsdk

import (
	"github.com/voxgig-sdk/dog-sdk/go/core"
	"github.com/voxgig-sdk/dog-sdk/go/entity"
	"github.com/voxgig-sdk/dog-sdk/go/feature"
	_ "github.com/voxgig-sdk/dog-sdk/go/utility"
)

// Type aliases preserve external API.
type DogSDK = core.DogSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type DogEntity = core.DogEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type DogError = core.DogError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBreedEntityFunc = func(client *core.DogSDK, entopts map[string]any) core.DogEntity {
		return entity.NewBreedEntity(client, entopts)
	}
	core.NewImageEntityFunc = func(client *core.DogSDK, entopts map[string]any) core.DogEntity {
		return entity.NewImageEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewDogSDK = core.NewDogSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewDogSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *DogSDK  { return NewDogSDK(nil) }
func Test() *DogSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
