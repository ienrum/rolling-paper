import React, { useEffect, useState } from "react";
import { db } from "../myBase";

import { deleteDoc, updateDoc, doc, collection } from "firebase/firestore";

import styles from "./Message.module.css";

interface Props {
  messageObj: any;
  isOwner: boolean;
}

const Message = ({ messageObj, isOwner }: Props) => {
  const [isEditClicked, setIsEditClicked] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>(messageObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this message?");
    if (ok) {
      await deleteDoc(doc(db, "messages", messageObj.id));
    }
    setIsEditClicked(false);
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
    setIsEditClicked(false);
  };

  const onEditClick = () => {
    setIsEditClicked(true);
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateDoc(doc(db, "messages", messageObj.id), {
      text: newMessage,
    });
    setEditing(false);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNewMessage(value);
  };
  return (
    <div className={styles.container}>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              className={styles.editButton}
              type="text"
              placeholder="Edit your message"
              value={newMessage}
              required
              onChange={onChange}
            ></input>
            <input
              className={styles.editButton}
              type="submit"
              value="Update Message"
              style={{ fontWeight: "bold", fontSize: "0.6rem" }}
            />
          </form>
          <button className={styles.editButton} onClick={toggleEditing}>
            Cancel
          </button>
        </>
      ) : (
        <div className={styles.messageContainer}>
          <h4 className={styles.text}>{messageObj.text}</h4>
          {isOwner && (
            <>
              {!isEditClicked ? (
                <button className={styles.editButton} onClick={onEditClick}>
                  수정
                </button>
              ) : (
                <div className={styles.ButtonContainer}>
                  <button className={styles.editButton} onClick={onDeleteClick}>
                    Delete
                  </button>
                  <button className={styles.editButton} onClick={toggleEditing}>
                    Edit
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
