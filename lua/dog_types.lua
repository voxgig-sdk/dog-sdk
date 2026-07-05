-- Typed models for the Dog SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Breed
---@field message? table
---@field status? string

---@class BreedLoadMatch
---@field message? table
---@field status? string

---@class BreedListMatch
---@field id string

---@class Image
---@field message? table
---@field status? string

---@class ImageLoadMatch
---@field breed_id string
---@field count number
---@field sub_breed string

---@class ImageListMatch
---@field breed_id string
---@field sub_breed string

local M = {}

return M
