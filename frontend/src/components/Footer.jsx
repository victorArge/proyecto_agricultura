const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__brand">AgroForma</p>
        <p className="site-footer__text">
          Plataforma de capacitaciones presenciales para el sector agrícola. Los pagos y las comisiones se
          simulan con fines académicos.
        </p>
        <p className="site-footer__legal">© {currentYear} AgroForma</p>
      </div>
    </footer>
  );
}
