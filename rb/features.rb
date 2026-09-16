# Dog SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module DogFeatures
  def self.make_feature(name)
    case name
    when "base"
      DogBaseFeature.new
    when "ratelimit"
      DogRatelimitFeature.new
    when "retry"
      DogRetryFeature.new
    when "test"
      DogTestFeature.new
    when "timeout"
      DogTimeoutFeature.new
    else
      DogBaseFeature.new
    end
  end
end
