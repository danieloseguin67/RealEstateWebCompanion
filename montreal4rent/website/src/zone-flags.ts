/**
 * Zone.js configuration flags.
 * This file must be imported BEFORE zone.js in polyfills.ts.
 *
 * Disabling the unload event patch prevents zone.js from registering an
 * `unload` handler on the window, which would otherwise block the browser's
 * back/forward cache (bfcache) and degrade navigation performance.
 *
 * See: https://web.dev/bfcache/#never-use-the-unload-event
 */
(window as any).__Zone_disable_unload = true;
