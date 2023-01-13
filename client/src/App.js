import React from "react";
import { Interface } from "./leftcol";
import { Tags } from "./rightcol";
import "./styles/App.css";

function Main() {
  return (
    <main id="main">
      <LeftCol />
      <RightCol />
    </main>
  );
}

function LeftCol() {
  return (
    <div id="lcol">
      <Interface />
    </div>
  );
}

function RightCol() {
  return (
    <div id="rcol">
      <Tags />
    </div>
  );
}

function Title() {
  return <h1>qnot web</h1>
}

export default Main;
