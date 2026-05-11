# Dog SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module DogFeatures
  def self.make_feature(name)
    case name
    when "base"
      DogBaseFeature.new
    when "test"
      DogTestFeature.new
    else
      DogBaseFeature.new
    end
  end
end
