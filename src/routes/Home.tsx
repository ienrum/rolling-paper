import React, { useState, useEffect } from "react";
import { db } from "../myBase";
import { collection, setDoc, doc, onSnapshot } from "firebase/firestore";
import Message from "../components/Message";
import { DocumentData, query, orderBy } from "firebase/firestore";

import styles from "./Home.module.css";

import { User } from "firebase/auth";

interface Props {
  userObj: User | undefined;
}

const Home = ({ userObj }: Props) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<DocumentData[]>([]);

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc")); // Change 'desc' to 'asc' for ascending order

    onSnapshot(q, (snapshot) => {
      const messageArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(messageArray);
    });
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const messagesRef = collection(db, "messages");

    await setDoc(doc(messagesRef), {
      createdAt: Date.now(),

      ownerId: userObj?.uid,
      text: message,
    });

    setMessage("");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setMessage(value);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={message}
          type="text"
          placeholder="메세지를 작성해주세요"
          maxLength={120}
        />
        <input type="submit" value="보내기" />
      </form>
      <div>
        {messages.map((messageEl) => (
          <Message
            key={messageEl.id}
            messageObj={messageEl}
            isOwner={messageEl.ownerId === userObj?.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
