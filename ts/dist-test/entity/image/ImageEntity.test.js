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
(0, node_test_1.describe)('ImageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DOG_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DOG_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DogSDK.test();
        const ent = testsdk.Image();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DOG_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'image.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "message", "req": false, "short": "Array of random image URLs for the breed", "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "status", "req": false, "type": "`$STRING`", "index$": 1 }], "name": "image", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "hound", "kind": "param", "name": "breed_id", "orig": "breed", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "afghan", "kind": "param", "name": "sub_breed", "orig": "sub_breed", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /breed/{breed}/{subBreed}/images", "json": "{\"operationId\":\"getSubBreedImages\",\"parameters\":[{\"description\":\"The breed name\",\"example\":\"hound\",\"in\":\"path\",\"name\":\"breed\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The sub-breed name\",\"example\":\"afghan\",\"in\":\"path\",\"name\":\"subBreed\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Array of image URLs for the sub-breed\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Breed not found\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Breed or sub-breed not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/breed/{breed}/{subBreed}/images", "rename": { "param": { "breed": "breed_id", "subBreed": "sub_breed" } }, "segments": [{ "lit": "breed" }, { "var": "breed_id" }, { "var": "sub_breed" }, { "lit": "images" }], "select": { "exist": ["breed_id", "sub_breed"] }, "transform": { "req": "`reqdata`", "res": "`body.message`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "example": "hound", "kind": "param", "name": "breed_id", "orig": "breed", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /breed/{breed}/images", "json": "{\"operationId\":\"getBreedImages\",\"parameters\":[{\"description\":\"The breed name\",\"example\":\"hound\",\"in\":\"path\",\"name\":\"breed\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Array of image URLs for the breed\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Breed not found\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Breed not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/breed/{breed}/images", "rename": { "param": { "breed": "breed_id" } }, "segments": [{ "lit": "breed" }, { "var": "breed_id" }, { "lit": "images" }], "select": { "exist": ["breed_id"] }, "transform": { "req": "`reqdata`", "res": "`body.message`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "hound", "kind": "param", "name": "breed_id", "orig": "breed", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "count", "orig": "count", "reqd": true, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "GET /breed/{breed}/images/random/{count}", "json": "{\"operationId\":\"getMultipleRandomBreedImages\",\"parameters\":[{\"description\":\"The breed name\",\"example\":\"hound\",\"in\":\"path\",\"name\":\"breed\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of random images to return\",\"in\":\"path\",\"name\":\"count\",\"required\":true,\"schema\":{\"maximum\":50,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Array of random image URLs for the breed\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Breed not found\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Breed not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/breed/{breed}/images/random/{count}", "rename": { "param": { "breed": "breed_id" } }, "segments": [{ "lit": "breed" }, { "var": "breed_id" }, { "lit": "images" }, { "lit": "random" }, { "var": "count" }], "select": { "exist": ["breed_id", "count"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "example": "hound", "kind": "param", "name": "breed_id", "orig": "breed", "reqd": true, "type": "`$STRING`" }, { "active": true, "example": "afghan", "kind": "param", "name": "sub_breed", "orig": "sub_breed", "reqd": true, "type": "`$STRING`" }] }, "contract": { "id": "GET /breed/{breed}/{subBreed}/images/random", "json": "{\"operationId\":\"getRandomSubBreedImage\",\"parameters\":[{\"description\":\"The breed name\",\"example\":\"hound\",\"in\":\"path\",\"name\":\"breed\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The sub-breed name\",\"example\":\"afghan\",\"in\":\"path\",\"name\":\"subBreed\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"URL of random image for the sub-breed\",\"type\":\"string\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Breed not found\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Breed or sub-breed not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/breed/{breed}/{subBreed}/images/random", "rename": { "param": { "breed": "breed_id", "subBreed": "sub_breed" } }, "segments": [{ "lit": "breed" }, { "var": "breed_id" }, { "var": "sub_breed" }, { "lit": "images" }, { "lit": "random" }], "select": { "$action": "random", "exist": ["breed_id", "sub_breed"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "active": true, "args": { "params": [{ "active": true, "example": "hound", "kind": "param", "name": "breed_id", "orig": "breed", "reqd": true, "type": "`$STRING`" }] }, "contract": { "id": "GET /breed/{breed}/images/random", "json": "{\"operationId\":\"getRandomBreedImage\",\"parameters\":[{\"description\":\"The breed name\",\"example\":\"hound\",\"in\":\"path\",\"name\":\"breed\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"URL of random image for the breed\",\"type\":\"string\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Breed not found\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Breed not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/breed/{breed}/images/random", "rename": { "param": { "breed": "breed_id" } }, "segments": [{ "lit": "breed" }, { "var": "breed_id" }, { "lit": "images" }, { "lit": "random" }], "select": { "$action": "random", "exist": ["breed_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "count", "orig": "count", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /breeds/image/random/{count}", "json": "{\"operationId\":\"getMultipleRandomDogImages\",\"parameters\":[{\"description\":\"Number of random images to return (max 50)\",\"in\":\"path\",\"name\":\"count\",\"required\":true,\"schema\":{\"maximum\":50,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Array of URLs of random dog images\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/breeds/image/random/{count}", "segments": [{ "lit": "breeds" }, { "lit": "image" }, { "lit": "random" }, { "var": "count" }], "select": { "exist": ["count"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "active": true, "args": {}, "contract": { "id": "GET /breeds/image/random", "json": "{\"operationId\":\"getRandomDogImage\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"URL of the random dog image\",\"example\":\"https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg\",\"type\":\"string\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/breeds/image/random", "segments": [{ "lit": "breeds" }, { "lit": "image" }, { "lit": "random" }], "select": { "$action": "random" }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }], "key$": "load" } }, "relations": { "ancestors": [["breed"], ["breed", "random"]] }, "key$": "image", "name__orig": "image", "Name": "Image", "name_": "image", "name-": "image", "NAME": "IMAGE", "index$": 1 }, { "active": true, "entity": "image", "key$": "BasicImageFlow", "kind": "basic", "name": "BasicImageFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "breed_id": "breed01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "image_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "image_ref01", "srcdatavar": "image_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-image_ref01" } }], "index$": 1 }] }, 'Image');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let image_ref01_data = Object.values(setup.data.existing.image)[0];
        // LIST
        const image_ref01_ent = client.Image();
        const image_ref01_match = {};
        image_ref01_match['breed_id'] = setup.idmap['breed01'];
        const image_ref01_list = (await image_ref01_ent.list(image_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/image/ImageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DogSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['image01', 'image02', 'image03', 'breed01', 'breed02', 'breed03', 'breed01', 'breed02', 'breed03', 'random01', 'random02', 'random03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DOG_TEST_IMAGE_ENTID': idmap,
        'DOG_TEST_LIVE': 'FALSE',
        'DOG_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DOG_TEST_IMAGE_ENTID'];
    const live = 'TRUE' === env.DOG_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DOG_TEST_IMAGE_ENTID'];
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
//# sourceMappingURL=ImageEntity.test.js.map