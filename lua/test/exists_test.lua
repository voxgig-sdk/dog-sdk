-- Dog SDK exists test

local sdk = require("dog_sdk")

describe("DogSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
