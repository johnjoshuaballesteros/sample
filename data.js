// =========================================================
// DATA
// =========================================================
var PROGRAMS = {
    BSIT: 'Bachelor of Science in Information Technology',
    BEED: 'Bachelor of Elementary Education',
    BSBA: 'Bachelor of Science in Business Administration'
};

var AREAS_FULL = {
    1: {
        name: 'Vision, Mission, Goals, and Objectives',
        params: {
            A: 'PARAMETER A: STATEMENT OF VISION, MISSION, GOALS AND OBJECTIVES',
            B: 'PARAMETER B: DISSEMINATION AND ACCEPTABILITY'
        }
    },
    2: {
        name: 'Faculty',
        params: {
            A: 'PARAMETER A: ACADEMIC QUALIFICATIONS AND PROFESSIONAL EXPERIENCE',
            B: 'PARAMETER B: RECRUITMENT, SELECTION, AND ORIENTATION',
            C: 'PARAMETER C: FACULTY ADEQUACY AND LEADING',
            D: 'PARAMETER D: RANK AND TENURE',
            E: 'PARAMETER E: FACULTY DEVELOPMENT',
            F: 'PARAMETER F: PROFESSIONAL PERFORMANCE AND SCHOLARLY WORKS',
            G: 'PARAMETER G: SALARIES, FRINGE BENEFITS, AND INCENTIVES',
            H: 'PARAMETER H: PROFESSIONALISM'
        }
    },
    3: {
        name: 'Curriculum and Instruction',
        params: {
            A: 'PARAMETER A: CURRICULUM AND PROGRAM STUDIES',
            B: 'PARAMETER B: INSTRUCTIONAL PROCESS, METHODOLOGIES AND LEARNING OPPORTUNITIES',
            C: 'PARAMETER C: ASSESSMENT OF ACADEMIC PERFORMANCE',
            D: 'PARAMETER D: MANAGEMENT OF LEARNING',
            E: 'PARAMETER E: GRADUATION REQUIREMENTS',
            F: 'PARAMETER F: ADMINISTRATIVE SUPPORT FOR EFFECTIVE INSTRUCTION'
        }
    },
    4: {
        name: 'Student Services',
        params: {
            A: 'PARAMETER A: STUDENT SERVICES PROGRAM (SSP)',
            B: 'PARAMETER B: STUDENT WELFARE',
            C: 'PARAMETER C: STUDENT DEVELOPMENT',
            D: 'PARAMETER D: INSTITUTIONAL STUDENT PROGRAM AND SERVICE',
            E: 'PARAMETER E: RESEARCH, MONITORING AND EVALUATION'
        }
    },
    5: {
        name: 'Research',
        params: {
            A: 'PARAMETER A: PRIORITIES AND RELEVANCE',
            B: 'PARAMETER B: FUNDING AND OTHER RESOURCES',
            C: 'PARAMETER C: IMPLEMENTATION, MONITORING, EVALUATION AND UTILIZATION OF RESEARCH RESULTS/OUTPUTS',
            D: 'PARAMETER D: PUBLICATION AND DISSEMINATION'
        }
    },
    6: {
        name: 'Extension and Community Involvement',
        params: {
            A: 'PARAMETER A: PRIORITIES AND RELEVANCE',
            B: 'PARAMETER B: PLANNING, IMPLEMENTATION, MONITORING, AND EVALUATION',
            C: 'PARAMETER C: FUNDING AND OTHER RESOURCES',
            D: 'PARAMETER D: MANAGEMENT OF LEARNING'
        }
    },
    7: {
        name: 'Library',
        params: {
            A: 'PARAMETER A: ORGANIZATION AND ADMINISTRATION',
            B: 'PARAMETER B: COLLECTION DEVELOPMENT, ORGANIZATION AND PRESERVATION',
            C: 'PARAMETER C: LIBRARY SERVICES AND UTILIZATION',
            D: 'PARAMETER D: PHYSICAL FACILITIES AND EQUIPMENT',
            E: 'PARAMETER E: LIBRARY PERSONNEL',
            F: 'PARAMETER F: FINANCIAL SUPPORT',
            G: 'PARAMETER G: LINKAGES AND NETWORKING',
            H: 'PARAMETER H: EVALUATION AND MONITORING'
        }
    },
    8: {
        name: 'Physical Plant and Facilities',
        params: {
            A: 'PARAMETER A: CAMPUS',
            B: 'PARAMETER B: BUILDINGS',
            C: 'PARAMETER C: CLASSROOMS',
            D: 'PARAMETER D: OFFICE AND STAFF ROOMS',
            E: 'PARAMETER E: ASSEMBLY, ATHLETIC AND SPORTS FACILITIES',
            F: 'PARAMETER F: MEDICAL AND DENTAL CLINIC',
            G: 'PARAMETER G: STUDENT CENTER',
            H: 'PARAMETER H: FOOD SERVICES/CANTEEN/CAFETERIA',
            I: 'PARAMETER I: ACCREDITATION CENTER',
            J: 'PARAMETER J: HOUSING (optional)'
        }
    },
    9: {
        name: 'Laboratories',
        params: {
            A: 'PARAMETER A: LABORATORIES, SHOPS/FACILITIES',
            B: 'PARAMETER B: EQUIPMENT AND MATERIALS',
            C: 'PARAMETER C: MAINTENANCE',
            D: 'PARAMETER D: SPECIAL PROVISIONS'
        }
    },
    10: {
        name: 'Administration',
        params: {
            A: 'PARAMETER A: ORGANIZATIONAL',
            B: 'PARAMETER B: ACADEMIC ADMINISTRATION',
            C: 'PARAMETER C: STUDENT ADMINISTRATION',
            D: 'PARAMETER D: FINANCIAL MANAGEMENT',
            E: 'PARAMETER E: SUPPLY MANAGEMENT',
            F: 'PARAMETER F: RECORDS MANAGEMENT',
            G: 'PARAMETER G: INSTITUTIONAL PLANNING AND DEVELOPMENT',
            H: 'PARAMETER H: PERFORMANCE OF ADMINISTRATIVE PERSONNEL'
        }
    }
};

