import { useCallback, useMemo, useRef, useState } from "react";

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
  const ref = useRef<HTMLTextAreaElement>(null);
  const copy = useCallback(() => {
    ref.current?.select();
    document.execCommand("copy");
  }, []);
  const deeplLink = useMemo(() => {
    return `https://www.deepl.com/translator#en/ja/${encodeURIComponent(
      output
    )}`;
  }, [output]);
  const googleLink = useMemo(() => {
    return `https://translate.google.co.jp/?sl=en&tl=ja&text=${encodeURIComponent(
      output
    )}`;
  }, [output]);
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
      <div className="flex p-4">
        <a
          href={deeplLink}
          target="_blank"
          rel="noreferer nofollow"
          className="block w-4/12 border border-solid border-blue-900 rounded py-4 text-center mx-4"
        >
          deepl
        </a>
        <a
          href={googleLink}
          target="_blank"
          rel="noreferer nofollow"
          className="block w-4/12 border border-solid border-yellow-300 rounded py-4 text-center mx-4"
        >
          google
        </a>
        <button
          className="block w-4/12 border border-solid border-red-400 rounded py-4"
          onClick={copy}
        >
          copy
        </button>
      </div>
      <div className="w-full p-4">
        <textarea
          className="w-full border border-solid border-gray-500 rounded p-2"
          placeholder="output here"
          rows={10}
          value={output}
          onClick={onClick}
          readOnly
          ref={ref}
        ></textarea>
      </div>
    </div>
  );
};
