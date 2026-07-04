# Breed entity test

require "minitest/autorun"
require "json"
require_relative "../Dog_sdk"
require_relative "runner"

class BreedEntityTest < Minitest::Test
  def test_create_instance
    testsdk = DogSDK.test(nil, nil)
    ent = testsdk.Breed(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = breed_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "breed." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set DOG_TEST_BREED_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    breed_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.breed")))
    breed_ref01_data = nil
    if breed_ref01_data_raw.length > 0
      breed_ref01_data = Helpers.to_map(breed_ref01_data_raw[0][1])
    end

    # LIST
    breed_ref01_ent = client.Breed(nil)
    breed_ref01_match = {
      "breed" => setup[:idmap]["breed01"],
    }

    breed_ref01_list_result = breed_ref01_ent.list(breed_ref01_match, nil)
    assert breed_ref01_list_result.is_a?(Array)

    # LOAD
    breed_ref01_match_dt0 = {}
    breed_ref01_data_dt0_loaded = breed_ref01_ent.load(breed_ref01_match_dt0, nil)
    assert !breed_ref01_data_dt0_loaded.nil?

  end
end

def breed_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "breed", "BreedTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = DogSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["breed01", "breed02", "breed03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["DOG_TEST_BREED_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "DOG_TEST_BREED_ENTID" => idmap,
    "DOG_TEST_LIVE" => "FALSE",
    "DOG_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["DOG_TEST_BREED_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["DOG_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = DogSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["DOG_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["DOG_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
