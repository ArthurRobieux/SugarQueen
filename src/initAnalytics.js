import ReactGA from "react-ga";

export const initReactGA = () => {
  const isLocal = window.location.hostname === "localhost";
  ReactGA.initialize(isLocal ? "DUMMY" : "UA-138239809-1");
  ReactGA.pageview(window.location.pathname + window.location.search);
};
