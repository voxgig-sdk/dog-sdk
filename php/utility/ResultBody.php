<?php
declare(strict_types=1);

// Dog SDK utility: result_body

class DogResultBody
{
    public static function call(DogContext $ctx): ?DogResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
