<?php
declare(strict_types=1);

// Dog SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

DogUtility::setRegistrar(function (DogUtility $u): void {
    $u->clean = [DogClean::class, 'call'];
    $u->done = [DogDone::class, 'call'];
    $u->make_error = [DogMakeError::class, 'call'];
    $u->feature_add = [DogFeatureAdd::class, 'call'];
    $u->feature_hook = [DogFeatureHook::class, 'call'];
    $u->feature_init = [DogFeatureInit::class, 'call'];
    $u->fetcher = [DogFetcher::class, 'call'];
    $u->make_fetch_def = [DogMakeFetchDef::class, 'call'];
    $u->make_context = [DogMakeContext::class, 'call'];
    $u->make_options = [DogMakeOptions::class, 'call'];
    $u->make_request = [DogMakeRequest::class, 'call'];
    $u->make_response = [DogMakeResponse::class, 'call'];
    $u->make_result = [DogMakeResult::class, 'call'];
    $u->make_point = [DogMakePoint::class, 'call'];
    $u->make_spec = [DogMakeSpec::class, 'call'];
    $u->make_url = [DogMakeUrl::class, 'call'];
    $u->param = [DogParam::class, 'call'];
    $u->prepare_auth = [DogPrepareAuth::class, 'call'];
    $u->prepare_body = [DogPrepareBody::class, 'call'];
    $u->prepare_headers = [DogPrepareHeaders::class, 'call'];
    $u->prepare_method = [DogPrepareMethod::class, 'call'];
    $u->prepare_params = [DogPrepareParams::class, 'call'];
    $u->prepare_path = [DogPreparePath::class, 'call'];
    $u->prepare_query = [DogPrepareQuery::class, 'call'];
    $u->result_basic = [DogResultBasic::class, 'call'];
    $u->result_body = [DogResultBody::class, 'call'];
    $u->result_headers = [DogResultHeaders::class, 'call'];
    $u->transform_request = [DogTransformRequest::class, 'call'];
    $u->transform_response = [DogTransformResponse::class, 'call'];
});
