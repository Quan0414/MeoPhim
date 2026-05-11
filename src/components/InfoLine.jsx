export function InfoLine({ label, value }) {
  if (!value) return null;
  return (
    <div className="info-line">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
