function _MACLogic(value) {
    let temp = [];
    if (value.includes(".")) {
      let mac = value.split(".");
      if (mac.length !== 3) {
        return "invalid mac";
      }
      for (let i = 0; i < mac.length; i++) {
        if (mac[i].length < 4) {
          let temp = mac[i];
          mac[i] = "0".repeat(4 - mac[i].length) + temp;
        }
      }
      mac = mac.join("");
      for (let i = 0; i < mac.length; i += 2) {
        let pair = mac.slice(i, i + 2);

        temp.push(pair);
      }
      return temp.join(":");
    } else if (value.includes("-")) {
      let mac = value.split("-");
      let _mac = mac.join("");
      if (mac.length == 6 && _mac.length == 12) {
        return mac.join(":");
      } else {
        return "invalid mac";
      }
    } else if (value.includes(":")) {
      let mac = value.split(":");
      let _mac = mac.join("");
      if (mac.length == 6 && _mac.length == 12) {
        return value;
      } else {
        return "invalid mac";
      }
    } else if (value !== "") {
      return "invalid mac";
    } else {
      return "";
    }
  }
  
  export function MACLogic(source, dest) {
    //set src and dst to proper colon format  
    let src = _MACLogic(source);
    let dst = _MACLogic(dest);
    //initialise output array [src,dst]
    let output=["",""]

    if (src !== "" && dst !== "") {
        output[0]= `'(ether src ${src}`
        output[1]=`ether dst ${dst})'`
    } else if (src == "" && dst != "") {
        output[1]=`ether dst ${dst}`;
    } else if (dst == "" && src != "") {
        output[0]= `ether src ${src}`
    }
    return output
  }