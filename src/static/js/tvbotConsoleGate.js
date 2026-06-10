(function () {
    var params = new URLSearchParams(window.location.search);
    var debugEnabled = params.has("debug") || params.has("tvbotDebug");
    if (!window.console) return;

    ["log", "debug", "info"].forEach(function (method) {
        window.console.__tvbotOriginals = window.console.__tvbotOriginals || {};
        if (!window.console.__tvbotOriginals[method] && typeof window.console[method] === "function") {
            window.console.__tvbotOriginals[method] = window.console[method];
        }
        if (debugEnabled && window.console.__tvbotOriginals[method]) {
            window.console[method] = window.console.__tvbotOriginals[method];
        } else if (!debugEnabled && typeof window.console[method] === "function") {
            window.console[method] = function () {};
        }
    });
}());
