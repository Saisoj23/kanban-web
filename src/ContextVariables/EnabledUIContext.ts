import { createContext } from "react";

export let EnabledUIContext = createContext({
  value: {},
  updateValue: (newValue: boolean) => {
    newValue;
  },
});

export default EnabledUIContext;
