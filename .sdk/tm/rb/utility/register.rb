# Dog SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

DogUtility.registrar = ->(u) {
  u.clean = DogUtilities::Clean
  u.done = DogUtilities::Done
  u.make_error = DogUtilities::MakeError
  u.feature_add = DogUtilities::FeatureAdd
  u.feature_hook = DogUtilities::FeatureHook
  u.feature_init = DogUtilities::FeatureInit
  u.fetcher = DogUtilities::Fetcher
  u.make_fetch_def = DogUtilities::MakeFetchDef
  u.make_context = DogUtilities::MakeContext
  u.make_options = DogUtilities::MakeOptions
  u.make_request = DogUtilities::MakeRequest
  u.make_response = DogUtilities::MakeResponse
  u.make_result = DogUtilities::MakeResult
  u.make_point = DogUtilities::MakePoint
  u.make_spec = DogUtilities::MakeSpec
  u.make_url = DogUtilities::MakeUrl
  u.param = DogUtilities::Param
  u.prepare_auth = DogUtilities::PrepareAuth
  u.prepare_body = DogUtilities::PrepareBody
  u.prepare_headers = DogUtilities::PrepareHeaders
  u.prepare_method = DogUtilities::PrepareMethod
  u.prepare_params = DogUtilities::PrepareParams
  u.prepare_path = DogUtilities::PreparePath
  u.prepare_query = DogUtilities::PrepareQuery
  u.result_basic = DogUtilities::ResultBasic
  u.result_body = DogUtilities::ResultBody
  u.result_headers = DogUtilities::ResultHeaders
  u.transform_request = DogUtilities::TransformRequest
  u.transform_response = DogUtilities::TransformResponse
}
