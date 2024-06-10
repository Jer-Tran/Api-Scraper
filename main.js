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
    try {
        let keys =  Object.keys(_content)
        for (let i in keys) {
            let x = document.createElement("div")
            x.innerHTML = keys[i]
            d.appendChild(x)
        }
    }
    catch(e) {
        console.log(e)
    }
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