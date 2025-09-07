// APPHO @ SDSU — single file React site
// Edit only the `site` object below to update copy, colors, images, officers, speakers, links, and passwords.

import { useMemo, useState, useEffect } from "react";
import { Calendar, Linkedin, Users, Mail, Instagram, Globe, Shield } from "lucide-react";

// Inject Google Fonts + brand tokens + site-wide styles
function HeadStyle() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
/* ===== People card 3D flip (fixed height) ===== */
.card-3d{
  perspective:1000px;
  position:relative;
  width:100%;
  aspect-ratio: 4 / 5;          /* <— sets a real height */
}
.card-3d-inner{
  position:relative;
  width:100%; height:100%;      /* <— fill the container */
  transform-style:preserve-3d; transition: transform .6s ease;
  border-radius:12px; overflow:hidden;
}
.card-3d:hover .card-3d-inner{ transform: rotateY(180deg); }
.card-3d.forceflip .card-3d-inner{ transform: rotateY(180deg); } /* mobile tap */
.card-face{
  position:absolute; inset:0; backface-visibility:hidden; -webkit-backface-visibility:hidden;
  width:100%; height:100%;
}
.card-front{ background:#f8fafc; }
.card-back{
  background: linear-gradient(180deg, var(--appho-dark-red), var(--appho-bright-red));
  color:#fff; transform: rotateY(180deg);
  display:flex; align-items:center; justify-content:center; padding:16px; text-align:left;
}

.person-name{ font-weight:700; font-size:14px; }
.person-role{ font-size:12px; opacity:.9; }

/* LinkedIn floating button (front) */
.person-ln{ position:absolute; right:8px; top:8px; }

/* back text layout – compact */
.bio-back-wrap{
  padding:14px; display:flex; flex-direction:column; gap:6px;
  font-size:12px; line-height:1.3;
}
.bio-label{ font-size:11px; text-transform:uppercase; letter-spacing:.04em; opacity:.9; }
.bio-val{ opacity:.96; }
.bio-fav{ margin-top:2px; }

/* line clamp utilities to keep text inside the photo */
.clamp-1{ display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden; }
.clamp-2{ display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.clamp-3{ display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
.clamp-4{ display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden; }


/* ===== Get started layout helpers ===== */
.stack-card{ display:flex; flex-direction:column; }
.stack-fill{ display:flex; flex-direction:column; gap:16px; flex:1; }
.stack-fill .btn-pill{ flex:1; min-height:64px; width:100%; } /* tall, full width */

/* keep the outer "Card" hover outline you already use */
.card-hover-red:hover{ border-color: var(--appho-dark-red) !important; }

/* LinkedIn icon button */
.btn-linkedin{
  display:inline-flex; align-items:center; justify-content:center;
  width:44px; height:44px; border-radius:9999px;
  border:1px solid #e5e7eb; background:#fff; transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease;
}
.btn-linkedin:hover{ transform: translateY(-1px); box-shadow:0 8px 24px rgba(0,0,0,.08); border-color: var(--appho-dark-red); }

:root{
  --appho-bright-red:#D41736; /* Bright Red */
  --appho-dark-red:#A6192E;   /* Dark Red */
  --appho-charcoal:#2D2828;
  --appho-black:#000000;

  /* soft surfaces for subtle red accents */
  --red-surface:#FFF6F7;
  --red-surface-2:#FFE9EC;
}

.font-display{font-family:'Oswald',system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial,'Noto Sans','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol',sans-serif;}
.font-sans{font-family:'Inter',ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif;}

/* brand utility classes */
.bg-appho-red{background-color:var(--appho-bright-red);}
.bg-appho-dark{background-color:var(--appho-dark-red);}
.bg-appho-black{background-color:var(--appho-black);}
.text-appho-red{color:var(--appho-bright-red);}
.border-appho-charcoal{border-color:var(--appho-charcoal);}

/* pretty pill buttons (SDSU red base + light-up hover) */
.btn-pill{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  border-radius:9999px; padding:12px 18px; font-weight:700; letter-spacing:.01em;
  border:1px solid transparent; text-decoration:none !important;
  transition: transform .15s ease, box-shadow .15s ease, background .15s ease, border-color .15s ease, filter .15s ease, color .15s ease;
}
.btn-pill:active{ transform:translateY(0); }

/* PRIMARY — solid SDSU red by default; lights up to brighter red on hover/focus */
.btn-solid-red{
  background: var(--appho-dark-red);  /* #A6192E */
  color:#fff;
  box-shadow: 0 10px 22px rgba(166,25,46,.28);
}
.btn-solid-red:hover,
.btn-solid-red:focus-visible{
  background: var(--appho-bright-red); /* #D41736 */
  color:#fff;
  box-shadow: 0 0 0 4px rgba(166,25,46,.18), 0 14px 28px rgba(166,25,46,.34);
  transform: translateY(-1px);
}

/* SECONDARY / TERTIARY */
.btn-outline-red{ background:#fff; color:#111; border-color:rgba(166,25,46,.35); }
.btn-outline-red:hover,
.btn-outline-red:focus-visible{ border-color:var(--appho-dark-red); box-shadow:0 8px 20px rgba(166,25,46,.12); }

.btn-ghost{ background:var(--red-surface); color:#111; border-color:#ffd7dc; }
.btn-ghost:hover,
.btn-ghost:focus-visible{ background:var(--red-surface-2); border-color:var(--appho-dark-red); }

/* Make the three "Get started" buttons fill the whole card vertically */
.stack-fill .btn-pill{ width:100%; min-height:64px; }

/* keep link hover color from fighting button text inside buttons */
.btn-pill:hover{ color:inherit; }

/* section title accent (thin red bar on the left) */
.section-title{ position: relative; padding-left: 14px; }
.section-title::before{
  content:""; position:absolute; left:0; top:4px; bottom:4px; width:4px; border-radius:4px;
  background: linear-gradient(180deg, var(--appho-dark-red), var(--appho-bright-red));
}

/* card hover outline (used on Exec Board + Events + generic cards) */
.card-hover-red{ transition: box-shadow .2s ease, border-color .2s ease, transform .2s ease; }
.card-hover-red:hover{
  border-color: var(--appho-dark-red) !important;
  box-shadow: 0 6px 22px rgba(166,25,46,.18);
  transform: translateY(-1px);
}

/* simple accordion styling (FAQ) */
details.faq{
  border:1px solid #e5e7eb; border-radius:12px; background:#fff; padding:12px 16px;
}
details.faq + details.faq{ margin-top:10px; }
details.faq[open]{ border-color: var(--appho-dark-red); box-shadow: 0 4px 16px rgba(166,25,46,.08); }
details.faq summary{
  cursor:pointer; list-style:none; display:flex; justify-content:space-between; align-items:center;
  font-weight:600;
}
details.faq summary::-webkit-details-marker{ display:none; }
.faq-caret{ transition: transform .2s ease; }
details[open] .faq-caret{ transform: rotate(90deg); }
`}</style>
    </>
  );
}
/* ==========================
   CONTENT — EDIT ME ONLY
========================== */
const site = {
  name: "APPHO @ SDSU",
  year: "2025–26",
  tagline: "Building Passionate Healthcare Providers",
  brand: {
    logoUrl: "/img/appho-logo.png",
    primaryColor: "bg-appho-red",
    headerColor: "bg-appho-black",
  },
  nav: [
    { key: "membership", label: "Membership" },
    { key: "speakers", label: "Speakers" },
    { key: "people", label: "Exec. Board" },
    { key: "events", label: "Events" },
    { key: "contact", label: "Contact" },
  ],
  hero: {
    headline: "APPHO @ SDSU",
    sub: "Building Passionate Healthcare Providers",
    ctaText: "Join now",
    ctaLink: "https://forms.gle/ofxQJF1izqCcK8dK6",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop",
  },
  about: {
    blurb:
      "APPHO is a mentorship and philanthropic organization that works with students who plan on pursuing a career in the pre-health field. We support paths into medicine, dentistry, pharmacy, optometry, physical therapy, physician assistant, and more.",
    highlights: [
      "Clinical volunteering and community outreach",
      "Application prep: personal statements, interviews, CASPA/AMCAS/AADSAS",
      "Shadowing and a pre-health speaker series with practicing providers",
    ],
  },
  membership: {
    intro: "Membership is open to all SDSU students. No experience required.",
    benefits: [
      "Weekly meetings with pre-health workshops",
      "Clinical, shadowing, and volunteering opportunities",
      "Application and test prep resources (MCAT/DAT/OAT/PA-CAT)",
      "Mentorship and networking with providers and alumni",
    ],
    howToJoin: [
      { label: "Apply on Google Form", href: "https://forms.gle/ofxQJF1izqCcK8dK6" },
      { label: "Join our GroupMe", href: "https://groupme.com/join_group/88026538/Srd3FVX5" },
      { label: "Get the newsletter", href: "https://apphosdsu.com/newsletter" },
    ],
    dues: { show: true, text: "Annual dues: $30. Scholarships available. Pay on September 17th." },
  },
  speakers: {
    intro: "Pre-Health speaker series — physicians, dentists, PAs, pharmacists, PT/OT, optometrists, and more.",
    upcoming: [],
    past: [
      { name: "Alex Rivera, PA-C", role: "Emergency Medicine", topic: "Becoming a Physician Associate", date: "Apr 3, 2025", link: "#" },
      { name: "Priya Shah, PharmD", role: "Clinical Pharmacist", topic: "Hospital Pharmacy 101", date: "Mar 6, 2025", link: "#" },
    ],
  },
people: {
  intro: "Meet the leadership team",
  officers: [
    { name: "Penelope Dalton",  role: "President",                             photo: "" },
    { name: "Paul DeStefano",   role: "Vice President",                        photo: "" },
    { name: "Celine Thomassian",role: "VP of Membership and Development",      photo: "" },
    { name: "Jeremy Goodwin",   role: "Secretary",                             photo: "" },
    { name: "Rubi Kincannon",   role: "Treasurer",                             photo: "" },
    { name: "Claire Westberg",  role: "Professional Development",              photo: "" },
    { name: "Marco Crosswhite", role: "Philanthropy",                          photo: "" },
    { name: "Anna Sklyar",      role: "Academics",                             photo: "" },
    { name: "Sarah Valenzuela", role: "Social",                                photo: "" },
    { name: "Josh Brennan",     role: "Community Service",                     photo: "" },
    { name: "Madasin Farrow",   role: "Public Relations",                      photo: "" },
  ],
  advisors: [],
},

  events: {
    intro: "Members-only calendar.",
    calendarSrc: "https://calendar.google.com/calendar/embed?src=c_classroom12345%40group.calendar.google.com&ctz=America%2FLos_Angeles",
    addCalendarText: "Add to your calendar",
    addCalendarLink: "",
    protected: true,
    password: "APPHO25",
    gateNote: "Members only. Ask an officer for the password.",
  },
  contact: {
    email: "appho.sdsu@gmail.com",
    instagram: "https://www.instagram.com/apphosdsu/",
    address: "San Diego State University, San Diego, CA",
    formTo: "mailto:appho.sdsu@gmail.com?subject=APPHO%20Inquiry",
  },
  admin: {
    password: "APPHO25",
    sheetLink: "",
  },
  members: {
    calendarPassword: "APPHO25",
    calendarLink:
      "https://calendar.google.com/calendar/u/0?cid=ODNkNWUzMzZkMjI2NWMzNjAwMzFhOWMzNWU5YmY2NjU4Njk2NmY4MzBmZWE2MTY1MzhlYjc3MDUzZGU5ODE4N0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
  },
};

/* ==========================
   UI
========================== */
function Container({ children }) {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 font-sans">{children}</div>;
}

function Logo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => (window.location.hash = "home")}>
      {site.brand.logoUrl ? (
        <img
          src={site.brand.logoUrl}
          alt="APPHO logo"
          className="h-9 w-auto object-contain hidden sm:block"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      ) : null}
      <div className="text-xl font-display tracking-tight">APPHO</div>
    </div>
  );
}

function Nav({ current }) {
  return (
    <header className={`sticky top-0 z-40 border-b border-zinc-900/70 ${site.brand.headerColor} text-white`}>
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <nav className="hidden gap-1 md:flex">
            {site.nav.map((item) => {
              const active = current === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => (window.location.hash = item.key)}
                  className={`rounded-xl px-3 py-2 text-sm transition ${active ? "bg-white/10" : "hover:bg-white/10"}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <a
            href={site.hero.ctaLink}
            className="hidden md:inline-block btn-pill btn-solid-red px-3 py-2 text-sm font-medium"
          >
            {site.hero.ctaText}
          </a>
        </div>
      </Container>
      <div className="md:hidden border-t border-white/10">
        <Container>
          <div className="flex flex-wrap gap-2 py-2">
            {site.nav.map((item) => {
              const active = current === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => (window.location.hash = item.key)}
                  className={`rounded-lg px-2 py-1 text-xs ${active ? "bg-white/10 text-white" : "bg-white/10"}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </Container>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      className="text-white py-16"
	style={{ background: "var(--appho-bright-red)" }}
    >
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="font-display text-5xl font-semibold tracking-tight">{site.hero.headline}</h1>
            <p className="mt-3 text-lg text-zinc-100/90">{site.hero.sub}</p>
            <p className="mt-1 text-sm text-zinc-100/70">{site.year}</p>
            <div className="mt-6 flex items-center gap-3">
              <a href={site.hero.ctaLink} className="btn-pill btn-solid-red px-4 py-2 font-medium">
                {site.hero.ctaText}
              </a>
              <a href="#events" className="btn-pill btn-ghost">
                See events
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <div
              className="aspect-video w-full rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url(${site.hero.image})` }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm card-hover-red ${className}`}>
      {children}
    </div>
  );
}

function HomeAbout() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-display text-3xl section-title">About</h2>
          <p className="mt-3 text-zinc-700">
            APPHO is a mentorship and philanthropic organization that works with students pursuing careers in the health professions.
          </p>
          <ul className="mt-4 space-y-2 text-zinc-700 list-disc pl-5">
            <li>Clinical volunteering and community outreach</li>
            <li>Application prep: personal statements, interviews, CASPA/AMCAS/AADSAS</li>
            <li>Shadowing and a pre-health speaker series with practicing providers</li>
          </ul>
        </Card>
{/* Stacked actions that fill the whole card */}
<Card className="stack-card">
  <h3 className="text-xl font-medium mb-5">Get started</h3>
<div className="stack-fill">
  <a href={site.hero.ctaLink} className="btn-pill btn-solid-red w-full">
    <Users className="h-4 w-4" /> Membership Form
  </a>
  <a href="#events" className="btn-pill btn-outline-red w-full">
    <Calendar className="h-4 w-4" /> See Events
  </a>
  <a href="https://groupme.com/join_group/88026538/Srd3FVX5" className="btn-pill btn-ghost w-full">
    <Users className="h-4 w-4" /> Join GroupMe
  </a>
</div>
</Card>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "What is APPHO and what does it stand for?", a: "APPHO stands for the Aztec Pre-Professional Health Organization. We are a student-run organization at SDSU dedicated to supporting students pursuing careers in the health professions, including medicine, dentistry, pharmacy, optometry, physician assistant, and more."},
    { q: "Who can join APPHO?", a: "APPHO is open to all SDSU students interested in health-related careers, regardless of major or year."},
    { q: "What makes APPHO different from other pre-health clubs on campus?", a: "Our interdisciplinary focus welcomes students across all health professions. We prioritize community, mentorship, professional development, and networking."},
    { q: "What kind of events does APPHO host?", a: "Guest speaker panels, application workshops, volunteer opportunities, socials, and collaborations with other orgs and departments."},
    { q: "How does APPHO support students preparing for grad/professional school?", a: "Workshops, Q&As with professionals, peer mentorship, networking, clinical/volunteer connections, and resources for exams and timelines."},
    { q: "Are there leadership opportunities in APPHO?", a: "Yes—executive board positions, committees, and event roles are available each year."},
    { q: "What is the time commitment like for members?", a: "Flexible. We typically hold weekly meetings plus optional events. Participate as much as you can."},
    { q: "Is there a membership fee?", a: "Yes, a small fee supports club activities. Amount and payment details are announced each semester; financial accommodations may be available."},
    { q: "How can I stay connected with APPHO?", a: "Instagram @appho.sdsu, GroupMe (link below), email list (new member form), GBMs, and this website."},
    { q: "How do I get started?", a: "1) Fill out the new member form, 2) join our GroupMe, 3) attend a GBM, 4) follow us on Instagram."},
  ];

  const [open, setOpen] = useState(faqs.map(() => false));
  const setAll = (value) => setOpen(open.map(() => value));
  const toggleAt = (idx, next) => {
    const copy = [...open];
    copy[idx] = typeof next === "boolean" ? next : !copy[idx];
    setOpen(copy);
  };

  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-3xl section-title">FAQ</h2>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setAll(true)} className="btn-pill btn-outline-red">Expand All</button>
            <button onClick={() => setAll(false)} className="btn-pill btn-outline-red">Collapse All</button>
          </div>
        </div>

        <div className="mt-6">
          {faqs.map((item, i) => (
            <details
              className="faq"
              key={i}
              open={open[i]}
              onToggle={(e) => toggleAt(i, e.currentTarget.open)}
            >
              <summary>
                <span>{item.q}</span>
                <span className="faq-caret">›</span>
              </summary>
              <div className="mt-2 text-zinc-700">{item.a}</div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ===== Photos (placeholder grid) ===== */
function Photos() {
  const images = []; // add URLs later
  if (!images.length) {
    return (
      <section className="py-12">
        <Container>
          <h2 className="font-display text-3xl section-title">Photos</h2>
          <p className="mt-3 text-zinc-600">
            Gallery coming soon. We’ll feature photos from meetings, speakers, and service events.
          </p>
        </Container>
      </section>
    );
  }
  return (
    <section className="py-12">
      <Container>
        <h2 className="font-display text-3xl section-title">Photos</h2>
        <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {images.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-xl border card-hover-red">
              <img src={src} alt={`APPHO ${i+1}`} className="w-full h-40 object-cover" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Membership() {
  return (
    <section className="py-12">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="font-display text-3xl section-title">Membership</h2>
            <p className="mt-2 text-zinc-600">{site.membership.intro}</p>
            <ul className="mt-4 space-y-2 text-zinc-700 list-disc pl-5">
              {site.membership.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            {site.membership.dues?.show && (
              <p
                className="mt-4 rounded-lg p-3 text-sm border"
                style={{ backgroundColor: "#fff", color: "#111", borderColor: "var(--appho-bright-red)" }}
              >
                {site.membership.dues.text}
              </p>
            )}
          </Card>
          <Card>
            <h3 className="text-xl font-medium">Join the club</h3>
            <div className="mt-3 grid gap-3">
              {site.membership.howToJoin.map((x, i) => (
                <a
                  key={i}
                  href={x.href}
                  className="flex items-center justify-between rounded-xl border px-4 py-3 hover:bg-zinc-50"
                >
                  <span>{x.label}</span>
                </a>
              ))}
            </div>
          </Card>
        </div>
        <div className="mt-6">
          <AdminInline />
        </div>
      </Container>
    </section>
  );
}

function AdminInline() {
  const [pwd, setPwd] = useState("");
  const ok = pwd === site.admin.password;
  return (
    <Card>
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5" />
        <h3 className="font-display text-2xl">Officer / Members</h3>
      </div>
      {!ok ? (
        <div className="mt-4">
          <p className="text-zinc-600 text-sm">Enter the password to access the spreadsheet.</p>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Password"
            className="mt-3 w-full rounded-lg border px-3 py-2"
          />
        </div>
      ) : (
        <div className="mt-4">
          {site.admin.sheetLink ? (
            <a className="" href={site.admin.sheetLink} target="_blank" rel="noreferrer">
              Open admin spreadsheet
            </a>
          ) : (
            <p className="text-zinc-700">
              Spreadsheet link not set. Edit <code>site.admin.sheetLink</code> in the code and paste your Google Sheet URL.
            </p>
          )}
        </div>
      )}
    </Card>
  );
}

function Speakers() {
  const hasUpcoming = site.speakers.upcoming && site.speakers.upcoming.length > 0;
  return (
    <section className="py-12">
      <Container>
        <h2 className="font-display text-3xl section-title">Speakers</h2>
        {!hasUpcoming ? (
          <p className="mt-3 text-zinc-600">Add your upcoming speakers in the site.speakers.upcoming list.</p>
        ) : null}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {site.speakers.upcoming.map((s) => (
            <SpeakerCard key={s.name + s.date} {...s} tag="Upcoming" />
          ))}
        </div>
        <h3 className="mt-10 font-semibold">Past speakers</h3>
        <div className="mt-4 grid md:grid-cols-3 gap-6">
          {site.speakers.past.map((s) => (
            <SpeakerCard key={s.name + s.date} {...s} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function SpeakerCard({ name, role, topic, date, link, tag }) {
  return (
    <article className="relative p-5 rounded-2xl bg-white border border-zinc-200 text-zinc-900 shadow-sm card-hover-red">
      {tag && (
        <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs rounded-full bg-appho-red text-white shadow">
          {tag}
        </span>
      )}
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm text-zinc-600">{role}</p>
      <p className="mt-3 text-sm">
        Topic: <span className="font-medium">{topic}</span>
      </p>
      <div className="mt-3 flex items-center justify-between text-sm text-zinc-600">
        <span>{date}</span>
        {link && (
          <a className="" href={link} target="_blank" rel="noreferrer">
            Details
          </a>
        )}
      </div>
    </article>
  );
}

function People() {
  // helper: turn major/year fields into a single string nicely
  const majorYearText = (p) => {
    if (p.majorYear) return p.majorYear;
    const parts = [p.major, p.year].filter(Boolean);
    return parts.join(" · ");
  };

  const PersonCard = ({ p }) => {
    const [flip, setFlip] = useState(false);

    return (
      <Card>
        {/* 3D flip container */}
<div
  className={`card-3d ${flip ? "forceflip" : ""}`}
  onClick={() => setFlip((v) => !v)}
  style={{ cursor: "pointer", aspectRatio: "4 / 5" }}   // <— added
  title="Click/tap to flip"
>

          <div className="card-3d-inner">
            {/* FRONT */}
            <div className="card-face card-front">
              <div
                className="aspect-[4/5] w-full bg-cover bg-center relative"
                style={{
                  backgroundImage: p.photo ? `url(${p.photo})` : undefined,
                  background: p.photo
                    ? undefined
                    : "linear-gradient(180deg, rgba(215,45,66,.15), rgba(246,73,92,.15))",
                }}
              >
                {/* LinkedIn button (if provided) */}
                {p.linkedin && (
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="person-ln btn-linkedin"
                    onClick={(e) => e.stopPropagation()}
                    title="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}

                {/* name/role overlay */}
                <div className="person-overlay">
                  <div className="person-name clamp-1">{p.name}</div>
                  <div className="person-role clamp-2">{p.role}</div>
                </div>
              </div>
            </div>

            {/* BACK */}
            <div className="card-face card-back">
              <div className="bio-back-wrap">
                <div>
                  <div className="bio-label">Hometown</div>
                  <div className="bio-val clamp-1">{p.hometown || "—"}</div>
                </div>
                <div>
                  <div className="bio-label">Major / Year</div>
                  <div className="bio-val clamp-2">{majorYearText(p) || "—"}</div>
                </div>
                <div>
                  <div className="bio-label">Favorite thing about APPHO</div>
                  <div className="bio-val bio-fav clamp-4">{p.favorite || "—"}</div>
                </div>

                {/* contact row */}
                <div className="mt-2 flex items-center gap-2">
                  {p.email && (
                    <a
                      href={`mailto:${p.email}`}
                      className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs hover:bg-white/10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail className="h-3 w-3" /> Email
                    </a>
                  )}
                  {p.linkedin && (
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs hover:bg-white/10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin className="h-3 w-3" /> LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <section className="py-12">
      <Container>
        <h2 className="font-display text-3xl section-title">Exec. Board</h2>
        <p className="mt-2 text-zinc-600">{site.people.intro}</p>

        {/* One uniform responsive grid (same sizes as before) */}
        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {site.people.officers.map((p, i) => (
            <PersonCard key={p.name + i} p={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Events() {
  const [pwd, setPwd] = useState("");
  const [unlocked, setUnlocked] = useState(!site.events.protected);
  const [error, setError] = useState("");

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pwd === site.events.password) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  // Try to auto-build an EMBED src from the members.calendarLink (cid=...)
  const embedSrc = useMemo(() => {
    try {
      const raw = site.members?.calendarLink || "";
      const u = new URL(raw);
      const cid = u.searchParams.get("cid");
      if (cid) {
        const tz = "America/Los_Angeles";
        return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(cid)}&ctz=${encodeURIComponent(tz)}`;
      }
    } catch (e) {}
    return site.events.calendarSrc;
  }, []);

  return (
    <section id="events" className="py-12">
      <Container>
        <h2 className="section-title font-display text-3xl">Events</h2>
        <p className="mt-2 text-zinc-600">{site.events.intro}</p>

        {!unlocked ? (
          <form onSubmit={handleUnlock} className="mt-6 max-w-xl">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm card-hover-red">
              <p className="text-sm text-zinc-600">{site.events.gateNote}</p>
              <label className="mt-4 block text-sm font-medium text-zinc-800" htmlFor="eventsPwd">
                Enter password
              </label>
              <input
                id="eventsPwd"
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2"
              />
              {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
              <button type="submit" className="mt-4 btn-pill btn-solid-red">Unlock</button>
            </div>
          </form>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border card-hover-red">
            <iframe title="Google Calendar" src={embedSrc} style={{ border: 0 }} className="h-[720px] w-full" />
          </div>
        )}

        {unlocked && site.events.addCalendarLink && (
          <a href={site.events.addCalendarLink} className="mt-4 inline-flex items-center gap-2 btn-pill btn-outline-red">
            <Calendar className="h-4 w-4" /> {site.events.addCalendarText}
          </a>
        )}
      </Container>
    </section>
  );
}

function Contact() {
  return (
    <section className="py-12">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="font-display text-3xl section-title">Contact</h2>
            <div className="mt-3 space-y-3 text-sm text-zinc-700">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                <a href={site.contact.instagram}>Instagram</a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" /> {site.contact.address}
              </div>
            </div>
            <a href={site.contact.formTo} className="mt-4 inline-block btn-pill btn-outline-red">
              Email us
            </a>
          </Card>
          <Card>
            <h3 className="text-xl font-medium">Questions about membership?</h3>
            <p className="mt-2 text-zinc-600">We will get back to you within a few days during the semester.</p>
            <a href={site.hero.ctaLink} className="mt-4 inline-block btn-pill btn-ghost">
              Join form
            </a>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
<footer className="border-t border-zinc-200 bg-white text-zinc-800 py-8">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-lg font-display">{site.name}</div>
            <div className="text-zinc-600">{site.tagline}</div>
            <div className="text-zinc-500 text-xs mt-1">{site.year}</div>
          </div>
          <div className="text-sm text-zinc-700">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              <a href={site.contact.instagram}>Instagram</a>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Globe className="h-4 w-4" /> {site.contact.address}
            </div>
          </div>
          <div className="text-sm text-zinc-500">
            <div>© {new Date().getFullYear()} APPHO. All rights reserved.</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default function ApphoSite(){
  const [current,setCurrent]=useState("home");

  // Tiny hash router: #events, #membership, #people, #speakers, #contact, #home
useEffect(() => {
  const handle = () => {
    const raw = window.location.hash || "#home";
    const h = raw.startsWith("#") ? raw.slice(1) : raw; // "home", "events", etc.
    const allowed = new Set(["home", ...site.nav.map(n => n.key)]);
    setCurrent(allowed.has(h) ? h : "home");
  };
  handle(); // on initial load
  window.addEventListener("hashchange", handle);
  return () => window.removeEventListener("hashchange", handle);
}, []);


  const Page = useMemo(()=>{
    switch(current){
      case "membership": return <Membership />;
      case "speakers":   return <Speakers />;
      case "people":     return <People />;
      case "events":     return <Events />;
      case "contact":    return <Contact />;
      default:           return (<><Hero /><HomeAbout /><FAQ /><Photos /></>);
    }
  },[current]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
      <HeadStyle />
      <Nav current={current} />
      <main className="flex-1">{Page}</main>
      <Footer />
    </div>
  );
}
