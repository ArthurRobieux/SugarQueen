import React, { useState } from "react";
import {
  Title,
  TextInput,
  TextareaInput,
  Button,
  Loader
} from "../../../common-ui";

import styles from "./styles.module.scss";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formIsValid = () => {
    let isValid = true;
    let f = { name: "", email: "", message: "" };

    if (!form.name) {
      f.name = "Renseignez votre nom";
      isValid = false;
    }
    if (!form.email) {
      f.email = "Renseignez votre email";
      isValid = false;
    }
    if (!form.message) {
      f.message = "Renseignez un message";
      isValid = false;
    }

    setFormErrors(f);
    return isValid;
  };

  const onSubmit = () => {
    if (formIsValid()) {
      setLoading(true);
      setSuccess("");
      setError("");
      fetch(
        "http://sugarqueenmail-env.i2sumqq3pr.us-east-1.elasticbeanstalk.com/send/",
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        .then(response => response.json())
        .then(response => {
          setLoading(false);
          if (response.status === "success") {
            setSuccess("Message envoyé.");
            setForm({ name: "", email: "", message: "" });
          } else if (response.status === "fail") {
            setError("Message non envoyé, une erreur est survenue.");
          }
        })
        .catch(() => {
          setLoading(false);
          setError("Message non envoyé, une erreur est survenue.");
        });
    }
  };

  return (
    <div>
      <Title>Coordonnés</Title>
      <div className={styles.block}>
        <div>
          <b>Email</b> :{" "}
          <a href="mailto:sugarqueen.pro@gmail.com">sugarqueen.pro@gmail.com</a>
        </div>
        <br />
        <div>
          <b>Instagram</b> : @sugarqueen.pro​
        </div>
        <br />
        <div>
          <b>Facebook</b> : sugarqueen.pro
        </div>
      </div>
      <Title>Contact</Title>
      <div className={styles.block}>
        Si vous avez des questions ou une commande à passer, vous pouvez me
        contacter via ce formulaire :{" "}
      </div>

      <TextInput
        value={form.name}
        onChange={evt => setForm({ ...form, name: evt.target.value })}
        description="Nom"
        required
        error={formErrors.name}
      />

      <TextInput
        value={form.email}
        onChange={evt => setForm({ ...form, email: evt.target.value })}
        description="Email"
        required
        error={formErrors.email}
      />

      <TextareaInput
        value={form.message}
        onChange={evt => setForm({ ...form, message: evt.target.value })}
        description="Message"
        required
        error={formErrors.message}
      />

      {loading ? (
        <Loader />
      ) : (
        <Button onClick={() => onSubmit()} description="Envoyer" />
      )}

      {success && <div className={styles.success}>{success}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
