import { X } from 'lucide-react';
import { useId, useRef } from 'react';
import { Link } from 'react-router-dom';
import './foundations.css';

export type VoyageGoInfoLink = {
  to: string;
  label: string;
};

export type VoyageGoInfoProps = {
  signature: string;
  buttonLabel: string;
  panelTitle: string;
  closeLabel: string;
  links: readonly VoyageGoInfoLink[];
};

export function VoyageGoInfo({
  signature,
  buttonLabel,
  panelTitle,
  closeLabel,
  links,
}: VoyageGoInfoProps): React.JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };

  const close = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  };

  return (
    <footer className="vg-info-signature">
      <p>{signature}</p>
      <button type="button" onClick={open} aria-haspopup="dialog">{buttonLabel}</button>
      <dialog ref={dialogRef} className="vg-info-panel" aria-labelledby={titleId}>
        <div className="vg-info-panel-inner">
          <header>
            <h2 id={titleId}>{panelTitle}</h2>
            <button type="button" onClick={close} aria-label={closeLabel} title={closeLabel}>
              <X aria-hidden="true" />
            </button>
          </header>
          <nav className="vg-info-links" aria-label={panelTitle}>
            {links.map((link) => <Link key={link.to} to={link.to} onClick={close}>{link.label}</Link>)}
          </nav>
        </div>
      </dialog>
    </footer>
  );
}
