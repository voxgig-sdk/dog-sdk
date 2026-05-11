# Dog SDK utility: feature_add
module DogUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
