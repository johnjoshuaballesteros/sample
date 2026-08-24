// =========================================================
// APP — Shared rendering and routing
// =========================================================

// --- state ---
var state = {
    page: 'landing',
    program: null,
    area: null,
    param: null,
    category: null,
    fileIndex: null,
    currentPath: []
};

// --- helpers for query string ---
function getQueryParams() {
    var params = new URLSearchParams(window.location.search);
    return {
        area: params.get('area'),
        param: params.get('param'),
        category: params.get('cat'),
        fileIndex: params.get('file') !== null ? parseInt(params.get('file')) : null,
    };
}

function buildQueryString(area, param, category, fileIndex) {
    var parts = [];
    if (area) parts.push('area=' + area);
    if (param) parts.push('param=' + param);
    if (category) parts.push('cat=' + category);
    if (fileIndex !== null && fileIndex !== undefined) parts.push('file=' + fileIndex);
    return parts.length ? '?' + parts.join('&') : '';
}

// --- Helper: get clean path without .html ---
function getCleanPath() {
    var path = window.location.pathname;
    if (path.endsWith('.html')) {
        path = path.slice(0, -5);
    }
    return path;
}

// --- Navigate ---
function navigateTo(page, data) {
    data = data || {};
    var program = window.PROGRAM || state.program;
    var newState = Object.assign({}, state, { page: page, program: program }, data);

    if (page === 'landing') {
        window.location.href = '/';
        return;
    }

    var area = newState.area || null;
    var param = newState.param || null;
    var category = newState.category || null;
    var fileIndex = newState.fileIndex !== undefined && newState.fileIndex !== null ? newState.fileIndex : null;
    var qs = buildQueryString(area, param, category, fileIndex);
    var cleanPath = getCleanPath();
    var url = cleanPath + qs;
    history.pushState({ state: newState }, '', url);
    Object.assign(state, newState);
    render();
}

window.addEventListener('popstate', function(event) {
    if (event.state && event.state.state) {
        Object.assign(state, event.state.state);
    } else {
        var q = getQueryParams();
        state.page = 'program';
        state.area = q.area || null;
        state.param = q.param || null;
        state.category = q.category || null;
        state.fileIndex = q.fileIndex !== null ? q.fileIndex : null;
        state.currentPath = [];
    }
    render();
});

// --- Rendering functions (unchanged from previous version) ---
// (Isama mo rito ang lahat ng renderProgram, renderArea, renderParameter, renderCategory, renderDocument, at renderNotFound)

// Para sa kumpletong `app.js`, gamitin ang nakaraang bersyon at idagdag lamang ang `getCleanPath` at baguhin ang `navigateTo` gaya ng nasa itaas.

// --- Init ---
function initApp() {
    var q = getQueryParams();
    state.program = window.PROGRAM || 'BSIT';
    state.area = q.area || null;
    state.param = q.param || null;
    state.category = q.category || null;
    state.fileIndex = q.fileIndex !== null ? q.fileIndex : null;
    state.currentPath = [];
    render();
}

document.addEventListener('DOMContentLoaded', function() {
    initApp();
});
