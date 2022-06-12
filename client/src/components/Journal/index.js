import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { ADD_JOURNAL } from "../../utils/mutations";
import { QUERY_JOURNALS, QUERY_ME } from "../../utils/queries";

import { TextareaAutosize } from "@mui/material";
import "./styles.css";

const Journal = () => {
  
  const [formState, setFormState] = useState({
    heading: "",
    journalText: "",
    image:""
  });
  const { heading, journalText } = formState;
  // const [addJournal] = useMutation(ADD_JOURNAL);

  const [imageState, setImageState] = useState({ selectedImage: "" });
  const { selectedImage } = imageState;
  const [upload, setUpload] = useState(true);

  // const [initialState, setInitialState] = useState("");
  const handleFileChange = (e) => {
    if (e.target.name === "file") {
     
      setFormState({ ...formState, [e.target.name]: URL.createObjectURL(e.target.files[0]) });
      setImageState({ selectedImage: e.target.files[0] });
    } else {
      
      setFormState({ ...formState, [e.target.name]: e.target.value });
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
  // const [addJournal] = useMutation(ADD_JOURNAL);
  // submit form
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
      const imageData = new FormData();
      imageData.append("file", selectedImage);
      imageData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

      const response = await axios.post(url, imageData);
      const imageUpload = response.data.url;
      await addJournal({
        variables: { ...formState, image: imageUpload },
      });
    } catch (e) {
      console.error(e);
    }
    setFormState({heading:"", journalText:"", image:""})
    setUpload(true);
  };
  return (
    <div className="formWrapper">
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit} sx={{ m: 10 }}
      >
        <h2>What's on your mind?</h2>
        <input
          type="text"
          name="heading"
          value={heading}
          placeholder="Title"
          onChange={handleFileChange}
        ></input>
        <TextareaAutosize
          placeholder="Here's a new journal..."
          type="text"
          name="journalText"
          minRows={7}
          value={journalText}
          onChange={handleFileChange}
        ></TextareaAutosize>
         {upload &&<input
          type="file"
          name="file"
          onChange={handleFileChange}
          multiple
          alt=""
          accept="image/*"
        />}
        <button className="btn col-12 col-md-3" type="submit">
          Add Journal
        </button>
      </form>
    </div>
  );
};

export default Journal;