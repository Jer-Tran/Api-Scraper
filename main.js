var _content
var _structure
var _tabSize = 4

function updateTabSize() {
    _tabSize = document.getElementById("tabSize").value
    displayContent()
}

function doError(e) {
    console.log(e)
}

function checkKeys() {
    let d = document.getElementById("info")
    d.innerHTML = ""
    d = searchKeys(d, _content)
    d.classList = []
    _structure = searchStructs(_content)
    // delete _structure["60"]
    // console.log(_structure)
    // console.log(_content)
}

function searchKeys(elem, obj) {
    // Check if obj is list or array
    if (Array.isArray(obj)) {
        // Only checks the keys of the first element as reference
        for (let i in obj) {
            // Maybe a getKeys() function on obj[i], and if they are the same as previous, continue
            searchKeys(elem, obj[i])
            break // Currently has problem where it adds the keys for each element, so finding way to remove those excess
        }
        return elem
    }
    // Ensures object is of type object (dict)
    else if (obj.constructor != Object) {
        return elem
    }
    console.log(obj)
    try {
        let keys =  Object.keys(obj)
        for (let i in keys) {
            let x = document.createElement("div")
            let c = document.createElement("input")
            c.setAttribute("type", "checkbox")
            c.setAttribute("checked", "")
            c.onclick = reDisplay
            let p = document.createElement("span")
            p.innerHTML = keys[i]
            x.appendChild(c)
            x.appendChild(p)

            console.log(obj[keys[i]])
            x = searchKeys(x, obj[keys[i]])
            elem.appendChild(x)
        }
    }
    catch(e) {
        console.log(e)
    }
    // elem.appendChild(x)
    elem.className += "key"
    return elem
}

function generateStructs(elem) {
    var x = {}
    let ch = elem.children
    var val
    var key
    for (let i = 2; i < ch.length; i++) {
        val = ch[i].children[0].checked
        if (val) {
            key = ch[i].children[1].innerText
            x[key] = generateStructs(ch[i])
        }
    }
    return x
}

function searchStructs() {
    var x = {}
    let elem = document.getElementById("info")
    let ch = elem.children
    for (let i = 0; i < ch.length; i++) {
        let el = ch[i]
        let children = el.children
        var val = children[0].checked
        var key = children[1].innerText
        if (val) {
            x[key] = generateStructs(el)
        }
    }
    _structure = x
}

function setContent(res) {
    _content = res
    checkKeys()
    // Skips filter phase
    document.getElementById("content").innerText = JSON.stringify(_content, undefined, parseInt(_tabSize))
}

function filterContent(content, filter) {
    // If content is a list
    console.log(content)
    if (Array.isArray(content)) {
        console.log("d")
        var _res = []
        for (let i in content) {
            _res.push(filterContent(content[i], filter))
        }
        return _res
    }
    else if (content.constructor != Object) {
        console.log("c")
        return content
    }
    else if (content == null) {
        console.log("b")
        return null
    }
    else {
        console.log("a")
        var _res = {}
        let keys = Object.keys(filter)
        let x = Object.keys(content)
        for (let i in x) {
            if (keys.includes(x[i])) {
                _res[x[i]] = filterContent(content[x[i]], filter[x[i]])
            }
        }
        return _res
    }
}
    
function displayContent() {
    var _res = filterContent(_content, _structure)
    document.getElementById("content").innerText = JSON.stringify(_res, undefined, parseInt(_tabSize))
}

function getContent() {
    let x = document.getElementById("input").value
    console.log(x)
    fetch(x).then(res => {return res.json()}).then(res => setContent(res)).catch(e => doError(e))
}

function reDisplay() {
    searchStructs()
    displayContent()
}

// https://jer-tran.github.io/Mitigation-Planar/instances/test.json
// http://127.0.0.1:5500/test.json

document.getElementById("button").onclick = getContent
document.getElementById("tabSize").onchange = updateTabSize

document.getElementById("a").onclick = searchStructs
document.getElementById("b").onclick = displayContent
