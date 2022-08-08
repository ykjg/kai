import { useCallback, useMemo, useState } from "react";

const eliminateSpace = (str: string) => str.replace(/\s*$/, "");

export const App = () => {
  const [input, setInput] = useState("");
  const onChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => {
      setInput(event.target.value);
    },
    []
  );
  const output = useMemo(() => {
    return input.split("\n").reduce((prev, curr) => {
      if (prev.length === 0) {
        return eliminateSpace(curr);
      }
      if (prev.match(/\-\s*$/)) {
        return `${prev.replace(/\-\s*$/, "")}${curr}`;
      }
      return `${prev} ${eliminateSpace(curr)}`;
    }, "");
  }, [input]);
  const onClick = useCallback<React.MouseEventHandler<HTMLTextAreaElement>>(
    (event) => {
      event.currentTarget.select();
    },
    []
  );
  return (
    <div className="w-full">
      <div className="w-full p-4">
        <textarea
          onChange={onChange}
          value={input}
          className="w-full border border-solid border-gray-500 rounded p-2"
          placeholder="input here"
          rows={10}
        ></textarea>
      </div>
      <div className="w-full p-4">
        <textarea
          className="w-full border border-solid border-gray-500 rounded p-2"
          placeholder="output here"
          rows={10}
          value={output}
          onClick={onClick}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};
