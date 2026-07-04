# Typed models for the Dog SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Breed:
    message: Optional[dict] = None
    status: Optional[str] = None


@dataclass
class BreedLoadMatch:
    message: Optional[dict] = None
    status: Optional[str] = None


@dataclass
class BreedListMatch:
    id: str


@dataclass
class Image:
    message: Optional[list] = None
    status: Optional[str] = None


@dataclass
class ImageLoadMatch:
    breed_id: str
    count: int
    sub_breed: str


@dataclass
class ImageListMatch:
    breed_id: str
    sub_breed: str

