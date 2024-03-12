
import { Direction } from "../models/Direction";
import { Record } from "../models/record";

export function directions(dir: Direction){
    switch(dir){
        case 37:
          return { x: -1, y: 0 };
        case 39:
          return { x: 1, y: 0 };
        case 38:
          return { x: 0, y: -1 };
        case 40:
          return { x: 0, y: 1 };
    }
}

export function generateWindow(){
    document.body.style.backgroundColor = "gray";
let text = document.createElement("center");
text.innerHTML = "SNAKE";
text.classList.add("tekst");
text.style.font = "georgia";
text.style.fontSize = "100px"
text.style.color = "white";
document.body.appendChild(text);
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
//document.body.style.justifyContent = "center";
}

export const getRecords = async () => {
  let records: Record[];
  await fetch("http://localhost:3000/records")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((el: any) => {
        let rec: Record = {id: el.id, nick: el.nick, record: el.record};
        records.push(rec);
      });
      //console.log(data);
    });
  return records;
};