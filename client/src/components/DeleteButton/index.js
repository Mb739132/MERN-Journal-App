import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Modal } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { DELETE_JOURNAL } from "../../utils/mutations";
import { QUERY_JOURNAL } from "../../utils/queries";
import { Tooltip } from "@mui/material";

// eslint-disable-next-line react/prop-types
function DeleteButton({ journalId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePostOrComment] = useMutation(DELETE_JOURNAL, {
    update(proxy, result) {
      setConfirmOpen(false);

      if (!journalId) {
        // removing the post from the client-side cache
        const data = proxy.readQuery({
          query: QUERY_JOURNAL,
        });
        // render all the posts minus the one we just deleted
        const posts = [result.data, ...data.addJournal];
        proxy.writeQuery({
          query: QUERY_JOURNAL,
          data: { addJournal: posts },
        });
      }

      // if it is passed, call the callback (i.e. defined in SinglePost to redirect the user to the homepage)
      if (callback) callback();
    },
    variables: {
      journalId,
    },
    onError(err) {
      return err;
    },
  });
  return (
    <>
      <Tooltip content={journalId ? "Delete this comment" : "Delete this post"}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <DeleteIcon name="trash" style={{ margin: 0 }} />
        </Button>
      </Tooltip>
      <Modal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}
export default DeleteButton;
