import { ClipboardList, Ruler, Search } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    icon: <Search size={24} />,
    title: "Materialni toping",
    text: "Katalogdan kerakli material turini, narxini va qaysi hududda ekanini ko'rib chiqing.",
  },
  {
    icon: <Ruler size={24} />,
    title: "Miqdorni kiriting",
    text: "Butun partiyani emas, faqat sizga kerak bo'lgan miqdorni belgilang.",
  },
  {
    icon: <ClipboardList size={24} />,
    title: "So'rov yuboring",
    text: "Xarid uchun so'rov yuboring — sotuvchi siz bilan bog'lanadi.",
  },
];

export function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className="container">
        <SectionHeader
          eyebrow="Jarayon"
          title="Qanday ishlaydi"
          description="Uch oddiy qadam — va kerakli material sizda."
        />
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <div className={styles.stepTop}>
                <span className={styles.icon}>{step.icon}</span>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
