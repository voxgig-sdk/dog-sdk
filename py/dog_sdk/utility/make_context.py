# Dog SDK utility: make_context

from dog_sdk.core.context import DogContext


def make_context_util(ctxmap, basectx):
    return DogContext(ctxmap, basectx)
