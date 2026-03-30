const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="font-mono text-sm text-muted-foreground">
        © {new Date().getFullYear()} <span className="text-primary">zasi.dev</span>
      </p>
      <p className="font-mono text-xs text-muted-foreground">
        Built with passion & code
      </p>
    </div>
  </footer>
);

export default Footer;
