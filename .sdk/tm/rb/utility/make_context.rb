# Dog SDK utility: make_context
require_relative '../core/context'
module DogUtilities
  MakeContext = ->(ctxmap, basectx) {
    DogContext.new(ctxmap, basectx)
  }
end
