<?php
declare(strict_types=1);

// Dog SDK utility: result_headers

class DogResultHeaders
{
    public static function call(DogContext $ctx): ?DogResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
