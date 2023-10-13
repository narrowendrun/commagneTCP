function IPtoHEX(ip) {
    if (ip != "" && !ip.includes(" ")) {
      let arr = ip.split(".").map((i) => parseInt(i));
      if (arr.length == 4) {
        for (let i = 0; i < arr.length; i++) {
          let temp = arr[i].toString(16);
          if (temp.length == 1) {
            arr[i] = "0" + temp;
          } else {
            arr[i] = temp;
          }
        }
        return "0x" + arr.join("");
      } else {
        return "invalid ip";
      }
    }
  }
  export function IP_Logic(key, value) {
    let ip = IPtoHEX(value);
    if (ip) {
      if (key == "innerSrcIP") {
        _setCommandText(key, " and udp[42:4] = " + ip);
      } else if (key == "innerDstIP") {
        _setCommandText(key, " and udp[46:4] = " + ip);
      }
    } else {
      _setCommandText(key, "");
    }
  }
  export function MAC_Logic(key, value) {
    let mac = "";
    let mac1 = "";
    let mac2 = "";
    if (value !== "" && !value.includes(" ")) {
      if (value.includes(":")) {
        mac = value.split(":");
        let _mac = mac.join("");
        if (mac.length == 6 && _mac.length == 12) {
          mac1 = "0x" + mac.slice(0, 4).join("");
          mac2 = "0x" + mac.slice(4, 6).join("");
        } else {
          _setCommandText(key, " invalid mac");
          return;
        }
      } else if (value.includes("-")) {
        mac = value.split("-");
        let _mac = mac.join("");
        if (mac.length == 6 && _mac.length == 12) {
          mac1 = "0x" + mac.slice(0, 4).join("");
          mac2 = "0x" + mac.slice(4, 6).join("");
        } else {
          _setCommandText(key, " invalid mac");
          return;
        }
      } else if (value.includes(".")) {
        mac = value.split(".");
        if (mac.length !== 3) {
          _setCommandText(key, " invalid mac");
          return;
        }
        for (let i = 0; i < mac.length; i++) {
          if (mac[i].length < 4) {
            let temp = mac[i];
            mac[i] = "0".repeat(4 - mac[i].length) + temp;
          }
        }
        mac1 = "0x" + mac.slice(0, 2).join("");
        mac2 = "0x" + mac.slice(2, 3).join("");
      }

      if (key == "innerSrcMAC") {
        _setCommandText(
          key,
          " and udp[22:4] = " + mac1 + " and udp[26:2] = " + mac2
        );
      } else if (key == "innerDstMAC") {
        _setCommandText(
          key,
          " and udp[16:4] = " + mac1 + " and udp[20:2] = " + mac2
        );
      }
    } else {
      _setCommandText(key, "");
    }
  }
  export function VNI_LOGIC(key, value) {
    if (value !== "" && !value.includes(" ")) {
      _setCommandText(key, " and udp[11:4] = " + value);
    } else {
      _setCommandText(key, "");
    }
  }