# ProjectName SDK exists test

import pytest
from dog_sdk import DogSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = DogSDK.test(None, None)
        assert testsdk is not None