var PROGRAM_PARAMS_CUSTOM = {
    BEED: {
        1: { A: 'Parameter A (sample)' },
        2: { A: 'Parameter A (sample)' },
        3: { A: 'Parameter A (sample)' },
        4: { A: 'Parameter A (sample)' },
        5: { A: 'Parameter A (sample)' },
        6: { A: 'Parameter A (sample)' },
        7: { A: 'Parameter A (sample)' },
        8: { A: 'Parameter A (sample)' },
        9: { A: 'Parameter A (sample)' },
        10: { A: 'Parameter A (sample)' }
    },
    BSBA: {
        1: { A: 'Parameter A (sample)' },
        2: { A: 'Parameter A (sample)' },
        3: { A: 'Parameter A (sample)' },
        4: { A: 'Parameter A (sample)' },
        5: { A: 'Parameter A (sample)' },
        6: { A: 'Parameter A (sample)' },
        7: { A: 'Parameter A (sample)' },
        8: { A: 'Parameter A (sample)' },
        9: { A: 'Parameter A (sample)' },
        10: { A: 'Parameter A (sample)' }
    }
};

var PARAM_CATEGORIES = {
    'BSIT-1-A': [
        { key: 'SIP', label: 'System — Inputs and Processes', icon: '📋' },
        { key: 'IMP', label: 'Implementation', icon: '⚙️' },
        { key: 'OUT', label: 'Outcome/s', icon: '🏆' },
        { key: 'BEST', label: 'Best Practice/s', icon: '⭐' }
    ],
    'BSIT-1-B': [
        { key: 'SIP', label: 'System — Inputs and Processes', icon: '📋' },
        { key: 'IMP', label: 'Implementation', icon: '⚙️' },
        { key: 'OUT', label: 'Outcome/s', icon: '🏆' }
    ],
    'BSIT-2-A': [
        { key: 'SIP', label: 'System — Inputs and Processes', icon: '📋' },
        { key: 'IMP', label: 'Implementation', icon: '⚙️' },
        { key: 'OUT', label: 'Outcome/s', icon: '🏆' },
        { key: 'BEST', label: 'Best Practice/s', icon: '⭐' }
    ],
    'BEED-1-A': [
        { key: 'SIP', label: 'System — Inputs and Processes', icon: '📋' },
        { key: 'IMP', label: 'Implementation', icon: '⚙️' },
        { key: 'OUT', label: 'Outcome/s', icon: '🏆' },
        { key: 'BEST', label: 'Best Practice/s', icon: '⭐' }
    ],
    'BSBA-1-A': [
        { key: 'SIP', label: 'System — Inputs and Processes', icon: '📋' },
        { key: 'IMP', label: 'Implementation', icon: '⚙️' },
        { key: 'OUT', label: 'Outcome/s', icon: '🏆' }
    ]
};

