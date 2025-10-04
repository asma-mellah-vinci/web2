import {v4 as uuidv4} from "uuid";
import { Text, NewText, Level} from "../types";
import path from "node:path";
import { parse, serialize } from "../utils/json";

const jsonDbPath = path.join(__dirname, "/../data/texts.json");

const defaultTexts : Text[] = [
  { id: uuidv4(), content: "Hello world", level: Level.EASY },
  { id: uuidv4(), content: "Programming is fun", level: Level.MEDIUM },
  { id: uuidv4(), content: "Express and TypeScript are powerful", level: Level.HARD },
];

function readAllTexts(level? : Level) : Text[] {
     const texts = parse(jsonDbPath, defaultTexts);

    if(!level){
        return texts;
    }

    const result : Text[] = [];
    for(const t of texts){
        if(t.level === level){
            result.push(t);
        }
    }
    return result;
}

function readOneText(id : string) : Text | undefined {
    const texts = parse(jsonDbPath , defaultTexts);

    for(const t of texts){
        if(t.id === id){
            return t;
        }
    }

    return undefined;
}

function createOneText(text : NewText) : Text {
    const texts = parse(jsonDbPath , defaultTexts);
 
    const createdText : Text = {
        id      : uuidv4(),
        content : text.content,
        level   : text.level
    };

    texts.push(createdText);
    serialize(jsonDbPath, texts);
    return createdText;
}

function deleteOneText(id : string) : Text | undefined {
    const texts = parse(jsonDbPath , defaultTexts);

    let index = -1;
    for (let i = 0; i < texts.length ; i++) {
    if(texts[i].id === id){
        index = i;
        break;
    }
   }

    if(index === -1){
        return undefined;
    }

    const deletedText = texts.splice(index,1)[0];
    serialize(jsonDbPath , texts);
    return deletedText;     
}

function replaceOneText(id : string , text : NewText) : Text | undefined {
    const texts = parse(jsonDbPath , defaultTexts);

    let index = -1;
    for (let i = 0; i < texts.length; i++) {
        if(texts[i].id === id){
            index = i;
            break;
        }
    }

    const textt : Text = {
        id : id,
        content : text.content,
        level : text.level
    };

    if(index !== -1){
        texts[index] = textt;
        serialize(jsonDbPath , texts);
        return textt;
    }else{
        texts.push(textt);
        serialize(jsonDbPath, texts);
        return textt;
    }
}

export { readAllTexts};
export { readOneText };
export {createOneText};
export {deleteOneText};
export {replaceOneText};
