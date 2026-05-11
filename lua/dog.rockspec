package = "dog-sdk"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig/dog-sdk.git"
}
description = {
  summary = "Dog SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["dog_sdk"] = "dog_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
