import Image from "next/image";

const screens = [
  ["home-dashboard", "Home dashboard", "OwnKeep dashboard showing recent items, smart collections, reminders, and storage overview."],
  ["collections", "Collections", "OwnKeep collections for personal, finance, health, property, vehicle, and education records."],
  ["health-reminders", "Health reminders", "OwnKeep health reminders with appointments, reports, and medicine schedules."],
  ["expiry-calendar", "Expiry calendar", "OwnKeep expiry calendar tracking important document and policy dates."],
  ["secure-scan", "Secure scan", "OwnKeep secure document scanning with crop, enhancement, OCR, and multi-page controls."],
  ["ai-insights", "AI insights", "OwnKeep private AI insights for document health, duplicates, expiry dates, and reminders."],
  ["encryption-details", "Encryption", "OwnKeep encryption details showing the local vault security model."],
  ["security-audit", "Security audit", "OwnKeep security audit with encryption, recovery, biometric, and backup checks."],
] as const;

export default function OwnKeepScreens({ compact = false }: { compact?: boolean }) {
  const visibleScreens = compact ? screens.slice(0, 5) : screens;

  return <div className={`ownkeep-screen-gallery${compact ? " compact" : ""}`}>
    <div className="ownkeep-screen-track">
      {visibleScreens.map(([file, label, alt], index) => <figure className="ownkeep-screen" key={file}>
        <Image
          src={`/images/ownkeep-ui/${file}.webp`}
          width={585}
          height={1266}
          sizes={compact ? "(max-width: 700px) 58vw, 220px" : "(max-width: 700px) 64vw, 245px"}
          alt={alt}
          priority={compact && index < 2}
        />
        <figcaption>{label}</figcaption>
      </figure>)}
    </div>
  </div>;
}
