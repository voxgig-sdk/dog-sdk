<?php
declare(strict_types=1);

// Typed models for the Dog SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Breed entity data model. */
class Breed
{
    public ?array $message = null;
    public ?string $status = null;
}

/** Match filter for Breed#load (any subset of Breed fields). */
class BreedLoadMatch
{
    public ?array $message = null;
    public ?string $status = null;
}

/** Request payload for Breed#list. */
class BreedListMatch
{
    public string $id;
}

/** Image entity data model. */
class Image
{
    public ?array $message = null;
    public ?string $status = null;
}

/** Request payload for Image#load. */
class ImageLoadMatch
{
    public string $breed_id;
    public int $count;
    public string $sub_breed;
}

/** Request payload for Image#list. */
class ImageListMatch
{
    public string $breed_id;
    public string $sub_breed;
}

