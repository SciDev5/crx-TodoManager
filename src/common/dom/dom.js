// @ts-check

const loaded = new Promise(res=>
    document.readyState==="loading" ?
    window.addEventListener("load",e => e.isTrusted ? res() : null) :
    res()
);


const dom = { loaded };
export default dom;