<?php
declare(strict_types=1);

// Dog SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class DogFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new DogBaseFeature();
            case "test":
                return new DogTestFeature();
            default:
                return new DogBaseFeature();
        }
    }
}
