-- Dog SDK error

local DogError = {}
DogError.__index = DogError


function DogError.new(code, msg, ctx)
  local self = setmetatable({}, DogError)
  self.is_sdk_error = true
  self.sdk = "Dog"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function DogError:error()
  return self.msg
end


function DogError:__tostring()
  return self.msg
end


return DogError
