# frozen_string_literal: true

# Typed models for the Dog SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Breed entity data model.
#
# @!attribute [rw] message
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
Breed = Struct.new(
  :message,
  :status,
  keyword_init: true
)

# Request payload for Breed#load.
#
# @!attribute [rw] message
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
BreedLoadMatch = Struct.new(
  :message,
  :status,
  keyword_init: true
)

# Request payload for Breed#list.
#
# @!attribute [rw] id
#   @return [String]
BreedListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Image entity data model.
#
# @!attribute [rw] message
#   @return [Array, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
Image = Struct.new(
  :message,
  :status,
  keyword_init: true
)

# Request payload for Image#load.
#
# @!attribute [rw] breed_id
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer]
ImageLoadMatch = Struct.new(
  :breed_id,
  :count,
  keyword_init: true
)

# Request payload for Image#list.
#
# @!attribute [rw] breed_id
#   @return [String]
#
# @!attribute [rw] sub_breed
#   @return [String, nil]
ImageListMatch = Struct.new(
  :breed_id,
  :sub_breed,
  keyword_init: true
)

