import React, { useState } from "react";
import { Title, Block } from "../../../common-ui";

import styles from "./styles.module.scss";

export const HomePage = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Title>Home Page</Title>
      <div className={styles.blocks}>
        <Block>
          <button onClick={() => setCount(count - 1)}>-</button>
        </Block>
        <Block>{count}</Block>
        <Block>
          <button onClick={() => setCount(count + 1)}>+</button>
        </Block>
      </div>
    </div>
  );
};
