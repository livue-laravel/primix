<?php

use Primix\Concerns\HasWorkspace;

// ============================================================
// HasWorkspace — trait test via anonymous class
// ============================================================

function makeWorkspaceHost(): object
{
    return new class {
        use HasWorkspace;
    };
}

it('hasWorkspace returns false by default when workspace is null', function () {
    config(['primix.workspace.enabled' => false]);

    expect(makeWorkspaceHost()->hasWorkspace())->toBeFalse();
});

it('hasWorkspace returns true when config is enabled and workspace not explicitly set', function () {
    config(['primix.workspace.enabled' => true]);

    expect(makeWorkspaceHost()->hasWorkspace())->toBeTrue();

    // restore
    config(['primix.workspace.enabled' => false]);
});

it('workspace(true) enables workspace regardless of config', function () {
    config(['primix.workspace.enabled' => false]);

    $host = makeWorkspaceHost();
    $host->workspace(true);

    expect($host->hasWorkspace())->toBeTrue();
});

it('workspace(false) disables workspace regardless of config', function () {
    config(['primix.workspace.enabled' => true]);

    $host = makeWorkspaceHost();
    $host->workspace(false);

    expect($host->hasWorkspace())->toBeFalse();

    config(['primix.workspace.enabled' => false]);
});

it('workspace() defaults to true when called with no arguments', function () {
    $host = makeWorkspaceHost();
    $host->workspace();

    expect($host->hasWorkspace())->toBeTrue();
});

it('workspace() is fluent and returns the same instance', function () {
    $host = makeWorkspaceHost();

    expect($host->workspace(true))->toBe($host);
});

it('hasWorkspaceSetting returns false when workspace not explicitly set', function () {
    expect(makeWorkspaceHost()->hasWorkspaceSetting())->toBeFalse();
});

it('hasWorkspaceSetting returns true after workspace() is called', function () {
    $host = makeWorkspaceHost();
    $host->workspace(true);

    expect($host->hasWorkspaceSetting())->toBeTrue();
});

it('hasWorkspaceSetting returns true after workspace(false) is called', function () {
    $host = makeWorkspaceHost();
    $host->workspace(false);

    expect($host->hasWorkspaceSetting())->toBeTrue();
});

it('workspace accepts a Closure and evaluates it', function () {
    $host = makeWorkspaceHost();
    $host->workspace(fn () => true);

    expect($host->hasWorkspace())->toBeTrue();
});

it('workspace Closure returning false disables workspace', function () {
    $host = makeWorkspaceHost();
    $host->workspace(fn () => false);

    expect($host->hasWorkspace())->toBeFalse();
});

it('hasWorkspaceSetting returns true when Closure is set', function () {
    $host = makeWorkspaceHost();
    $host->workspace(fn () => true);

    expect($host->hasWorkspaceSetting())->toBeTrue();
});
