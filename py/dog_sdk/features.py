# Dog SDK feature factory

from dog_sdk.feature.base_feature import DogBaseFeature
from dog_sdk.feature.test_feature import DogTestFeature


def _make_feature(name):
    features = {
        "base": lambda: DogBaseFeature(),
        "test": lambda: DogTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
