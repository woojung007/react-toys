import styles from "./HtmlPage.module.scss";

export default function HtmlPage() {
  return (
    <div className={styles.wrapper}>
      <h4>{document.URL}</h4>

      <section>
        <h3>unordered list</h3>

        <ul className={styles.unordered_list}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </section>

      <section>
        <h3>ordered list</h3>

        <ol>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
      </section>
    </div>
  );
}
