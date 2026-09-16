package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewBreedEntityFunc func(client *DogSDK, entopts map[string]any) DogEntity

var NewImageEntityFunc func(client *DogSDK, entopts map[string]any) DogEntity

