"use client";

import { useState } from "react";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Menu, X, Code2, PanelsTopLeft,
  ShoppingBag, Workflow, Wrench, Sparkles, Instagram, MoveUpRight, Check,
  Layers3, MousePointer2, Zap, Compass, Smartphone, Monitor, CircleDot
} from "lucide-react";

const services = [
  { number: "01", icon: PanelsTopLeft, title: "Sites institucionais", text: "Uma presença digital profissional que apresenta seu negócio com clareza e credibilidade." },
  { number: "02", icon: Sparkles, title: "Landing pages", text: "Páginas estratégicas pensadas para transformar atenção em contatos e oportunidades." },
  { number: "03", icon: ShoppingBag, title: "Lojas virtuais", text: "Experiências de compra organizadas para apresentar produtos e facilitar a jornada." },
  { number: "04", icon: Workflow, title: "Sistemas personalizados", text: "Ferramentas sob medida para simplificar tarefas e dar mais estrutura à operação." },
  { number: "05", icon: Wrench, title: "Manutenção e suporte", text: "Acompanhamento técnico, melhorias e evolução para manter tudo funcionando." },
];

const steps = [
  { number: "01", title: "Briefing", text: "Entendemos seu negócio, seus objetivos e o que precisa mudar." },
  { number: "02", title: "Planejamento", text: "Organizamos a estrutura, o conteúdo e a direção visual." },
  { number: "03", title: "Desenvolvimento", text: "Transformamos o plano em uma experiência digital funcional." },
  { number: "04", title: "Entrega e evolução", text: "Revisamos, publicamos e orientamos os próximos passos." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="Além da Web — início">
          <span className="brand-mark"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M5 39 24 5l19 34H31L24 25 16 39Z" fill="currentColor"/><path d="M15 31h20" stroke="#1685ff" strokeWidth="3"/></svg></span>
          <span className="brand-copy"><strong>Além da Web</strong><small>SITES E SISTEMAS</small></span>
        </a>
        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Navegação principal">
          <a href="#inicio" onClick={closeMenu}>Início</a><a href="#servicos" onClick={closeMenu}>Serviços</a><a href="#projetos" onClick={closeMenu}>Projetos</a><a href="#processo" onClick={closeMenu}>Processo</a><a href="#contato" onClick={closeMenu}>Contato</a>
          <a className="nav-mobile-cta" href="#contato" onClick={closeMenu}>Vamos conversar <ArrowUpRight size={15}/></a>
        </nav>
        <a className="header-cta" href="#contato">Vamos conversar <ArrowUpRight size={15}/></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
      </header>

      <section className="hero section-shell" id="inicio">
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-glow hero-glow-one" aria-hidden="true"></div><div className="hero-glow hero-glow-two" aria-hidden="true"></div>
        <div className="hero-orbit orbit-one" aria-hidden="true"></div><div className="hero-orbit orbit-two" aria-hidden="true"></div>
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot"></span> DESENVOLVIMENTO DIGITAL SOB MEDIDA</div>
          <h1>Seu negócio<br/>em <span className="blue-text">outro nível.</span></h1>
          <p className="hero-description">Sites e sistemas sob medida, com design moderno, performance e estratégias que ajudam seu negócio a crescer.</p>
          <div className="hero-actions"><a className="button button-primary" href="#contato">Solicitar orçamento <ArrowRight size={17}/></a><a className="button button-quiet" href="#servicos">Conhecer serviços <ArrowDownRight size={17}/></a></div>
          <div className="hero-proof"><span><Check size={14}/> Design pensado para seu negócio</span><i></i><span><Check size={14}/> Experiência responsiva</span><i></i><span><Check size={14}/> Tecnologia com propósito</span></div>
        </div>
        <div className="hero-art" aria-label="Composição abstrata tridimensional representando tecnologia e conexão digital">
          <div className="art-ring art-ring-a"></div><div className="art-ring art-ring-b"></div>
          <div className="art-orb"><div className="orb-core"></div><div className="orb-cut"></div><div className="orb-highlight"></div></div>
          <div className="art-crosshair crosshair-a"></div><div className="art-crosshair crosshair-b"></div>
          <div className="art-label label-top"><span className="live-dot"></span> DIGITAL, COM INTENÇÃO</div>
          <div className="art-label label-bottom"><span>ADW</span><small>IDEIAS → CÓDIGO → RESULTADO</small></div>
          <div className="floating-symbol symbol-a"><Code2 size={18}/></div><div className="floating-symbol symbol-b"><Layers3 size={17}/></div><div className="floating-symbol symbol-c"><Zap size={17}/></div>
          <div className="art-line art-line-a"></div><div className="art-line art-line-b"></div>
        </div>
        <a className="scroll-cue" href="#servicos"><span>EXPLORE</span><span className="scroll-line"></span><ArrowDownRight size={15}/></a>
        <div className="hero-bottom-note"><span>ESTRATÉGIA</span><span className="note-separator">/</span><span>DESIGN</span><span className="note-separator">/</span><span>DESENVOLVIMENTO</span></div>
      </section>

      <section className="services section-shell section-pad" id="servicos">
        <div className="section-heading">
          <div><div className="section-kicker">O QUE FAZEMOS <span>01 / 04</span></div><h2>O digital certo<br/>para <span className="blue-text">ir além.</span></h2></div>
          <p>Não é só estar na internet. É criar uma experiência que comunica o valor do seu negócio e ajuda as pessoas a dar o próximo passo.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => { const Icon = service.icon; return <article className="service-card" key={service.number}><div className="service-top"><span className="service-number">{service.number}</span><span className="service-icon"><Icon size={20}/></span></div><h3>{service.title}</h3><p>{service.text}</p><a href="#contato" aria-label={"Conversar sobre " + service.title} className="service-link"><ArrowUpRight size={17}/></a><div className="card-edge"></div></article>; })}
        </div>
        <div className="services-foot"><span>FEITO PARA PESSOAS. PENSADO PARA NEGÓCIOS.</span><span className="services-foot-line"></span><span>ALÉM DA WEB <ArrowUpRight size={13}/></span></div>
      </section>

      <section className="projects section-shell section-pad" id="projetos">
        <div className="section-heading projects-heading">
          <div><div className="section-kicker">PROJETOS E DEMONSTRAÇÕES <span>02 / 04</span></div><h2>Ideias que ganham<br/><span className="blue-text">forma real.</span></h2></div>
          <p>Veja uma demonstração de projeto e conheça como estratégia, conteúdo e design se unem em uma experiência digital.</p>
        </div>
        <article className="project-feature">
          <div className="project-visual">
            <div className="project-visual-top"><span><span className="live-dot"></span> PROJETO EM DESTAQUE</span><span>WEB EXPERIENCE / 001</span></div>
            <div className="device-stage">
              <div className="device-laptop"><div className="laptop-screen"><iframe src="https://nadia-kroetz-odontologia.vercel.app/" title="Demonstração real do site Nádia Kroetz Odontologia" loading="lazy" /></div><div className="laptop-base"></div></div>
              <div className="device-phone"><div className="phone-notch"></div><iframe src="https://nadia-kroetz-odontologia.vercel.app/" title="Visualização móvel do site Nádia Kroetz Odontologia" loading="lazy" /></div>
              <div className="device-shadow"></div>
            </div>
            <div className="project-visual-bottom"><span>DESIGN RESPONSIVO</span><span>EXPERIÊNCIA DIGITAL <ArrowUpRight size={13}/></span></div>
          </div>
          <div className="project-info">
            <div className="project-category"><span className="category-dot"></span> SAÚDE / ODONTOLOGIA</div>
            <h3>Nádia Kroetz<br/><span>Odontologia</span></h3>
            <p>Uma presença digital para apresentar o trabalho da clínica, comunicar confiança e facilitar o caminho até o agendamento.</p>
            <div className="project-tags"><span>Site institucional</span><span>Responsivo</span><span>Experiência digital</span></div>
            <a href="https://nadia-kroetz-odontologia.vercel.app/" target="_blank" rel="noreferrer" className="project-link">Visitar projeto <ArrowUpRight size={17}/></a>
            <div className="project-index"><span>01</span><span className="index-rule"></span><span>01 PROJETO APRESENTADO</span></div>
          </div>
        </article>
        <div className="projects-note"><span className="note-star">✳</span><p>Esta vitrine será ampliada conforme novos projetos forem concluídos. Cada demonstração deve mostrar trabalho real, sem métricas inventadas.</p><a href="https://nadia-kroetz-odontologia.vercel.app/" target="_blank" rel="noreferrer">Explorar site <ArrowUpRight size={14}/></a></div>
      </section>

      <section className="principles section-shell section-pad">
        <div className="principles-intro"><div className="section-kicker">NOSSO COMPROMISSO <span>03 / 04</span></div><h2>Mais que presença.<br/><span className="blue-text">Intenção em cada detalhe.</span></h2><p>Um bom projeto digital combina clareza, utilidade e cuidado técnico. Cada escolha precisa ter um motivo.</p></div>
        <div className="principles-list">
          <div className="principle"><span className="principle-icon"><Compass size={19}/></span><div><h3>Design com propósito</h3><p>Uma identidade visual alinhada ao seu negócio e ao público que você quer alcançar.</p></div><span className="principle-arrow"><ArrowUpRight size={17}/></span></div>
          <div className="principle"><span className="principle-icon"><Smartphone size={19}/></span><div><h3>Experiência em qualquer tela</h3><p>Uma navegação clara, confortável e responsiva do celular ao desktop.</p></div><span className="principle-arrow"><ArrowUpRight size={17}/></span></div>
          <div className="principle"><span className="principle-icon"><Zap size={19}/></span><div><h3>Performance e cuidado técnico</h3><p>Uma base leve, acessível e preparada para evoluir com o projeto.</p></div><span className="principle-arrow"><ArrowUpRight size={17}/></span></div>
        </div>
      </section>

      <section className="process section-shell section-pad" id="processo">
        <div className="section-heading">
          <div><div className="section-kicker">COMO FUNCIONA <span>04 / 04</span></div><h2>Do primeiro papo<br/>à <span className="blue-text">entrega.</span></h2></div>
          <p>Um processo transparente, com etapas claras para transformar uma necessidade em uma solução digital.</p>
        </div>
        <div className="process-grid">{steps.map((step, i) => <article className="process-step" key={step.number}><div className="step-top"><span>{step.number}</span>{i < steps.length - 1 && <span className="step-connector"></span>}<span className="step-check"><CircleDot size={17}/></span></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </section>

      <section className="instagram section-shell">
        <div className="instagram-backdrop" aria-hidden="true"></div>
        <div className="instagram-copy"><div className="section-kicker">IDEIAS EM MOVIMENTO</div><h2>O próximo passo<br/>acontece <span className="blue-text">junto.</span></h2><p>Acompanhe a Além da Web para ver ideias, bastidores e conversas sobre o universo digital.</p><a href="https://www.instagram.com/alemdawebsites/" target="_blank" rel="noreferrer" className="button button-outline"><Instagram size={17}/> Seguir no Instagram <ArrowUpRight size={15}/></a></div>
        <a className="instagram-profile" href="https://www.instagram.com/alemdawebsites/" target="_blank" rel="noreferrer"><div className="profile-top"><span className="profile-icon">A.</span><span className="profile-external"><ArrowUpRight size={18}/></span></div><div className="profile-name">Além da Web</div><div className="profile-handle">@alemdawebsites</div><div className="profile-rule"></div><p>Sites, sistemas e experiências digitais desenvolvidos com intenção.</p><div className="profile-bottom"><span><span className="live-dot"></span> PERFIL OFICIAL</span><MoveUpRight size={15}/></div></a>
      </section>

      <section className="contact section-shell" id="contato">
        <div className="contact-glow" aria-hidden="true"></div>
        <div className="contact-content"><div className="section-kicker">VAMOS CONVERSAR?</div><h2>Sua próxima ideia<br/>merece ir <span className="blue-text">além.</span></h2><p>Conte um pouco sobre o seu negócio e o que você quer construir. Vamos encontrar o melhor caminho para tirar a ideia do papel.</p><a className="button button-primary" href="https://www.instagram.com/alemdawebsites/" target="_blank" rel="noreferrer">Iniciar uma conversa <ArrowUpRight size={17}/></a><small>Por enquanto, o Instagram é o canal de contato disponível.</small></div>
        <div className="contact-mark" aria-hidden="true"><div className="contact-mark-ring"></div><div className="contact-mark-a">A<span>.</span></div><div className="contact-mark-caption">IDEIAS → CÓDIGO → RESULTADO</div></div>
      </section>

      <footer className="footer section-shell">
        <a href="#inicio" className="brand footer-brand"><span className="brand-mark"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M5 39 24 5l19 34H31L24 25 16 39Z" fill="currentColor"/><path d="M15 31h20" stroke="#1685ff" strokeWidth="3"/></svg></span><span className="brand-copy"><strong>Além da Web</strong><small>SITES E SISTEMAS</small></span></a>
        <p>Experiências digitais para ir além.</p>
        <div className="footer-links"><a href="#servicos">Serviços</a><a href="#projetos">Projetos</a><a href="#processo">Processo</a><a href="https://www.instagram.com/alemdawebsites/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={12}/></a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Além da Web. Todos os direitos reservados.</span><a href="#inicio">VOLTAR AO TOPO ↑</a></div>
      </footer>
    </main>
  );
}