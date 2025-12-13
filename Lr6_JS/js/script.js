const tab = document.getElementsByClassName('tab');
const tabContent = document.getElementsByClassName('tabContent');

function hideTabsContent(a) {
    for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('whiteborder');
    }
}

function showTabsContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}

document.getElementById('tabs').onclick = function (event) {
    let target = event.target;
    if (target.className == 'tab') {
        for (let i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                showTabsContent(i);
                break;
            }
        }
    }
}

function generate() {
    let rtl = document.getElementById('rtl').value;
    let rtr = document.getElementById('rtr').value;
    let rbr = document.getElementById('rbr').value;
    let rbl = document.getElementById('rbl').value;

    document.getElementById('ttl').value = rtl;
    document.getElementById('ttr').value = rtr;
    document.getElementById('tbr').value = rbr;
    document.getElementById('tbl').value = rbl;

    let mt = document.getElementById('mt').value;
    let mr = document.getElementById('mr').value;
    let mb = document.getElementById('mb').value;
    let ml = document.getElementById('ml').value;

    document.getElementById('tmt').value = mt;
    document.getElementById('tmr').value = mr;
    document.getElementById('tmb').value = mb;
    document.getElementById('tml').value = ml;

    let mh = document.getElementById('mh').value;
    document.getElementById('tmh').value = mh;

    let block = document.getElementById('block');
    let borderRadiusValue = `${rtl}px ${rtr}px ${rbr}px ${rbl}px`;
    let marginValue = `${mt}px ${mr}px ${mb}px ${ml}px`;
    let maxHeightValue = `${mh}px`;

    block.style.borderRadius = borderRadiusValue;
    block.style.margin = marginValue;
    block.style.maxHeight = maxHeightValue;

    let codeOutput = document.getElementById('cssCode');
    codeOutput.value = `border-radius: ${borderRadiusValue};\nmargin: ${marginValue};\nmax-height: ${maxHeightValue};`;
}

const inputs = document.querySelectorAll('input[type="range"]');
inputs.forEach(input => {
    input.oninput = generate;
});

hideTabsContent(1);