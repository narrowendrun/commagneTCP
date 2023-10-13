import FilterButton from "./filterButton";
import ParamButton from "./paramButton";
import IPparamButtons from "./paramIPbuttons";
import { useReducer } from "react";
import { reducer } from "./source";
import PortparamButtons from "./paramPortButtons";
export default function FiltersContainer() {
  const [state, dispatch] = useReducer(reducer, { array: [], string: `` });
  return (
    <>
      <div id="filtersContainer" className="container OPandF">
        <h2>Filters</h2>
        <br />
        <div
          className="row"
          style={{ borderTop: "0.5px solid aliceblue", padding: "2% 0" }}
        >
          <div className="col-md filter">
            <h5>Layer 2</h5>
            <FilterButton title="ARP" protocol="arp" dispatch={dispatch} />
            <FilterButton
              title="LLDP"
              protocol="ether proto 0x8809"
              dispatch={dispatch}
            />
            <FilterButton
              title="LACP"
              protocol="ether proto 0x88cc"
              dispatch={dispatch}
            />
            <FilterButton title="PPPoE" protocol="pppoe" dispatch={dispatch} />

            <ParamButton dispatch={dispatch} />
          </div>
          <div className="col-md filter">
            <h5>Layer 3</h5>
            <FilterButton title="ICMPv4" protocol="icmp" dispatch={dispatch} />
            <FilterButton title="ICMPv6" protocol="icmp6" dispatch={dispatch} />
            <IPparamButtons dispatch={dispatch} />
          </div>
          <div className="col-md filter">
            <h5>Layer 4+</h5>
            <FilterButton
              title="NTP"
              protocol="udp port 123"
              dispatch={dispatch}
            />
            <FilterButton
              title="OSPFv2"
              protocol="'(ip[9]==89)'"
              dispatch={dispatch}
            />

            <FilterButton
              title="OSPFv3"
              protocol="ip6 proto 0x59"
              dispatch={dispatch}
            />
            <FilterButton
              title="BGP"
              protocol="tcp port 179"
              dispatch={dispatch}
            />
            <FilterButton
              title="DHCP"
              protocol="'(udp port 67 or udp port 68)'"
              dispatch={dispatch}
            />
            <PortparamButtons dispatch={dispatch} />
          </div>
        </div>
      </div>
    </>
  );
}