var DEFAULT_CATEGORIES = [
    { key: 'SIP', label: 'System — Inputs and Processes', icon: '📋' },
    { key: 'IMP', label: 'Implementation', icon: '⚙️' },
    { key: 'OUT', label: 'Outcome/s', icon: '🏆' }
];

var DOCUMENT_FILES = {
    'BSIT-1-A-SIP': [
        { id: '1wYcNkxdAIa7Y-p5aniuDhoPHZcVXcw7-', name: 'S.1. The institution has a system of determining the Vision and Mission.' },
        { id: '1SRF0g3f3zg3kX9ilSMhCPzwAc24Wtc5n', name: 'S.2. The Vision clearly reflects what the institution hopes to become in the future.' }
    ],
    'BSIT-1-A-IMP': [
        { id: '1SRF0g3f3zg3kX9ilSMhCPzwAc24Wtc5n', name: 'I.1. The institution/College conducts a review on the statement of the Vision and Mission.' }
    ],
    'BSIT-1-A-OUT': [
        { id: '1SRF0g3f3zg3kX9ilSMhCPzwAc24Wtc5n', name: 'O.1. The VMGO are crafted and duly approved by the BOR/BOT.' }
    ],
    'BSIT-1-A-BEST': [
        { id: 'SAMPLE_BEST_1', name: 'B.1. Regular stakeholder consultation for VMGO review.' },
        { id: 'SAMPLE_BEST_2', name: 'B.2. Annual orientation on VMGO for all new faculty.' }
    ],
    'BSIT-1-B-SIP': [
        { id: '1SRF0g3f3zg3kX9ilSMhCPzwAc24Wtc5n', name: 'S.1. The VMGO are available on bulletin boards, in catalogs/manuals.' }
    ],
    'BSIT-1-B-IMP': [
        { id: '1SRF0g3f3zg3kX9ilSMhCPzwAc24Wtc5n', name: 'I.1. A system of dissemination and acceptability of the VMGO is enforced.' }
    ],
    'BSIT-1-B-OUT': [
        { id: '1SRF0g3f3zg3kX9ilSMhCPzwAc24Wtc5n', name: 'O.1. There is full awareness and acceptance of the VMGO.' }
    ],
    'BSIT-2-A-SIP': [
        { id: '1SRF0g3f3zg3kX9ilSMhCPzwAc24Wtc5n', name: 'S.1. The required number of faculty possess graduate degrees.' }
    ],
    'BSIT-2-A-IMP': [
        { id: '1SRF0g3f3zg3kX9ilSMhCPzwAc24Wtc5n', name: 'I.1. The faculty demonstrate professional competence.' }
    ],
    'BSIT-2-A-OUT': [
        { id: '1SRF0g3f3zg3kX9ilSMhCPzwAc24Wtc5n', name: 'O.1. The institution has qualified and competent faculty.' }
    ],
    'BSIT-2-A-BEST': [
        { id: 'SAMPLE_BEST_3', name: 'Best Practice 1: Faculty development program with international linkages.' },
        { id: 'SAMPLE_BEST_4', name: 'Best Practice 2: Annual faculty research colloquium.' }
    ],
    'BEED-1-A-SIP': [
        { id: 'SAMPLE_BEED_1A_S1', name: 'S.1. The institution has a clear statement of its Vision, Mission, Goals, and Objectives.' }
    ],
    'BEED-1-A-IMP': [
        { id: 'SAMPLE_BEED_1A_I1', name: 'I.1. The VMGO are regularly reviewed and updated by the College.' }
    ],
    'BEED-1-A-OUT': [
        { id: 'SAMPLE_BEED_1A_O1', name: 'O.1. The VMGO are prominently displayed and accessible to all stakeholders.' }
    ],
    'BEED-1-A-BEST': [
        { id: 'SAMPLE_BEED_BEST_1', name: 'Best Practice 1: Community engagement in VMGO formulation.' },
        { id: 'SAMPLE_BEED_BEST_2', name: 'Best Practice 2: Integration of VMGO in all course syllabi.' }
    ],
    'BSBA-1-A-SIP': [
        { id: 'SAMPLE_BSBA_1A_S1', name: 'S.1. The institution has a clearly articulated Vision, Mission, Goals, and Objectives.' }
    ],
    'BSBA-1-A-IMP': [
        { id: 'SAMPLE_BSBA_1A_I1', name: 'I.1. The VMGO are implemented across all programs and activities.' }
    ],
    'BSBA-1-A-OUT': [
        { id: 'SAMPLE_BSBA_1A_O1', name: 'O.1. The VMGO are consistently reflected in the institutions strategic plans.' }
    ]
};

