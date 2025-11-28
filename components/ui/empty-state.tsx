import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export const EmptyState = ({ icon: Icon, title, description, action }: Props) => {
  return (
    <div className="text-center py-12 space-y-4">
      <div className="mx-auto w-24 h-24 rounded-full bg-[var(--bg-strong)] flex items-center justify-center">
        <Icon size={32} className="text-[var(--muted)]" />
      </div>
      <div>
        <h3 className="font-display text-xl text-[var(--ink)] mb-2">{title}</h3>
        <p className="text-[var(--muted)] max-w-md mx-auto">{description}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
