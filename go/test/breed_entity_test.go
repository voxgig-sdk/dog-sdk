package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/dog-sdk"
	"github.com/voxgig-sdk/dog-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestBreedEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Breed(nil)
		if ent == nil {
			t.Fatal("expected non-nil BreedEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := breedBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "breed." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set DOG_TEST_BREED_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		breedRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.breed", setup.data)))
		var breedRef01Data map[string]any
		if len(breedRef01DataRaw) > 0 {
			breedRef01Data = core.ToMapAny(breedRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = breedRef01Data

		// LIST
		breedRef01Ent := client.Breed(nil)
		breedRef01Match := map[string]any{
			"breed": setup.idmap["breed01"],
		}

		breedRef01ListResult, err := breedRef01Ent.List(breedRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, breedRef01ListOk := breedRef01ListResult.([]any)
		if !breedRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", breedRef01ListResult)
		}

		// LOAD
		breedRef01MatchDt0 := map[string]any{}
		breedRef01DataDt0Loaded, err := breedRef01Ent.Load(breedRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if breedRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func breedBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "breed", "BreedTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read breed test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse breed test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"breed01", "breed02", "breed03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("DOG_TEST_BREED_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"DOG_TEST_BREED_ENTID": idmap,
		"DOG_TEST_LIVE":      "FALSE",
		"DOG_TEST_EXPLAIN":   "FALSE",
		"DOG_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["DOG_TEST_BREED_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["DOG_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["DOG_APIKEY"],
			},
			extra,
		})
		client = sdk.NewDogSDK(core.ToMapAny(mergedOpts))
	}

	live := env["DOG_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["DOG_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
