import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="state-box">
      <Loader2 className="spin" size={28} />
      Dang tai du lieu
    </div>
  );
}

export function ErrorState({ message }) {
  return <div className="state-box error">{message}</div>;
}