// =========================================================
// HELPERS
// =========================================================
function getParamsForProgram(program, areaNum) {
    if (program === 'BSIT') {
        var areaData = AREAS_FULL[areaNum];
        return areaData ? areaData.params : {};
    } else {
        var custom = PROGRAM_PARAMS_CUSTOM[program];
        if (!custom) return {};
        return custom[areaNum] || {};
    }
}

function getAreaNameForProgram(program, areaNum) {
    if (program === 'BSIT') {
        var areaData = AREAS_FULL[areaNum];
        return areaData ? areaData.name : 'Area ' + areaNum;
    } else {
        var common = AREAS_FULL[areaNum];
        return common ? common.name : 'Area ' + areaNum;
    }
}

function getCategoriesForParam(program, area, param) {
    var key = program + '-' + area + '-' + param;
    var cats = PARAM_CATEGORIES[key];
    if (cats && Array.isArray(cats) && cats.length > 0) {
        return cats;
    }
    return DEFAULT_CATEGORIES;
}

function getDocumentFiles(program, area, param, catKey) {
    var key = program + '-' + area + '-' + param + '-' + catKey;
    if (DOCUMENT_FILES[key]) {
        return DOCUMENT_FILES[key];
    }
    return [];
}

function getDriveLink(fileId) {
    if (!fileId || fileId === 'FILE_ID_HERE' || fileId === 'FILE_ID_HERE_2' || fileId === 'FILE_ID_HERE_3' ||
        fileId.indexOf('SAMPLE_') === 0) return null;
    return 'https://drive.google.com/file/d/' + fileId + '/preview';
}

function getDriveOpenLink(fileId) {
    if (!fileId || fileId === 'FILE_ID_HERE' || fileId === 'FILE_ID_HERE_2' || fileId === 'FILE_ID_HERE_3' ||
        fileId.indexOf('SAMPLE_') === 0) return null;
    return 'https://drive.google.com/file/d/' + fileId + '/view?usp=sharing';
}

function parseHierarchyCode(name) {
    var cleaned = name.replace(/\.\s+/g, '.').replace(/\s+\./g, '.');
    var match = cleaned.match(/^([A-Z]\.\d+(?:\.\d+)*)/);
    return match ? match[1] : null;
}

function buildHierarchy(files) {
    var root = { children: [] };
    var nodeMap = {};
    files.forEach(function(file) {
        var code = parseHierarchyCode(file.name);
        if (!code) return;
        if (!nodeMap[code]) {
            nodeMap[code] = { code: code, name: file.name, id: null, index: null, children: [] };
        }
    });
    files.forEach(function(file, index) {
        var code = parseHierarchyCode(file.name);
        if (!code) {
            root.children.push({ code: null, name: file.name, id: file.id, index: index, children: [] });
            return;
        }
        var node = nodeMap[code];
        if (node) { node.id = file.id;
            node.index = index;
            node.name = file.name; }
    });
    var allCodes = Object.keys(nodeMap);
    allCodes.forEach(function(code) {
        var parts = code.split('.');
        if (parts.length === 1) {
            root.children.push(nodeMap[code]);
        } else {
            var parentCode = parts.slice(0, -1).join('.');
            if (nodeMap[parentCode]) nodeMap[parentCode].children.push(nodeMap[code]);
            else root.children.push(nodeMap[code]);
        }
    });

    function sortChildren(node) {
        if (node.children) {
            node.children.sort(function(a, b) {
                var aParts = a.code.split('.');
                var bParts = b.code.split('.');
                for (var i = 0; i < Math.min(aParts.length, bParts.length); i++) {
                    if (aParts[i] !== bParts[i]) {
                        var aNum = parseInt(aParts[i]);
                        var bNum = parseInt(bParts[i]);
                        if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
                        return aParts[i].localeCompare(bParts[i]);
                    }
                }
                return aParts.length - bParts.length;
            });
            node.children.forEach(sortChildren);
        }
    }
    sortChildren(root);
    return root.children;
}
