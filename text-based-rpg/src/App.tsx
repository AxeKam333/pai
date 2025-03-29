import { useState } from "react";
import "./App.css";
import json from "./assets/story.json";
// import StoryNode from './types/Game'

type Action = {
  next: string,
  state: Record<string,string>
}

type StoryNode = {
  type: string;
  text: string;
  next?: Record<string, string>;
  actions?: Record<string, Action>;
  items?: Record<string, string>;
  if_state?: Record<string, string>;
  next_if_true?: string;
  next_if_false?: string;
};

interface GameStory {
  name: string;
  start: string;
  state: Record<string, string>;
  objects: Record<string, StoryNode>;
}

interface GameState {
  currentNode: string;
  storyState: Record<string, string>;
  history: string[];
}

function App() {
  const story: GameStory = json[0].story;
  const nodes = story.objects;

  const initialState: GameState = {
    currentNode: story.start,
    storyState: story.state,
    history: [story.start],
  };

  const [state, setState] = useState<GameState>(initialState);
  const [input, setInput] = useState("");

  const node = story.objects[state.currentNode];

  function changeNode(nodeName: string) {
    console.log(state);
    
    // TODO implement going back
    // if(nodeName=="back"){
    //   setState((previousState) => {
    //     let backNode = previousState.history[previousState.history.length-2];
    //     alert( backNode);
    //     // previousState.history.pop()
    //     return {
    //       ...previousState,
    //       currentNode: backNode,
    //       history: [...previousState.history],
    //     };
    //   })
    // }
    // else
    {
      setState((previousState) => {
        return {
          ...previousState,
          currentNode: nodeName,
          history: [...previousState.history, nodeName],
        };
      });
    }
    // setState({...state, currentNode:nodeName, history=>[...history,nodeName]})
  }

  function resolveConditionalNode() {
    if (!node.if_state) {
      alert("Error");
      return
    }

    const conditionMet = Object.entries(node.if_state).every(
      ([key, value]) => state.storyState[key] === value
    );
    changeNode(conditionMet ? node.next_if_true! : node.next_if_false!);
  }

  function actionTriggered (a:Action) {
    setState((previousState) => {
      let nextState = previousState.storyState
      Object.entries(a.state).forEach(([key, value]) => {
        nextState[key] = value
      });

      return {
        ...previousState,
        currentNode: a.next,
        storyState: nextState,
      };
    });
    changeNode(a.next);
  }

  function handleInput(e: any) {
    e.preventDefault();

    // handle room
    const nextNodes = node.next;
    if (nextNodes != undefined) {
      if (input == "next" || input == "") {
        if (nextNodes[""] != undefined) changeNode(nextNodes[""]);
        else alert("Niemożliwy ruch!");
      } else if (nextNodes[input]) {
        changeNode(nextNodes[input]);
      }
    } else if (node.type == "if") resolveConditionalNode();

    // handle avaliable items list
    if (node.items !== undefined) {
      if (node.items[input]) {
        changeNode(node.items[input]);
      }
    } 

    // handle item actions
    if (node.actions){
      if (node.actions[input]){
        actionTriggered(node.actions[input]);
      }
    }

    // else if (input == "back") changeNode("back");

    setInput("");
  }

  return (
    <>
      <h1>{story.name}</h1>
      <div className="card">
        <h3>{state.currentNode}</h3>
        <p>{node.text}</p>
        {/* TODO:wyswietlanie dostepnych miejsc */}
        {/* TODO:wyswietlanie dostepnych przedmiotów */}
        <form onSubmit={handleInput}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
      <p className="authors">Created by Aleksander Kamiński</p>
    </>
  );
}

export default App;
