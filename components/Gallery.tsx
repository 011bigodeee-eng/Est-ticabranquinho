'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

const gallery = [
  ['pintura', 'Pintura automotiva', 'Reflexo de luz vermelha na pintura preta'],
  ['roda', 'Detalhamento de rodas', 'Roda esportiva preta com pinça de freio vermelha'],
  ['higienizacao', 'Higienização de interiores', 'Extratora limpando um banco automotivo'],
  ['polimento', 'Polimento', 'Politriz sobre a pintura de um veículo preto'],
  ['vitrificacao', 'Proteção cerâmica', 'Aplicação de proteção sobre um capô preto'],
  ['moto', 'Motocicletas', 'Motocicleta esportiva preta em estúdio'],
] as const;

export function Gallery() {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [file, title, alt] = gallery[selected];

  useEffect(() => {
    const element = dialog.current;
    return () => { element?.close(); };
  }, []);

  function move(step: number) {
    setSelected((current) => (current + step + gallery.length) % gallery.length);
  }

  function navigate(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    move(event.key === 'ArrowLeft' ? -1 : 1);
  }

  return (
    <section id="resultados" className="section wrap">
      <div className="section-head" data-reveal>
        <div><p className="eyebrow">Galeria visual</p><h2>Detalhes que <em>inspiram.</em></h2></div>
        <p>Imagens ilustrativas dos serviços.</p>
      </div>
      <div className="gallery">
        {gallery.map(([image, caption, description], index) => (
          <button type="button" className="gallery-photo photo" key={image} data-reveal data-image
            aria-label={`Ampliar: ${caption}`} aria-haspopup="dialog" onClick={(event) => {
              trigger.current = event.currentTarget;
              setSelected(index);
              setOpen(true);
              dialog.current?.showModal();
            }}>
            <Image fill src={`/images/${image}.webp`} alt={description}
              sizes="(max-width: 700px) 90vw, 56vw" />
            <span className="gallery-label">{caption}<Maximize2 size={16} aria-hidden="true" /></span>
          </button>
        ))}
      </div>
      <dialog className="lightbox" ref={dialog} aria-label="Galeria de imagens ilustrativas"
        onKeyDown={navigate} onClose={() => { setOpen(false); trigger.current?.focus(); }}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="lightbox-inner">
          <div className="lightbox-header">
            <p aria-live="polite">{title} <span>{selected + 1} / {gallery.length}</span></p>
            <button type="button" aria-label="Fechar galeria" onClick={() => dialog.current?.close()}><X aria-hidden="true" /></button>
          </div>
          <div className="lightbox-photo photo">
            {open && <Image fill src={`/images/${file}.webp`} alt={alt} sizes="(max-width: 700px) 95vw, 900px" />}
          </div>
          <div className="lightbox-nav">
            <button type="button" aria-label="Imagem anterior" onClick={() => move(-1)}><ArrowLeft aria-hidden="true" /></button>
            <button type="button" aria-label="Próxima imagem" onClick={() => move(1)}><ArrowRight aria-hidden="true" /></button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
