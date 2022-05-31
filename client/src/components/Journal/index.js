import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_JOURNAL } from "../../utils/mutations";
import { QUERY_JOURNALS, QUERY_ME } from "../../utils/queries";

const Journal = () => {
  const [heading, setHeading] = useState("");
  const [journalText, setJournalText] = useState("");
  const [image, setImage] = useState(null);

  // const [initialState, setInitialState] = useState("");
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const [addJournal] = useMutation(ADD_JOURNAL, {
    update(cache, { data: { addJournal } }) {
      // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, journals: [...me.journals, addJournal] } },
        });
      } catch (e) {
        console.warn("First journal insertion by user!");
      }

      // update journal array's cache
      const { journals } = cache.readQuery({ query: QUERY_JOURNALS });
      cache.writeQuery({
        query: QUERY_JOURNALS,
        data: { journals: [addJournal, ...journals] },
      });
    },
  });
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addJournal({ variables: { heading, journalText, image } });

      // clear form value
      setHeading("");
      setJournalText("");
      setImage("");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          name="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        ></input>
        <textarea
          placeholder="Here's a new journal..."
          value={journalText}
          className="form-input col-12 col-md-9"
          onChange={(e) => setJournalText(e.target.value)}
        ></textarea>
        <input type="file" onChange={onImageChange} multiple />
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Journal;
