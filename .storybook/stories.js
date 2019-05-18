import React from "react";
import { storiesOf } from "@storybook/react";
import { Block, Title } from "../src/modules/common-ui";

storiesOf("common-ui", module)
  .add("Block", () => <Block>I'm a block</Block>)
  .add("Title", () => <Title>I'm a title</Title>);
