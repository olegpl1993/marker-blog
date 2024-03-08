import styles from "./SidebarCard.module.css";

interface Props {
  title: string;
  children: JSX.Element;
}

function SidebarCard(props: Props) {
  const { title, children } = props;
  return (
    <div className={styles.sidebarCard}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default SidebarCard;
