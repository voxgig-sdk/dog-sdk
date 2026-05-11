<?php
declare(strict_types=1);

// Dog SDK utility: prepare_body

class DogPrepareBody
{
    public static function call(DogContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
