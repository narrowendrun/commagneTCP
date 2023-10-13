import { VLANlogic } from "./VLAN";
import { MACLogic } from "./MAC";
import * as VXLAN from "./VXLAN"

export function applyLogic(textVal,key, value) {
    if (key == "VLAN") return VLANlogic(value)
    if (key == "srcMAC") return MACLogic(value, textVal.dstMAC);
    if (key == "dstMAC") return MACLogic(textVal.srcMAC, value);
    if (key == "innerSrcIP" || key == "innerDstIP") {
      VXLAN.IP_Logic(key, value);
    } else if (key == "innerSrcMAC" || key == "innerDstMAC") {
      VXLAN.MAC_Logic(key, value);
    } else if (key == "VNI") {
      VXLAN.VNI_LOGIC(key, value);
    }
  }