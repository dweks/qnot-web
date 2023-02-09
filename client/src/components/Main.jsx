import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Note } from "./Note";
import { PERPAGE } from "../classes/output";
import selectAllImg from "../graphics/select-all.png";
import nextPageBtn from "../graphics/next-page-button.png";
import prevPageBtn from "../graphics/prev-page-button.png";

export function LastEntry(props) {
  return (
    <div id="last">
      <span id="last-title">Last entry:</span>
      <span id="last-entry">{props.entry}</span>
    </div>
  );
}

export function Messages(props) {
  return (
    <motion.div
      key="messages"
      id="messages"
      initial={{ height: 0, opacity: 0, overflow: "hidden" }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      exit={{
        height: 0,
        opacity: 0,
        overflow: "hidden",
        transition: { duration: 0.3 },
      }}
    >
      <p id={props.message.type}>{props.message.msg}</p>
    </motion.div>
  );
}

export function List(props) {
  const [currPage, changeCurrPage] = useState(1);

  function changePage(direction) {
    console.log("changePage:", direction);
    if (direction === 0) {
      props.listing.prevPage();
    } else {
      props.listing.nextPage();
    }
    changeCurrPage(props.listing.currPage);
  }

  return (
    <>
      <ListHeader
        listing={props.listing}
        select={props.select}
        changePage={changePage}
      />
      <ListItems
        listing={props.listing}
        select={props.select}
        selection={props.selection}
        command={props.command}
      />
    </>
  );
}

const ListHeader = (props) => {
  return (
    <div id="list-header">
      <SelectViewButton listing={props.listing} select={props.select} />
      <h1>{props.listing.header}</h1>
      {props.listing.count > 0 && (
        <Pages
          changePage={props.changePage}
          currentPage={props.listing.currPage}
          totalPages={props.listing.pages}
        />
      )}
    </div>
  );
};

const SelectViewButton = (props) => {
  return (
    <div
      id={`${props.listing.count > 0 ? "select-all" : "noselect-all"}`}
      onClick={() => props.select(props.listing.view)}
    >
      <img src={selectAllImg} alt="Select all listed notes" />
    </div>
  );
};

const Pages = (props) => {
  return (
    <div id="pages">
      <PageDisplay
        currentPage={props.currentPage}
        totalPages={props.totalPages}
      />
      <PageButtons changePage={props.changePage} />
    </div>
  );
};

const PageDisplay = (props) => {
  return (
    <div id="page-disp">
      <span>{props.currentPage}</span> / <span>{props.totalPages}</span>
    </div>
  );
};

const PageButtons = (props) => {
  return (
    <div id="page-btns">
      <img
        src={prevPageBtn}
        alt="Prev page"
        onClick={() => props.changePage(0)}
      />
      <img
        src={nextPageBtn}
        alt="Next page"
        onClick={() => props.changePage(1)}
      />
    </div>
  );
};

const ListItems = (props) => {
  return (
    <div id="listing">
      <AnimatePresence>
        {props.listing &&
          props.listing.view.map((note, index) => (
            <Note
              key={note._id}
              num={index + 1 + PERPAGE * (props.listing.currPage - 1)}
              note={note}
              select={props.select}
              selection={props.selection}
              command={props.command}
            />
          ))}
      </AnimatePresence>
    </div>
  );
};
