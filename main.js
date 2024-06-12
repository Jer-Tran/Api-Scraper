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
    d = searchKeys(d, _content)
    d.classList = []
    _structure = _content
    // delete _structure["60"]
    // console.log(_structure)
    // console.log(_content)
}
// Infinite loop somewhere
function searchKeys(elem, obj) {
    // Check if obj is list or array
    if (Array.isArray(obj)) {
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
            let p = document.createElement("span")
            p.innerHTML = keys[i]
            // x = searchKeys(x, 1)
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

function setContent(res) {
    _content = res
    console.log(res)
    checkKeys()
    displayContent()
}
    
function displayContent() {
    document.getElementById("content").innerText = JSON.stringify(_content, undefined, parseInt(_tabSize))

    //
}

function getContent() {
    let x = document.getElementById("input").value
    console.log(x)
    fetch(x).then(res => {return res.json()}).then(res => setContent(res)).catch(e => doError(e))
}
// https://jer-tran.github.io/Mitigation-Planar/instances/test.json

document.getElementById("button").onclick = getContent
document.getElementById("tabSize").onchange = updateTabSize

document.getElementById("a")
document.getElementById("b")