export var stringforCopy = ''
function switcheroo(x, arr) {
    let temp = document.getElementById(x);
    if (temp.textContent == "or") {
      temp.textContent = "and";
      arr[temp.getAttribute("data-arrindex")].val = "and";
    } else {
      temp.textContent = "or";
      arr[temp.getAttribute("data-arrindex")].val = "or";
    }
    dummy(arr);
    document.getElementById('wireCMD').textContent=stringforCopy
    return arr;
  }
  
  function dummy(array) {
    stringforCopy = "";
    for (let i = 0; i < array.length; i++) {
      stringforCopy += " " + array[i].val + " " + array[i].flag;
    }
  }
  
  function _stringit(x) {
    let butt =
      "<button class='andorSwitcher' id='andorbutton" +
      x.index +
      "'" +
      " style='border:0.8px solid black; border-radius:10px; padding:0.5%;' data-arrindex=" +
      x.index +
      ">" +
      x.val +
      "</button>";
  
    let butt2 = `<button class='andorSwitcher' id='andorbutton${x.index}" data-arrindex="${x.index}">${x.val}</button>`;
  
    let output = `
    ${x.type == "PARAMETRE" && x.val != "" ? `${butt}` : `<span>${x.val}</span>`}
    <span class="bashFilter">${x.flag}</span>
    `;
  
    return output;
  }
  function stringit(array) {
    document.getElementById("filterFlags").innerHTML = `
      ${array.map(_stringit).join("")}`;
  
    let buttArray = document.getElementsByClassName("andorSwitcher");
    for (let i = 0; i < buttArray.length; i++) {
      buttArray[i].addEventListener("click", function () {
        array = switcheroo(buttArray[i].id, array);
      });
    }
    dummy(array)
    document.getElementById('wireCMD').textContent=stringforCopy
  }
  
  function ANDOR(state, action, ANDorOR, type) {
    var temp = [];
    if (state.array.length) {
      temp = [
        ...state.array,
        {
          type: type,
          val: ANDorOR,
          flag: action.payload,
          index: state.array.length,
        },
      ];
    } else {
      temp = [
        ...state.array,
        { type: type, val: "", flag: action.payload, index: state.array.length },
      ];
    }
  
    return { array: temp, string: stringit(temp) };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case "FILTER":
        return ANDOR(state, action, "or", "FILTER");

      case "PARAMETRE":
        // console.log(ANDOR(state, action, "and", "PARAMETRE"))
        return ANDOR(state, action, "and", "PARAMETRE");
       
  
      case "DELETE":
        for (let i = 0; i < state.array.length; i++) {
          if (state.array[i].flag == action.payload) {
            state.array.splice(i, 1);
            break;
          }
        }
        if (state.array.length) {
          state.array[0].val = "";
        }
        return {
          array: [...state.array],
          string: stringit(state.array),
        };

        case "EDIT":
          let exists =0
        for (let i = 0; i < state.array.length; i++) {
          if (state.array[i].flag == action.payload[0]) {
            
            exists = 1
            break
            // state.array.splice(i, 1);
            // break;
          }
          if(exists){
            console.log(state.array[i])
          } else{
            console.log('adding')
            return ANDOR(state, action, "and", "PARAMETRE");
          }
        }
        // if (state.array.length) {
        //   state.array[0].val = "";
        // }
        // return {
        //   array: [...state.array],
        //   string: stringit(state.array),
        // };
  
      default:
        return state;
    }
  }