// =========================================================
// APP — Shared rendering and routing (query‑based)
// =========================================================

// --- state ---
var state = {
    page: 'program',
    program: window.PROGRAM || 'BSIT',
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

// --- Navigate ---
function navigateTo(page, data) {
    data = data || {};
    var newState = Object.assign({}, state, { page: page }, data);

    if (page === 'landing') {
        window.location.href = '/';
        return;
    }

    var area = newState.area || null;
    var param = newState.param || null;
    var category = newState.category || null;
    var fileIndex = newState.fileIndex !== undefined && newState.fileIndex !== null ? newState.fileIndex : null;
    var qs = buildQueryString(area, param, category, fileIndex);
    var url = window.location.pathname + qs;

    history.pushState({ state: newState }, '', url);
    Object.assign(state, newState);
    render();
}

window.addEventListener('popstate', function(event) {
    if (event.state && event.state.state) {
        Object.assign(state, event.state.state);
    } else {
        var q = getQueryParams();
        state.area = q.area || null;
        state.param = q.param || null;
        state.category = q.category || null;
        state.fileIndex = q.fileIndex !== null ? q.fileIndex : null;
        state.currentPath = [];
    }
    render();
});

// --- Render functions (halos pareho sa orihinal, ngunit gumagamit ng `navigateTo` at `state`) ---

function renderNotFound() {
    var wrap = document.createElement('div');
    wrap.innerHTML = `
        <div class="empty-state" style="margin-top:60px;">
            <div class="icon">🔍</div>
            <h3>Page Not Found</h3>
            <p>The URL you requested does not exist in this accreditation system.</p>
            <button class="btn-back" onclick="navigateTo('landing',{})">← Go to Home</button>
        </div>
    `;
    return wrap;
}

function updatePageTitle() {
    var program = state.program;
    var base = 'AACCUP Accreditation System | OMSC';
    var title = base;
    if (state.area && state.param && state.category && state.fileIndex !== null) {
        var files = getDocumentFiles(state.program, state.area, state.param, state.category);
        var file = files[state.fileIndex];
        title = (file ? file.name : 'Document') + ' | OMSC';
    } else if (state.area && state.param && state.category) {
        var cats = getCategoriesForParam(state.program, state.area, state.param);
        var catObj = cats.find(function(c) { return c.key === state.category; });
        title = (catObj ? catObj.label : state.category) + ' | OMSC';
    } else if (state.area && state.param) {
        var params = getParamsForProgram(state.program, state.area);
        var paramName = params[state.param] || 'Parameter ' + state.param;
        title = paramName + ' | OMSC';
    } else if (state.area) {
        title = 'Area ' + state.area + ' — ' + getAreaNameForProgram(state.program, state.area) + ' | OMSC';
    } else {
        title = program + ' — ' + (PROGRAMS[program] || '') + ' | OMSC';
    }
    document.title = title;
}

function crumb(items) {
    var clickable = items.slice(0, -1);
    var html = '<nav class="breadcrumb">';
    clickable.forEach(function(it, i) {
        html += '<a href="#" data-crumb="' + i + '">' + it.label + '</a>';
        if (i < clickable.length - 1) html += '<span class="sep">/</span>';
    });
    if (items.length > 0) {
        var last = items[items.length - 1];
        if (clickable.length > 0) html += '<span class="sep">/</span>';
        html += '<span class="current">' + last.label + '</span>';
    }
    html += '</nav>';
    return html;
}

function bindCrumbs(container, items) {
    var clickable = items.slice(0, -1);
    container.querySelectorAll('[data-crumb]').forEach(function(a) {
        var idx = Number(a.dataset.crumb);
        if (idx < clickable.length) {
            a.addEventListener('click', function(e) { e.preventDefault();
                clickable[idx].go(); });
        }
    });
}

function renderProgram() {
    var program = state.program;
    var wrap = document.createElement('div');
    var crumbItems = [
        { label: 'Home', go: function() { navigateTo('landing', {}); } },
        { label: program, go: function() { navigateTo('program', { program: program }); } }
    ];
    var html = crumb(crumbItems) +
        '<div class="page-header-row">' +
        '<button class="btn-back" data-back-home>← Back to Home</button>' +
        '<h2>' + program + ' — ' + PROGRAMS[program] + '</h2>' +
        '<span class="spacer"></span>' +
        '</div>' +
        '<div class="area-grid">';
    var areaKeys = Object.keys(AREAS_FULL);
    for (var a = 0; a < areaKeys.length; a++) {
        var key = areaKeys[a];
        var areaName = getAreaNameForProgram(program, key);
        html += '<button class="btn-area" data-area="' + key + '">' +
            '<span class="num">' + key + '</span>' +
            '<span class="label">' + areaName + '</span>' +
            '<span class="arrow">›</span>' +
            '</button>';
    }
    html += '</div>';
    wrap.innerHTML = html;
    bindCrumbs(wrap, crumbItems);
    wrap.querySelector('[data-back-home]').addEventListener('click', function() {
        navigateTo('landing', {});
    });
    wrap.querySelectorAll('.btn-area').forEach(function(b) {
        b.addEventListener('click', function() {
            navigateTo('area', { program: program, area: b.dataset.area });
        });
    });
    return wrap;
}

function renderArea() {
    var program = state.program;
    var area = state.area;
    var areaName = getAreaNameForProgram(program, area);
    var params = getParamsForProgram(program, area);
    var wrap = document.createElement('div');
    var crumbItems = [
        { label: 'Home', go: function() { navigateTo('landing', {}); } },
        { label: program, go: function() { navigateTo('program', { program: program }); } },
        { label: 'Area ' + area, go: function() { navigateTo('area', { program: program, area: area }); } }
    ];
    var html = crumb(crumbItems) +
        '<div class="page-header-row">' +
        '<button class="btn-back" data-back-program>← Back to ' + program + '</button>' +
        '<h2>' + areaName + '</h2>' +
        '<span class="spacer"></span>' +
        '</div>' +
        '<div class="param-grid">';
    var paramKeys = Object.keys(params);
    for (var p = 0; p < paramKeys.length; p++) {
        var code = paramKeys[p];
        var name = params[code];
        html += '<button class="btn-param" data-param="' + code + '">' +
            '<span class="letter">' + code + '</span>' +
            '<span class="label">' + name + '</span>' +
            '<span class="arrow">›</span>' +
            '</button>';
    }
    html += '</div>';
    wrap.innerHTML = html;
    bindCrumbs(wrap, crumbItems);
    wrap.querySelector('[data-back-program]').addEventListener('click', function() {
        navigateTo('program', { program: program });
    });
    wrap.querySelectorAll('.btn-param').forEach(function(b) {
        b.addEventListener('click', function() {
            navigateTo('parameter', { program: program, area: area, param: b.dataset.param });
        });
    });
    return wrap;
}

function renderParameter() {
    var program = state.program;
    var area = state.area;
    var param = state.param;
    var params = getParamsForProgram(program, area);
    var paramName = params[param] || 'Parameter ' + param;
    var categories = getCategoriesForParam(program, area, param);

    var wrap = document.createElement('div');
    var crumbItems = [
        { label: 'Home', go: function() { navigateTo('landing', {}); } },
        { label: program, go: function() { navigateTo('program', { program: program }); } },
        { label: 'Area ' + area, go: function() { navigateTo('area', { program: program, area: area }); } },
        { label: 'Parameter ' + param, go: function() { navigateTo('parameter', { program: program, area: area, param: param }); } }
    ];
    var html = crumb(crumbItems) +
        '<div class="page-header-row">' +
        '<button class="btn-back" data-back-area>← Back to Area ' + area + '</button>' +
        '<h2>' + paramName + '</h2>' +
        '<span class="spacer"></span>' +
        '</div>' +
        '<div class="doc-grid">';
    for (var c = 0; c < categories.length; c++) {
        var cat = categories[c];
        html += '<button class="btn-doc" data-cat="' + cat.key + '">' +
            '<span class="icon">' + cat.icon + '</span>' +
            '<span class="label">' + cat.label + '</span>' +
            '<span class="desc"></span>' +
            '</button>';
    }
    html += '</div>';
    wrap.innerHTML = html;
    bindCrumbs(wrap, crumbItems);
    wrap.querySelector('[data-back-area]').addEventListener('click', function() {
        navigateTo('area', { program: program, area: area });
    });
    wrap.querySelectorAll('.btn-doc').forEach(function(b) {
        b.addEventListener('click', function() {
            navigateTo('category', { program: program, area: area, param: param, category: b.dataset.cat });
        });
    });
    return wrap;
}

function renderCategory() {
    var program = state.program;
    var area = state.area;
    var param = state.param;
    var category = state.category;
    var params = getParamsForProgram(program, area);
    var paramName = params[param] || 'Parameter ' + param;
    var areaName = getAreaNameForProgram(program, area);
    var categories = getCategoriesForParam(program, area, param);
    var catInfo = categories.find(function(c) { return c.key === category; });

    var files = getDocumentFiles(program, area, param, category);
    var tree = buildHierarchy(files);

    if (!state.currentPath || !Array.isArray(state.currentPath)) state.currentPath = [];
    var currentNode = { children: tree };
    for (var cp = 0; cp < state.currentPath.length; cp++) {
        var code = state.currentPath[cp];
        var child = null;
        for (var cc = 0; cc < currentNode.children.length; cc++) {
            if (currentNode.children[cc].code === code) { child = currentNode.children[cc]; break; }
        }
        if (!child) { state.currentPath = [];
            currentNode = { children: tree }; break; }
        currentNode = child;
    }
    var displayNodes = currentNode.children || [];

    var pathLabels = [];
    var temp = { children: tree };
    for (var lp = 0; lp < state.currentPath.length; lp++) {
        var cCode = state.currentPath[lp];
        var found = null;
        for (var fc = 0; fc < temp.children.length; fc++) {
            if (temp.children[fc].code === cCode) { found = temp.children[fc]; break; }
        }
        if (!found) break;
        pathLabels.push({ code: found.code, name: found.name });
        temp = found;
    }

    var wrap = document.createElement('div');
    var crumbItems = [
        { label: 'Home', go: function() { navigateTo('landing', {}); } },
        { label: program, go: function() { navigateTo('program', { program: program }); } },
        { label: 'Area ' + area, go: function() { navigateTo('area', { program: program, area: area }); } },
        { label: 'Parameter ' + param, go: function() { navigateTo('parameter', { program: program, area: area, param: param }); } },
        { label: catInfo ? catInfo.label : category, go: function() { navigateTo('category', { program: program, area: area, param: param, category: category }); } }
    ];
    for (var pl = 0; pl < pathLabels.length; pl++) {
        (function(idx) {
            var p = pathLabels[idx];
            var pathUpTo = state.currentPath.slice(0, idx + 1);
            crumbItems.push({
                label: p.code,
                go: function() { navigateTo('category', { program: program, area: area, param: param, category: category, currentPath: pathUpTo }); }
            });
        })(pl);
    }
    var breadcrumbHTML = crumb(crumbItems);

    var backTarget, backLabel;
    if (state.currentPath && state.currentPath.length > 0) {
        var parentPath = state.currentPath.slice(0, -1);
        backTarget = function() { navigateTo('category', { program: program, area: area, param: param, category: category, currentPath: parentPath }); };
        backLabel = '← Back';
    } else {
        backTarget = function() { navigateTo('parameter', { program: program, area: area, param: param }); };
        backLabel = '← Back to Parameter';
    }

    var htmlContent = breadcrumbHTML +
        '<div class="page-header-row">' +
        '<button class="btn-back" data-back-category>' + backLabel + '</button>' +
        '<h2>' + (catInfo ? catInfo.label : category) + '</h2>' +
        '<span class="spacer"></span>' +
        '</div>';

    if (displayNodes.length === 0) {
        htmlContent +=
            '<div class="empty-state"><div class="icon">📁</div><h3>No items in this level</h3><p>This folder is empty.</p></div>';
    } else {
        htmlContent += '<div class="hierarchy-grid">';
        for (var dn = 0; dn < displayNodes.length; dn++) {
            var node = displayNodes[dn];
            var isLeaf = node.children.length === 0;
            var icon = isLeaf ? '📄' : '📂';
            var dataAttr = isLeaf ? 'data-index="' + node.index + '"' : 'data-code="' + node.code + '"';
            htmlContent += '<button class="btn-file" ' + dataAttr + '>' +
                '<span class="file-icon">' + icon + '</span>' +
                '<span class="file-name">' + node.name + '</span>' +
                '<span class="arrow">›</span>' +
                '</button>';
        }
        htmlContent += '</div>';
    }

    wrap.innerHTML = htmlContent;
    bindCrumbs(wrap, crumbItems);
    wrap.querySelector('[data-back-category]').addEventListener('click', backTarget);

    wrap.querySelectorAll('.btn-file').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var index = this.dataset.index;
            if (index !== undefined) {
                navigateTo('document', { program: program, area: area, param: param, category: category, fileIndex: parseInt(index) });
            } else {
                var code2 = this.dataset.code;
                if (code2) {
                    var newPath = state.currentPath.concat([code2]);
                    navigateTo('category', { program: program, area: area, param: param, category: category, currentPath: newPath });
                }
            }
        });
    });
    return wrap;
}

