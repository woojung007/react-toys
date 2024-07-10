import { useEffect } from "react";

export default function JavaScriptPage() {
  useEffect(() => {
    console.log(window);
  }, []);

  useEffect(() => {
    document.title = "document와 window에 대해";

    const newElement = document.createElement("p");
    newElement.textContent = "안녕하세요";
    newElement.classList.add("hi");
    document.body.appendChild(newElement);

    const newElement2 = document.createElement("p");
    newElement2.textContent = "나는 이우정이다!!";
    document.body.appendChild(newElement2);

    const stringifiedDoc = document.querySelector(".string_document");

    if (stringifiedDoc) {
      console.log(stringifiedDoc);
      stringifiedDoc.parentNode?.removeChild(stringifiedDoc);
    }
  }, []);

  return (
    <section>
      <h1>{document.title}</h1>
      <h1>{document.URL}</h1>
      <h1>{JSON.stringify(document.body)}</h1>

      <div className="string_document">
        <p>{JSON.stringify(document)}</p>
      </div>
    </section>
  );
}
