'use client';

import Image from 'next/image';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = { links: readonly (readonly [string, string])[]; contact?: string };

export function Header({ links, contact }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > 24);
      const section = [...links].reverse().find(([id]) =>
        (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) < window.innerHeight * 0.45);
      setActive(section?.[0] ?? '');
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [links]);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <header className={`header ${scrolled || open ? 'header-solid' : ''}`}>
      <div className="header-inner">
        <a href="#inicio" aria-label="Branquinho Studio, início" onClick={() => setOpen(false)}>
          <Image className="brand-logo" src="/images/logo.webp" width={124} height={64} alt="Branquinho Studio" priority />
        </a>
        <button ref={toggle} className="menu-toggle" type="button" aria-controls="navegacao"
          aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        <nav id="navegacao" aria-label="Navegação principal" className={open ? 'nav-open' : ''}>
          {links.map(([id, label]) => <a key={id} href={`#${id}`}
            aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="button button-outline mobile-book" href={contact ?? '#contato'}
            target={contact ? '_blank' : undefined} rel={contact ? 'noopener noreferrer' : undefined}
            onClick={() => setOpen(false)}>{contact ? 'Agendar atendimento' : 'Ver contato'} <ArrowUpRight size={15} /></a>
        </nav>
        <a className="button button-outline desktop-book" href={contact ?? '#contato'}
          target={contact ? '_blank' : undefined} rel={contact ? 'noopener noreferrer' : undefined}>
          {contact ? 'Agendar atendimento' : 'Ver contato'} <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
