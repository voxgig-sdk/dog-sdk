<?php
declare(strict_types=1);

// Dog SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class DogMakeContext
{
    public static function call(array $ctxmap, ?DogContext $basectx): DogContext
    {
        return new DogContext($ctxmap, $basectx);
    }
}
