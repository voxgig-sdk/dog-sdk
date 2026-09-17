"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BreedEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DOG_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DOG_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DogSDK.test();
        const ent = testsdk.Breed();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DOG_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'breed.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 0 }], "id": { "field": "id", "name": "id" }, "name": "breed", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "hound", "kind": "param", "name": "id", "orig": "breed", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /breed/{breed}/list", "json": "{\"operationId\":\"listSubBreeds\",\"parameters\":[{\"description\":\"The breed name\",\"example\":\"hound\",\"in\":\"path\",\"name\":\"breed\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Array of sub-breed names\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Breed not found\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Breed not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/breed/{breed}/list", "rename": { "param": { "breed": "id" } }, "segments": [{ "lit": "breed" }, { "var": "id" }, { "lit": "list" }], "select": { "$action": "list", "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body.message`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /breeds/list/all", "json": "{\"operationId\":\"listAllBreeds\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"additionalProperties\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Object containing breed names as keys and sub-breeds as array values\",\"example\":{\"affenpinscher\":[],\"african\":[],\"hound\":[\"afghan\",\"basset\",\"blood\",\"english\",\"ibizan\",\"plott\",\"walker\"]},\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/breeds/list/all", "segments": [{ "lit": "breeds" }, { "lit": "list" }, { "lit": "all" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.message`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "breed", "name__orig": "breed", "Name": "Breed", "name_": "breed", "name-": "breed", "NAME": "BREED", "index$": 0 }, { "active": true, "entity": "breed", "key$": "BasicBreedFlow", "kind": "basic", "name": "BasicBreedFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "breed": "breed01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "breed_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "breed_ref01", "srcdatavar": "breed_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-breed_ref01" } }], "index$": 1 }] }, 'Breed');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let breed_ref01_data = Object.values(setup.data.existing.breed)[0];
        // LIST
        const breed_ref01_ent = client.Breed();
        const breed_ref01_match = {};
        breed_ref01_match['breed'] = setup.idmap['breed01'];
        const breed_ref01_list = (await breed_ref01_ent.list(breed_ref01_match)).map((e) => e.data());
        // LOAD
        const breed_ref01_match_dt0 = {};
        breed_ref01_match_dt0.id = breed_ref01_data.id;
        const breed_ref01_data_dt0 = (await breed_ref01_ent.load(breed_ref01_match_dt0)).data();
        (0, node_assert_1.default)(breed_ref01_data_dt0.id === breed_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/breed/BreedTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DogSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['breed01', 'breed02', 'breed03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DOG_TEST_BREED_ENTID': idmap,
        'DOG_TEST_LIVE': 'FALSE',
        'DOG_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DOG_TEST_BREED_ENTID'];
    const live = 'TRUE' === env.DOG_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DOG_TEST_BREED_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.DogSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.DOG_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=BreedEntity.test.js.map