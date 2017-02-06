/*
 * pcroom-converter
 *
 * Copyright (c) 2016 T. H.
 *
 * This software is released under the MIT License.
 *
 *
 */

if (Notification.permission === "granted") {
    //
}
else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
        if (permission === "granted") {
            //
        }
    });
}

const TD_START = 3;
const TD_END = 21;

const printer_status = {};

printer_status.obj = [];
printer_status.yapr1 = [];
printer_status.ybpr1 = [];
printer_status.ycpr1 = [];
printer_status.ydpr1 = [];
printer_status.yepr1 = [];
printer_status.yfpr1 = [];
printer_status.yfpr2 = [];
printer_status.orphis = [];

/*
 * [0] = 制御端の状態
 * [1] = プリンタの状態
 * [2] = 紙1の状態
 * [3] = 紙2の状態
 * [4] = 紙3の状態
 * [5] = 紙4の状態
 * [6] = インク黒の状態
 * [7] = インクシアンの状態
 * [8] = インクマゼンダの状態
 * [9] = インクイエローの状態
*/
for (let i = TD_START; i <= TD_END; i = i + 2) {
    printer_status.obj[printer_status.obj.length] = document.getElementsByTagName("tr")[3]. childNodes[i].textContent;
    printer_status.yapr1[printer_status.yapr1.length] = document.getElementsByTagName("tr")[4]. childNodes[i].textContent;
    printer_status.ybpr1[printer_status.ybpr1.length] = document.getElementsByTagName("tr")[5]. childNodes[i].textContent;
    printer_status.ycpr1[printer_status.ycpr1.length] = document.getElementsByTagName("tr")[6]. childNodes[i].textContent;
    printer_status.ydpr1[printer_status.ydpr1.length] = document.getElementsByTagName("tr")[7]. childNodes[i].textContent;
    printer_status.yepr1[printer_status.yepr1.length] = document.getElementsByTagName("tr")[8]. childNodes[i].textContent;
    printer_status.yfpr1[printer_status.yfpr1.length] = document.getElementsByTagName("tr")[9]. childNodes[i].textContent;
    printer_status.yfpr2[printer_status.yfpr2.length] = document.getElementsByTagName("tr")[10]. childNodes[i].textContent;
    printer_status.orphis[printer_status.orphis.length] = document.getElementsByTagName("tr")[18]. childNodes[i].textContent;
}

is_lowpercentage(printer_status);

function is_lowpercentage(status) {
    for (const printer of Object.keys(status)) {

        // DocuPrint
        if (status[printer][3] === " 25%") {
            const size = "A3";
            notifyStatus(printer, size, status[printer][3]);
        }
        if (status[printer][4] === "  0%" && status[printer][5] === " 25%") {
            const size = "A4";
            const status_str = "Tray3: " + status[printer][4] + ", Tray4: " + status[printer][5];
            notifyStatus(printer, size, status_str);
        }

        // Orphis
        console.log(printer);
        if (printer === "orphis") {
            if (status[printer][2] === "  0%") {
                const size = "A3";
                const status_str = "Tray1: " + status[printer][2];
                notifyStatus(printer, size, status_str);
            }
            if (status[printer][3] === "  0%") {
                const size = "A4";
                const status_str = "Tray2: " + status[printer][3];
                notifyStatus(printer, size, status_str);
            }
            if (status[printer][4] === "  0%") {
                const size = "A4";
                const status_str = "Tray3: " + status[printer][4];
                notifyStatus(printer, size, status_str);
            }
        }
    }
}

function notifyStatus(printer, size, status) {
    const theTitle = printer;
    const options = {body: size + ": " + status}
    const notification = new Notification(theTitle, options);
    setTimeout(notification.close.bind(notification), 10000);
}