function renderDocument() {
    var program = state.program;
    var area = state.area;
    var param = state.param;
    var category = state.category;
    var fileIndex = state.fileIndex;
    var params = getParamsForProgram(program, area);
    var paramName = params[param] || 'Parameter ' + param;
    var categories = getCategoriesForParam(program, area, param);
    var catInfo = categories.find(function(c) { return c.key === category; });

    var files = getDocumentFiles(program, area, param, category);
    var file = files[fileIndex];

    var wrap = document.createElement('div');
    var crumbItems = [
        { label: 'Home', go: function() { navigateTo('landing', {}); } },
        { label: program, go: function() { navigateTo('program', { program: program }); } },
        { label: 'Area ' + area, go: function() { navigateTo('area', { program: program, area: area }); } },
        { label: 'Parameter ' + param, go: function() { navigateTo('parameter', { program: program, area: area, param: param }); } },
        { label: catInfo ? catInfo.label : category, go: function() { navigateTo('category', { program: program, area: area, param: param, category: category }); } }
    ];

    var filesForCategory = getDocumentFiles(program, area, param, category);
    var tree2 = buildHierarchy(filesForCategory);
    var pathLabels2 = [];
    var temp2 = { children: tree2 };
    for (var lp2 = 0; lp2 < (state.currentPath || []).length; lp2++) {
        var cCode2 = state.currentPath[lp2];
        var found2 = null;
        for (var fc2 = 0; fc2 < temp2.children.length; fc2++) {
            if (temp2.children[fc2].code === cCode2) { found2 = temp2.children[fc2]; break; }
        }
        if (!found2) break;
        pathLabels2.push({ code: found2.code, name: found2.name });
        temp2 = found2;
    }
    for (var pl2 = 0; pl2 < pathLabels2.length; pl2++) {
        (function(idx) {
            var p2 = pathLabels2[idx];
            var pathUpTo2 = (state.currentPath || []).slice(0, idx + 1);
            crumbItems.push({
                label: p2.code,
                go: function() { navigateTo('category', { program: program, area: area, param: param, category: category, currentPath: pathUpTo2 }); }
            });
        })(pl2);
    }

    var breadcrumbHTML = crumb(crumbItems);

    if (!file) {
        wrap.innerHTML = breadcrumbHTML +
            '<div class="page-header-row">' +
            '<button class="btn-back" data-back-files>← Back to files</button>' +
            '<h2>File not found</h2>' +
            '<span class="spacer"></span>' +
            '</div>' +
            '<div class="empty-state"><div class="icon">❌</div><p>The requested document could not be found.</p></div>';
        bindCrumbs(wrap, crumbItems);
        wrap.querySelector('[data-back-files]').addEventListener('click', function() {
            navigateTo('category', { program: program, area: area, param: param, category: category });
        });
        return wrap;
    }

    var previewLink = getDriveLink(file.id);
    var openLink = getDriveOpenLink(file.id);
    var html2 = breadcrumbHTML +
        '<div class="page-header-row">' +
        '<button class="btn-back" data-back-files>← Back to files</button>' +
        '<h2>' + file.name + '</h2>' +
        '<span class="spacer"></span>' +
        '</div>';

    if (previewLink) {
        html2 += '<div class="pdf-container">' +
            '<iframe src="' + previewLink + '" allow="autoplay" title="' + file.name + '"></iframe>' +
            '</div>' +
            '<div class="doc-actions">' +
            '<a class="btn-open" href="' + openLink + '" target="_blank" rel="noopener">Open in new tab</a>' +
            '</div>';
    } else {
        var isSample = file.id && file.id.indexOf('SAMPLE_') === 0;
        var msg = isSample ?
            'This is a sample document placeholder. Please replace the file ID with an actual Google Drive file ID.' :
            'No Google Drive file has been assigned to this document yet.';
        html2 += '<div class="empty-state">' +
            '<div class="icon">📄</div>' +
            '<h3>' + (isSample ? 'Sample Document' : 'Document not yet linked') + '</h3>' +
            '<p>' + msg + '</p>' +
            '<p style="font-size:.8rem;color:var(--ink-soft);margin-top:8px;">File ID: ' + file.id + '</p>' +
            '</div>';
    }

    wrap.innerHTML = html2;
    bindCrumbs(wrap, crumbItems);
    wrap.querySelector('[data-back-files]').addEventListener('click', function() {
        navigateTo('category', { program: program, area: area, param: param, category: category });
    });
    return wrap;
}

// --- Main render ---
function render() {
    var app = document.getElementById('app');
    app.innerHTML = '';
    app.classList.remove('is-visible');

    var node;
    // Determine page based on state
    if (state.fileIndex !== null && state.fileIndex !== undefined) {
        state.page = 'document';
    } else if (state.category) {
        state.page = 'category';
    } else if (state.param) {
        state.page = 'parameter';
    } else if (state.area) {
        state.page = 'area';
    } else {
        state.page = 'program';
    }

    switch (state.page) {
        case 'program':
            node = renderProgram();
            break;
        case 'area':
            node = renderArea();
            break;
        case 'parameter':
            node = renderParameter();
            break;
        case 'category':
            node = renderCategory();
            break;
        case 'document':
            node = renderDocument();
            break;
        default:
            node = renderNotFound();
    }

    app.appendChild(node);
    void app.offsetWidth;
    app.style.animation = 'none';
    void app.offsetHeight;
    app.style.animation = '';
    app.classList.add('is-visible');
    updatePageTitle();
}

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
