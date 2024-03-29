import { useState, useContext, createContext } from "react";

const NotiContext = createContext<any>({
  show: false,
  msg: "",
  type: "info",
  showNoti: ({ msg, type }: { msg: string; type?: string }) => {},
  hideNoti: () => {},
});

type NotiType = {
  show: boolean;
  msg: string;
  type: "info" | "error" | "success";
};

const types = ["info", "error", "success"];

export const NotiContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [type, setType] = useState<"info" | "error" | "success">("info");
  const showNoti = ({
    msg,
    type,
  }: {
    msg: string;
    type?: "info" | "error" | "success" | any;
  }) => {
    setShow(true);
    setMsg(msg || "Something went wrong.");
    setType(types.includes(type) ? type : "info");
  };
  const hideNoti = () => {
    setShow(false);
  };

  return (
    <NotiContext.Provider value={{ show, msg, type, showNoti, hideNoti }}>
      {children}
    </NotiContext.Provider>
  );
};

export const useNotiContext = () => useContext(NotiContext);
