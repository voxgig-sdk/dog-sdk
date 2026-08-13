// Typed models for the Dog SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Breed {
  message?: any[]
  status?: string
}

export interface BreedLoadMatch {
  message?: any[]
  status?: string
}

export interface BreedListMatch {
  id: string

  // Selects a custom action instead of the plain list:
  //   'list'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Image {
  message?: any[]
  status?: string
}

export interface ImageLoadMatch {
  breed_id?: string
  count: number

  // Selects a custom action instead of the plain load:
  //   'random' | 'random' | 'random'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ImageListMatch {
  breed_id: string
  sub_breed?: string
}

