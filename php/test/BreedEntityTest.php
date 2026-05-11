<?php
declare(strict_types=1);

// Breed entity test

require_once __DIR__ . '/../dog_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BreedEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = DogSDK::test(null, null);
        $ent = $testsdk->Breed(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = breed_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "breed." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set DOG_TEST_BREED_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $breed_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.breed")));
        $breed_ref01_data = null;
        if (count($breed_ref01_data_raw) > 0) {
            $breed_ref01_data = Helpers::to_map($breed_ref01_data_raw[0][1]);
        }

        // LIST
        $breed_ref01_ent = $client->Breed(null);
        $breed_ref01_match = [
            "breed" => $setup["idmap"]["breed01"],
        ];

        [$breed_ref01_list_result, $err] = $breed_ref01_ent->list($breed_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($breed_ref01_list_result);

        // LOAD
        $breed_ref01_match_dt0 = [];
        [$breed_ref01_data_dt0_loaded, $err] = $breed_ref01_ent->load($breed_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($breed_ref01_data_dt0_loaded);

    }
}

function breed_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/breed/BreedTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = DogSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["breed01", "breed02", "breed03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("DOG_TEST_BREED_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "DOG_TEST_BREED_ENTID" => $idmap,
        "DOG_TEST_LIVE" => "FALSE",
        "DOG_TEST_EXPLAIN" => "FALSE",
        "DOG_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["DOG_TEST_BREED_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["DOG_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["DOG_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new DogSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["DOG_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["DOG_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
