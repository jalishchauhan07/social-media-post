import styles from "./register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import proxy from "../proxy";

export default function Register() {
  const toast = useToast();
  const navigator = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  async function clickHandle() {
    const response: any = await fetch(proxy + "/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const response_data = await response.json();

    if (response.status === 200) {
      toast({
        title: "Success",
        description: response_data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigator("/login");
    } else {
      toast({
        title: "Login Error",
        description: response.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }
  function changeHandle(e: any) {
    const key = e.target.id;
    console.log(data);
    setData(Object.assign(data, { [`${key}`]: e.target.value }));
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.field}>
          <input
            className={styles.input}
            onChange={changeHandle}
            type="text"
            id="name"
            placeholder="Enter your Name"
          />
        </div>
        <div className={styles.field}>
          <input
            className={styles.input}
            onChange={changeHandle}
            type="text"
            id="username"
            placeholder="Enter your Username"
          />
        </div>
        <div className={styles.field}>
          <input
            className={styles.input}
            onChange={changeHandle}
            type="text"
            id="email"
            placeholder="Enter your Email Address"
          />
        </div>
        <div className={styles.field}>
          <input
            className={styles.input}
            onChange={changeHandle}
            type="password"
            id="password"
            placeholder="Enter you Password"
          />
        </div>
        <div className={styles.commonElementStyle}>
          <button type="button" className={styles.button} onClick={clickHandle}>
            Registration
          </button>
        </div>
      </div>
    </div>
  );
}
