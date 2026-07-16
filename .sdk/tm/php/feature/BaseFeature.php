<?php
declare(strict_types=1);

// Dog SDK base feature

class DogBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(DogContext $ctx, array $options): void {}
    public function PostConstruct(DogContext $ctx): void {}
    public function PostConstructEntity(DogContext $ctx): void {}
    public function SetData(DogContext $ctx): void {}
    public function GetData(DogContext $ctx): void {}
    public function GetMatch(DogContext $ctx): void {}
    public function SetMatch(DogContext $ctx): void {}
    public function PrePoint(DogContext $ctx): void {}
    public function PreSpec(DogContext $ctx): void {}
    public function PreRequest(DogContext $ctx): void {}
    public function PreResponse(DogContext $ctx): void {}
    public function PreResult(DogContext $ctx): void {}
    public function PreDone(DogContext $ctx): void {}
    public function PreUnexpected(DogContext $ctx): void {}
}
