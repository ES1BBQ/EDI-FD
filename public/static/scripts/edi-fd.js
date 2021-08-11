'use strict';
(function () {

    /** Method to generate tabs **/
    const tabify = function (e) {
        const header = e.querySelector('.tabs-header');
        const content = e.querySelector('.tabs');
        const tab_headers = [...header.children];
        const tab_contents = [...content.children];
        tab_contents.forEach(x => x.style.display = 'none');
        let current_tab_index = -1;

        function setTab(index) {
            if (current_tab_index > -1) {
                tab_headers[current_tab_index].classList.remove('active');
                tab_contents[current_tab_index].style.display = 'none';
            }
            tab_headers[index].classList.add('active');
            tab_contents[index].style.display = '';
            current_tab_index = index;
        }

        var default_tab_index = tab_headers.findIndex(x => {
            return [...x.classList].indexOf('default-tab') > -1;
        });

        default_tab_index = default_tab_index === -1 ? 0 : default_tab_index;
        setTab(default_tab_index);
        tab_headers.forEach((x, i) => x.onclick = event => setTab(i));
    };

    const zeroPad = (num, places) => String(num).padStart(places, '0');

    /** Turn locator to nato fonetic */
    const ch2nato = function (ch) {
        switch (ch.toLowerCase()) {
            case "a":
                return "ALPHA";
            case "b":
                return "BRAVO";
            case "c":
                return "CHARLIE";
            case "d":
                return "DELTA";
            case "e":
                return "ECHO";
            case "f":
                return "FOXTROT";
            case "g":
                return "GOLF";
            case "h":
                return "HOTEL";
            case "i":
                return "INDIA";
            case "j":
                return "JULIET";
            case "k":
                return "KILO";
            case "l":
                return "LIMA";
            case "m":
                return "MIKE";
            case "n":
                return "NOVEMBER";
            case "o":
                return "OSCAR";
            case "p":
                return "PAPA";
            case "q":
                return "QUEBEC";
            case "r":
                return "ROMEO";
            case "s":
                return "SIERRA";
            case "t":
                return "TANGO";
            case "u":
                return "UNIFORM";
            case "v":
                return "VICTOR";
            case "w":
                return "WHISKEY";
            case "x":
                return "RAY";
            case "y":
                return "YANKEE";
            case "z":
                return "ZULU";
        }
        return ch;
    }

    /** Turn locator to finnish fonetic */
    const ch2faff = function (ch) {
        switch (ch.toLowerCase()) {
            case "a":
                return "AARNE";
            case "b":
                return "BERTTA";
            case "c":
                return "CELSIUS";
            case "d":
                return "DAAVID";
            case "e":
                return "EEMELI";
            case "f":
                return "FAARAO";
            case "g":
                return "GIDEON";
            case "h":
                return "HEIKKI";
            case "i":
                return "IIVARI";
            case "j":
                return "JUSSI";
            case "k":
                return "KALLE";
            case "l":
                return "LAURI";
            case "m":
                return "MATTI";
            case "n":
                return "NIILO";
            case "o":
                return "OTTO";
            case "p":
                return "PAAVO";
            case "q":
                return "QUINTUS";
            case "r":
                return "RISTO";
            case "s":
                return "SAKARI";
            case "t":
                return "TAUNO";
            case "u":
                return "URHO";
            case "v":
                return "VILLE";
            case "w":
                return "TUPLAVILLE";
            case "x":
                return "ÄKSÄ";
            case "y":
                return "YRJO";
            case "z":
                return "TSETA";
        }
        return ch;
    }

    /** Method to generate/update EDI log and page */
    const updatePage = function () {

        /** Update my locator value */
        let loc = '';
        for (var i = 0; i < localStorage['PWWLo'].length; i++) {
            loc = loc.concat((i === 0) ? '' : ' ', (localStorage['finnish_fonetics'] == 1) ? ch2faff(localStorage['PWWLo'].toLowerCase().charAt(i)) : ch2nato(localStorage['PWWLo'].toLowerCase().charAt(i)) )
        }
        document.getElementById('my_locator').innerHTML = localStorage['PWWLo'].toUpperCase();
        document.getElementById('my_locator_fonetic').innerHTML = loc;

        /** Update my callsign value */
        loc = '';
        for (var i = 0; i < localStorage['PCall'].length; i++) {
            loc = loc.concat((i === 0) ? '' : ' ', (localStorage['finnish_fonetics'] == 1) ? ch2faff(localStorage['PCall'].toLowerCase().charAt(i)) : ch2nato(localStorage['PCall'].toLowerCase().charAt(i)) )
        }
        document.getElementById('my_callsign').innerHTML = localStorage['PCall'].toUpperCase();
        document.getElementById('my_callsign_fonetic').innerHTML = loc;

        const listQSORecords = function (i) {
            finalEDI = finalEDI.concat("\n" + localStorage['TDate'].substr(2).replace(/-/g, '') + ";" + i[1] + ";" + i[2] + ";" + i[5] + ";" + i[6] + ";" + i [0] + ";" + i[7] + ";" + i[4] + ";;" + i[3] + ";0;;N;N;");
        };
        var finalEDI = "[REG1TEST;1]\n";
        finalEDI = finalEDI.concat("TName=ESFD ", (localStorage['PBand']) ? localStorage['PBand'] : document.getElementById('PBand').value, "\n");
        finalEDI = finalEDI.concat("TDate=", (localStorage['TDate']) ? localStorage['TDate'].replace(/-/g, '') : '', ";", (localStorage['TDate']) ? localStorage['TDate'].replace(/-/g, '') : '', "\n");
        finalEDI = finalEDI.concat("PCall=", (localStorage['PCall']) ? localStorage['PCall'].toUpperCase() : '', "\n");
        finalEDI = finalEDI.concat("PWWLo=", (localStorage['PWWLo']) ? localStorage['PWWLo'].toUpperCase() : '', "\n");
        finalEDI = finalEDI.concat("PSect=", (localStorage['PSect']) ? localStorage['PSect'] : document.getElementById('PSect').value, "\n");
        finalEDI = finalEDI.concat("PBand=", (localStorage['PBand']) ? localStorage['PBand'] : document.getElementById('PBand').value, "\n");
        finalEDI = finalEDI.concat("RName=", (localStorage['RName']) ? localStorage['RName'] : '', "\n");
        finalEDI = finalEDI.concat("RCall=", (localStorage['PCall']) ? localStorage['PCall'].toUpperCase() : '', "\n");
        finalEDI = finalEDI.concat("RCoun=", (localStorage['RCoun']) ? localStorage['RCoun'] : document.getElementById('RCoun').value, "\n");
        finalEDI = finalEDI.concat("ROpe1=", (localStorage['PCall']) ? localStorage['PCall'].toUpperCase() : '', "\n");
        finalEDI = finalEDI.concat("STXEq=", (localStorage['STXEq']) ? localStorage['STXEq'] : '', "\n");
        finalEDI = finalEDI.concat("SPowe=", (localStorage['SPowe']) ? localStorage['SPowe'] : '', "\n");
        finalEDI = finalEDI.concat("SRXEq=", (localStorage['SRXEq']) ? localStorage['SRXEq'] : '', "\n");
        finalEDI = finalEDI.concat("SAnte=", (localStorage['SAnte']) ? localStorage['SAnte'] : '', "\n");
        finalEDI = finalEDI.concat("SAntH=", (localStorage['SAntH']) ? localStorage['SAntH'] : '', "\n");
        finalEDI = finalEDI.concat("[Remarks]\n", (localStorage['remarks'] && localStorage['remarks'].length > 1) ? localStorage['remarks'] + "\n" : "");
        const QSORecords = JSON.parse(localStorage['QSORecords'] || "[]");
        finalEDI = finalEDI + "[QSORecords;" + QSORecords.length + "]";
        QSORecords.forEach(x => listQSORecords(x));
        document.getElementById('finalEDI').value = finalEDI;
    };

    /** Logs */

    /** Method to clear logs */
    const clearLog = function () {
      var r = confirm("Do you really want to clear the log?");
      if (r == true) {
          localStorage['QSORecords'] = JSON.stringify([]);
          updateLog();
          updatePage();
      }
    }
    document.getElementById('log_reset').addEventListener('click', clearLog);

    /** Method to update logs */
    const updateLog = function () {
        document.getElementById('log').innerHTML = '';
        const genQSORecords = function (j) {
            let row = document.createElement('div');
            row.className = "logRow"
            for (var i = 0; i < j.length; i++) {
                let cell = document.createElement('div');
                cell.innerHTML = j[i];
                row.appendChild(cell);
            }
            let cell = document.createElement('div');
            row.appendChild(cell);
            document.getElementById('log').appendChild(row);
        };
        const QSORecords = JSON.parse(localStorage['QSORecords'] || "[]");
        QSORecords.forEach(x => genQSORecords(x));
    }

    /** Method to mark missing input */
    const markInputs = function() {
        document.querySelectorAll('.missing').forEach(x => x.classList.remove('missing'));
        if (document.getElementById('log_callsign').value.length == 0) document.getElementById('log_callsign').classList.add('missing');
        if (document.getElementById('log_mode').value.length == 0) document.getElementById('log_mode').classList.add('missing');
        if (document.getElementById('log_tx_rst').value.length == 0) document.getElementById('log_tx_rst').classList.add('missing');
        if (document.getElementById('log_loc').value.length == 0) document.getElementById('log_loc').classList.add('missing');
        if (document.getElementById('log_rx_rst').value.length == 0) document.getElementById('log_rx_rst').classList.add('missing');
        if (document.getElementById('log_rx_qso').value.length == 0) document.getElementById('log_rx_qso').classList.add('missing');
        if (document.getElementById('log_tx_qso').value.length == 0) document.getElementById('log_tx_qso').classList.add('missing');
    }

    /** Method to add logs */
    const addLog = function () {
        const QSORecords = JSON.parse(localStorage['QSORecords'] || "[]");
        markInputs();

        if (document.getElementById('log_time').value.length <= 0) {
            let ct = new Date();
            document.getElementById('log_time').value = ct.toISOString().match(/\d\d:\d\d/).toString().replace(/:/g, '').replace(/\./g, '');
        }

        if (document.getElementById('log_tx_qso').value.length <= 0) {
            document.getElementById('log_tx_qso').value = zeroPad((QSORecords.length+1),3);
        }

        if (
            document.getElementById('log_callsign').value.length > 0 &&
            document.getElementById('log_mode').value.length > 0 &&
            document.getElementById('log_tx_rst').value.length > 0 &&
            document.getElementById('log_loc').value.length > 0 &&
            document.getElementById('log_rx_rst').value.length > 0
        ) {
            QSORecords.push([
                zeroPad(document.getElementById('log_tx_qso').value,3),
                document.getElementById('log_time').value.replace(/:/g, ''),
                document.getElementById('log_callsign').value.toUpperCase(),
                document.getElementById('log_loc').value.toUpperCase(),
                zeroPad(document.getElementById('log_rx_qso').value,3),
                document.getElementById('log_mode').value,
                document.getElementById('log_tx_rst').value,
                document.getElementById('log_rx_rst').value
            ]);
            localStorage['QSORecords'] = JSON.stringify(QSORecords);

            /* Reset form values */
            document.getElementById('log_time').value = '';
            document.getElementById('log_callsign').value = '';
            document.getElementById('log_loc').value = '';
            document.getElementById('log_rx_qso').value = '';
            document.getElementById('log_tx_qso').value = '';
            document.getElementById('log_callsign').focus();
        }

        updateLog();
        updatePage();
    }
    document.getElementById('log_write').addEventListener('click', addLog)

    /** Log input enter magic */
    document.getElementById('log_time').addEventListener("keydown", function (event) {
        if ((event.keyCode === 13)||(event.keyCode === 9)) {
            event.preventDefault();
            if (this.value.length > 0) {
                this.classList.remove('missing');
            } else {
                let ct = new Date();
                document.getElementById('log_time').value = ct.toISOString().match(/\d\d:\d\d/).toString().replace(/:/g, '').replace(/\./g, '');
            }
            document.getElementById("log_callsign").focus();
        }
    });
    document.getElementById('log_callsign').addEventListener("keydown", function (event) {
        if (this.value.length > 0) this.classList.remove('missing');
        if (event.keyCode === 13) {
            event.preventDefault();
            if (this.value.length > 0) document.getElementById("log_loc").focus();
        }
    });
    document.getElementById('log_loc').addEventListener("keydown", function (event) {
        if (this.value.length > 0) this.classList.remove('missing');
        if (event.keyCode === 13) {
            event.preventDefault();
            if (this.value.length > 0) document.getElementById("log_mode").focus();
        }
    });
    document.getElementById('log_mode').addEventListener("keydown", function (event) {
        if (this.value.length > 0) this.classList.remove('missing');
        if (event.keyCode === 13) {
            event.preventDefault();
            if (this.value.length > 0) document.getElementById("log_tx_rst").focus();
        }
    });
    document.getElementById('log_tx_rst').addEventListener("keydown", function (event) {
        if ((event.keyCode === 13)||(event.keyCode === 9)) {
            event.preventDefault();
            if (this.value.length == 0) {
              this.value = '59';
              this.classList.remove('missing');
            }
            document.getElementById("log_rx_rst").focus();
        }
    });
    document.getElementById('log_rx_rst').addEventListener("keydown", function (event) {
        if ((event.keyCode === 13)||(event.keyCode === 9)) {
            event.preventDefault();
            if (this.value.length == 0) this.value = '59';
            addLog();
        }
    });

    /** Method to store and restore input field values for EDI header */
    const inputSaveAndRestore = function (e) {
        if (localStorage[e.id]) e.value = localStorage[e.id];
        e.addEventListener('input', function () {
            localStorage[e.id] = e.value;
            updatePage();
        });
    };

    /** Method to store and restore select field values for EDI header */
    const selectSaveAndRestore = function (e) {
        e.addEventListener('change', function () {
            localStorage[e.id] = e.value;
            updatePage();
        });
        if (localStorage[e.id]) {
            let opts = e.options;
            for (var opt, j = 0; opt = opts[j]; j++) {
                if (opt.value == localStorage[e.id]) {
                    e.selectedIndex = j;
                    break;
                }
            }
        }
    };

    /** Method to store and restore checkbox values for EDI header */
    const checkboxSaveAndRestore = function (e) {
        if (localStorage[e.id] && (localStorage[e.id] == 1)) e.checked = true;
        e.addEventListener('change', function () {
            if(e.checked){
                localStorage[e.id] = 1;
            } else {
                localStorage[e.id] = 0;
            }
            updatePage();
        });
    };

    /** Locate me */
    const locateMe = function(pos) {
        let a = "abcdefghijklmnopqrstuvwxyz"
        /* Positions */
        let lng = pos.coords.longitude;
        let lat = pos.coords.latitude;

        let lng_a = lng + 180;
        let lat_a = lat + 90;

        let qth_1 = a[Math.trunc(lng_a/20)].toUpperCase();
        let qth_2 = a[Math.trunc(lat_a/10)].toUpperCase();
        let qth_3 = Math.trunc(lng_a/2 % 10);
        let qth_4 = Math.trunc((lat_a) % 10);

        let lng_b = (lng_a - 2*Math.trunc(lng_a/2)) * 12;
        let lat_b = (lat_a - Math.trunc(lat_a)) * 24;

        let qth_5 = a[Math.trunc(lng_b)];
        let qth_6 = a[Math.trunc(lat_b)];

        let qth = ''.concat(qth_1,qth_2,qth_3,qth_4,qth_5,qth_6);
        document.getElementById('PWWLo').value = qth;
        localStorage['PWWLo'] = qth;
        updatePage();
    };

    document.getElementById('locate_me').addEventListener('click', function(){
        if (navigator.geolocation) {
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };
            navigator.geolocation.getCurrentPosition(locateMe, null, options);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    /* Experimental feature: Allow downloading of log */
    const downloadEDI = function() {
        let date = (localStorage['TDate'] && localStorage['TDate'].length > 0) ? ''.concat('_',localStorage['TDate'].replace(/-/g, '')) : '';
        let call = (localStorage['PCall'] && localStorage['PCall'].length > 0) ? ''.concat('_',localStorage['PCall'].toLowerCase()) : '';
        let filename = ''.concat('log',call,date,'.edi')
        this.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( document.getElementById('finalEDI').value ));
        this.setAttribute('download', filename);
    };
    document.getElementById('downloadEDI').addEventListener("click", downloadEDI);

    /** Run all the scrips */
    document.querySelectorAll('.tabs-container').forEach(x => tabify(x));
    document.querySelectorAll('#edi_header input:not([type="checkbox"])').forEach(x => inputSaveAndRestore(x));
    document.querySelectorAll('#edi_header select').forEach(x => selectSaveAndRestore(x));
    document.querySelectorAll('input[type="checkbox"]').forEach(x => checkboxSaveAndRestore(x));
    updateLog();
    updatePage();
})();
