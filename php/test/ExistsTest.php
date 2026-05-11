<?php
declare(strict_types=1);

// Dog SDK exists test

require_once __DIR__ . '/../dog_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = DogSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
