// Typed models for the Dog SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Breed {
  message?: Record<string, any>
  status?: string
}

export type BreedLoadMatch = Partial<Breed>

export interface BreedListMatch {
  id: string
}

export interface Image {
  message?: any[]
  status?: string
}

export interface ImageLoadMatch {
  breed_id: string
  count: number
  sub_breed: string
}

export interface ImageListMatch {
  breed_id: string
  sub_breed: string
}

