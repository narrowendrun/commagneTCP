export function VLANlogic(vlan) {
    let arr = vlan.split(" ").join("").split(",");
    let output = "";
    if (arr.length > 1) {
      output = "'(vlan " + arr[0];
      for (let i = 1; i < arr.length; i++) {
        output += " or vlan " + arr[i];
      }
      output += ")'";
    } else if (vlan != "") {
      output = " vlan " + arr[0];
    }
    return output;
  }