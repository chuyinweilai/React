function RemSet(doc,win) {
    const html = doc.documentElement;

    const SetFontSize = () => {
        const w_width = html.offsetWidth;
        let def_font_size = "100px";
        if(w_width <= 750){
            def_font_size = w_width / 7.5+ 'px';
        }
        html.style.fontSize = def_font_size;
    }
    let timer = ()=>{};
    var setDelay = function() {
        clearTimeout(timer);
        timer = setTimeout(SetFontSize, 150);
    }
    window.addEventListener('pageshow', function(evt) {
        return evt.persisted && setDelay();
    });
    window.addEventListener('resize', setDelay);
    SetFontSize();
}

export default RemSet;