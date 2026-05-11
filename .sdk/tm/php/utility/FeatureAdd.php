<?php
declare(strict_types=1);

// Dog SDK utility: feature_add

class DogFeatureAdd
{
    public static function call(DogContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
