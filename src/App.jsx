// APPHO @ SDSU — single file React site
// Edit only the `site` object below to update copy, colors, images, officers, speakers, links, and passwords.
// Hello I am Avi i made this acw2515@gmail.com email if you have questions

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
/* ===== Site-wide red gradient + dotted pattern (persists to footer) ===== */
.pattern-bg{ position:relative; }
.pattern-bg::before{
  content:"";
  position:fixed; inset:0;
  z-index:-1;
  pointer-events:none;

  /* Dots only — no gradient */
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><circle cx='1' cy='1' r='1' fill='%23D41736' fill-opacity='0.30'/></svg>");
  background-repeat: repeat;
  background-size: 32px 32px;
  background-attachment: fixed;
}

/* ===== People card 3D flip (fixed height) ===== */
.card-3d{
  perspective:1000px;
  position:relative;
  width:100%;
  aspect-ratio: 3 / 4; /* was 4 / 5 */
}
.card-3d-inner{
  position:relative;
  width:100%; height:100%;
  transform-style:preserve-3d; -webkit-transform-style:preserve-3d;
  transform:rotateY(0deg);
  transition: transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1);
  border-radius:12px; overflow:hidden;
  will-change: transform;
}
.card-3d:hover .card-3d-inner,
.card-3d.forceflip .card-3d-inner{ transform: rotateY(180deg); }

.card-face{
  position:absolute; inset:0; width:100%; height:100%;
  backface-visibility:hidden; -webkit-backface-visibility:hidden;
}
.card-front{ background:#f8fafc; }
.card-back{
  background:#fff;               /* white back */
  color:#111;                    /* dark text */
  transform: rotateY(180deg);
  display:flex;                  /* we'll stack body + footer */
  flex-direction:column;
  padding:16px;
  text-align:left;
}
/* Back-face footer action (LinkedIn) */
.card-back-footer{
  margin-top:auto;               /* push to bottom */
  display:flex; align-items:center; justify-content:center;
  padding-top:10px;
  border-top:1px solid #e5e7eb;
}

.card-back-ln{
  display:inline-flex; align-items:center; gap:8px;
  font-weight:600; font-size:12px;
  border:1px solid #e5e7eb; border-radius:9999px;
  padding:8px 12px; background:#fff; color:#0a66c2;  /* LI blue text */
  transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
  text-decoration:none !important;
}
.card-back-ln:hover{
  transform: translateY(-1px);
  box-shadow:0 8px 24px rgba(0,0,0,.08);
  border-color:#0a66c2;
}


/* --- FAQ smooth open/close --- */
details.faq .faq-content{
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-4px);
  transition:
    max-height .45s cubic-bezier(.4,.2,.2,1),
    opacity .35s ease,
    transform .45s cubic-bezier(.4,.2,.2,1);
  will-change: max-height, opacity, transform;
}

/* When open, reveal content */
details.faq[open] .faq-content{
  max-height: 640px;    /* large enough for most answers */
  opacity: 1;
  transform: translateY(0);
}

/* caret rotates smoothly */
.faq-caret{
  display:inline-block;
  transition: transform .3s ease;
  transform-origin: center;
}
details[open] .faq-caret{ transform: rotate(90deg); }

/* summary hit area a bit comfier */
details.faq summary{
  padding: 6px 0;
}

/* Front overlay for name/role (ensures text readable on any photo) */
.person-overlay{
  position:absolute; left:0; right:0; bottom:0;
  padding:10px 12px;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 85%);
  color:#fff;
}
.person-name{ font-weight:700; font-size:15px; }  /* was 14px */
.person-role{ font-size:12.5px; opacity:.95; }    /* was 12px */

/* LinkedIn floating button (front) */
.person-ln{
  position:absolute; right:8px; top:8px;
  display:inline-flex; align-items:center; justify-content:center;
  width:44px; height:44px; border-radius:9999px;
  border:1px solid #e5e7eb; background:#fff;
  transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease;
}
.person-ln:hover{ transform: translateY(-1px); box-shadow:0 8px 24px rgba(0,0,0,.08); border-color: var(--appho-dark-red); }

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
.card-hover-red{ transition: box-shadow .2s ease, border-color .2s ease, transform .2s ease; }
.card-hover-red:hover{
  border-color: var(--appho-dark-red) !important;
  box-shadow: 0 6px 22px rgba(166,25,46,.18);
  transform: translateY(-1px);
}

/* brand tokens */
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

/* Buttons (unified) */
.btn-pill{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  border-radius:9999px; padding:12px 18px; font-weight:700; letter-spacing:.01em;
  border:1px solid var(--appho-dark-red);
  background:#fff; color:#111; text-decoration:none !important;
  transition: background .2s ease, color .2s ease, border-color .2s ease, transform .15s ease, box-shadow .15s ease;
  text-align:center;
}
.btn-pill:hover,
.btn-pill:focus-visible{
  background: var(--appho-bright-red);
  color:#fff;
  border-color: var(--appho-bright-red);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(166,25,46,.25);
}
.btn-pill:active{ transform:translateY(0); }

/* section title accent (thin red bar on the left) */
.section-title{ position: relative; padding-left: 14px; }
.section-title::before{
  content:""; position:absolute; left:0; top:4px; bottom:4px; width:4px; border-radius:4px;
  background: linear-gradient(180deg, var(--appho-dark-red), var(--appho-bright-red));
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
  headerLogo: "/img/Header-logo.png",   
  heroLogo: "/img/Appho-t.png",         
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
  image: "/img/ExecBoard.jpg",   
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
    ],
    dues: { show: true, text: "Annual dues: $30. Scholarships available. Pay on September 17th." },
  },
speakers: {
  intro: "Pre-Health speaker series — physicians, dentists, nurses, PAs, PT/OT, and more.",
  upcoming: [
    { name: "Patricia Chu Klap, MD", role: "Emergency Medicine Physician", topic: "Emergency Medicine Insights", date: "Sep 18, 2025" },
    { name: "Olivia Cvitanic", role: "President, Healing Hearts Across Borders", topic: "Global Health & Service", date: "Sep 25, 2025" },
    { name: "Luke Joseph", role: "CPR Instructor", topic: "Life-Saving Skills in CPR", date: "Sep 25, 2025" },
    { name: "Jennifer Montgomery, PA-C", role: "Family Medicine / Primary Care", topic: "Trauma, Plastic Surgery, ED & UC Experience", date: "Oct 2, 2025" },
    { name: "Allen Job, DDS, MS, MPH", role: "Pediatric Dentist", topic: "Pediatric Dentistry & Public Health", date: "Oct 16, 2025" },
    { name: "Macy Basterrechea, DPT", role: "Pelvic Floor Physical Therapist", topic: "Specialized PT: Pelvic Health", date: "Oct 30, 2025" },
    { name: "Sarah Wood, RN", role: "Critical Care Nurse", topic: "Critical Care Nursing", date: "Nov 6, 2025" },
  ],
  past: [
    // keep prior spring speakers here if you want a historical record
  ],
},

people: {
  intro: "Meet the Executive Board",
  officers: [
    { name: "Penelope Dalton",  role: "President",                photo: "/img/board/penelope.jpeg", linkedin: "", email: "", hometown: "", majorYear: "" },
    { name: "Paul DeStefano",   role: "Vice President",           photo: "/img/board/paul.jpeg",      linkedin: "", email: "", hometown: "", majorYear: "" },
    { name: "Celine Thomassian",role: "VP of Membership & Dev.",  photo: "/img/board/celine.jpeg",    linkedin: "", email: "", hometown: "", majorYear: "" },
    { name: "Marco Crosswhite", role: "Philanthropy",             photo: "/img/board/marco.jpeg",     linkedin: "", email: "", hometown: "", majorYear: "" },
    { name: "Rubi Kincannon",   role: "Treasurer",                photo: "/img/board/rubi.jpeg",      linkedin: "", email: "", hometown: "", majorYear: "" },
    { name: "Claire Westberg",  role: "Professional Development", photo: "/img/board/claire.jpeg",    linkedin: "", email: "", hometown: "", majorYear: "" },
    { name: "Jeremy Goodwin",   role: "Secretary",                photo: "/img/board/jeremy.jpeg",    linkedin: "", email: "", hometown: "", majorYear: "" },
    { name: "Sarah Valenzuela", role: "Social",                   photo: "/img/board/sarah.jpeg",     linkedin: "", email: "", hometown: "", majorYear: "" },
    { name: "Anna Sklyar",      role: "Academics",                photo: "/img/board/anna.jpeg",      linkedin: "", email: "", hometown: "", majorYear: "" },
    { name: "Josh Brennan",     role: "Community Service",        photo: "/img/board/josh.jpeg",      linkedin: "", email: "", hometown: "", majorYear: "" },
    { name: "Madasin Farrow",   role: "Public Relations",         photo: "/img/board/mads.jpeg",      linkedin: "", email: "", hometown: "", majorYear: "" },
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
    sheetLink: "https://docs.google.com/spreadsheets/d/19JQVcTZ58MAwIgaBoy7A_La61acvWyKioKNIQUVdrmM/edit?usp=sharing",
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
    <div
      className="flex items-center cursor-pointer select-none"
      onClick={() => (window.location.hash = "home")}
      title="APPHO Home"
      aria-label="APPHO Home"
    >
      <img
        src={site.brand.headerLogo}
        alt="APPHO header logo"
        className="h-12 sm:h-14 w-auto object-contain"
      />
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
            className="hidden md:inline-block btn-pill px-3 py-2 text-sm font-medium"
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
      className="hero-red text-white py-20" // ⬅️ more vertical padding
      style={{ background: "var(--appho-bright-red)" }}
    >
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            {/* hidden headline for SEO */}
            <h1 className="sr-only">{site.hero.headline}</h1>

            {/* transparent logo */}
            <img
              src={site.brand.heroLogo}
              alt="APPHO hero logo"
              className="h-28 sm:h-36 md:h-44 w-auto drop-shadow-sm"
            />

            <p className="mt-4 text-lg text-zinc-100/90">{site.hero.sub}</p>
            <p className="mt-1 text-sm text-zinc-100/70">{site.year}</p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.hero.ctaLink}
                className="btn-pill btn-solid-red px-4 py-2 font-medium"
              >
                {site.hero.ctaText}
              </a>
              <a href="#events" className="btn-pill btn-ghost">
                See events
              </a>
            </div>
          </div>

          {/* Taller photo column */}
          <div className="rounded-2xl overflow-hidden h-72 md:h-80">
 	 	<img
  		  src={site.hero.image}
    			alt="APPHO Exec Board"
   		 className="w-full h-full object-cover object-center"
 		 />
		</div>
        </div>
      </Container>
    </section>
  );
}
// Card component — bump p-5 → p-6
function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm card-hover-red ${className}`}>
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
          <h3 className="text-xl font-medium mb-5 text-center">Get started</h3>
          <div className="stack-fill">
            <a href={site.hero.ctaLink} className="btn-pill w-full">
              <Users className="h-4 w-4" /> Membership Form
            </a>
            <a href="https://groupme.com/join_group/88026538/Srd3FVX5" className="btn-pill w-full">
              <Users className="h-4 w-4" /> Join GroupMe
            </a>
            <a href="#events" className="btn-pill w-full">
              <Calendar className="h-4 w-4" /> See Events
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "What is APPHO and what does it stand for?", a: "APPHO stands for the Aztec Professional Pre-Health Organization. We are a student-run organization at SDSU dedicated to supporting students pursuing careers in the health professions, including medicine, dentistry, pharmacy, optometry, physician assistant, and more."},
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
  const allOpen = open.every(Boolean);

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

          {/* single smart toggle */}
          <button
            onClick={() => setAll(!allOpen)}
            className="btn-pill"
            aria-pressed={allOpen}
            title={allOpen ? "Collapse all answers" : "Expand all answers"}
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
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

              {/* animated body */}
              <div className="faq-content mt-2 text-zinc-700">
                {item.a}
              </div>
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

          <Card className="stack-card">
            <h3 className="text-3xl font-display text-center">Join the club</h3>
            <div className="stack-fill">
              <a href={site.hero.ctaLink} className="btn-pill w-full">
                <Users className="h-4 w-4" /> Apply on Google Form
              </a>
              <a href="https://groupme.com/join_group/88026538/Srd3FVX5" className="btn-pill w-full">
                <Users className="h-4 w-4" /> Join GroupMe
              </a>
              <a href={site.contact.instagram} className="btn-pill w-full">
                <Instagram className="h-4 w-4" /> Follow us on Instagram
              </a>
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
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // allow multiple accepted passwords if you ever pass an array
    const allowed = Array.isArray(site.admin.password)
      ? site.admin.password
      : [site.admin.password];

    const ok = allowed.some(
      (p) => String(p).trim().toLowerCase() === pwd.trim().toLowerCase()
    );

    if (ok) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5" />
        <h3 className="font-display text-2xl">Officer / Members</h3>
      </div>

      {!unlocked ? (
        <form onSubmit={onSubmit} className="mt-4">
          <p className="text-zinc-600 text-sm">
            Enter the password to access the spreadsheet.
          </p>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Password"
            className="mt-3 w-full rounded-lg border px-3 py-2"
          />
          {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
          <button type="submit" className="mt-3 btn-pill">
            Unlock
          </button>
        </form>
      ) : (
        <div className="mt-4">
          {site.admin.sheetLink ? (
            <a href={site.admin.sheetLink} target="_blank" rel="noreferrer" className="btn-pill">
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
          style={{ cursor: "pointer", aspectRatio: "3 / 4" }}  // was 4/5
          title="Click/tap to flip"
        >
          <div className="card-3d-inner">
            {/* FRONT */}
            <div className="card-face card-front">
              <div className="aspect-[3/4] w-full relative overflow-hidden">
                {p.photo ? (
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(215,45,66,.15), rgba(246,73,92,.15))" }}
                  />
                )}

                {/* LinkedIn button (if provided) */}
                {p.linkedin && (
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="person-ln"
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

                <div className="mt-2 flex items-center gap-2">
                  {p.email && (
                    <a
                      href={`mailto:${p.email}`}
                      className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs hover:bg-zinc-50"
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
                      className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs hover:bg-zinc-50"
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

        {/* grid: 1 col (mobile), 2 cols (sm+), 3 cols (lg+) */}
        <div className="mt-6 grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
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
              <button type="submit" className="mt-4 btn-pill">Unlock</button>
            </div>
          </form>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border card-hover-red">
            <iframe title="Google Calendar" src={embedSrc} style={{ border: 0 }} className="h-[720px] w-full" />
          </div>
        )}

        {unlocked && site.events.addCalendarLink && (
          <a href={site.events.addCalendarLink} className="mt-4 inline-flex items-center gap-2 btn-pill">
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
            <a href={site.contact.formTo} className="mt-4 inline-block btn-pill">
              Email us
            </a>
          </Card>
          <Card>
            <h3 className="text-xl font-medium">Questions about membership?</h3>
            <p className="mt-2 text-zinc-600">We will get back to you within a few days during the semester.</p>
            <a href={site.hero.ctaLink} className="mt-4 inline-block btn-pill">
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
      const h = raw.startsWith("#") ? raw.slice(1) : raw;
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
    <div className="pattern-bg min-h-screen text-zinc-900 flex flex-col">
      <HeadStyle />
      <Nav current={current} />
      <main className="flex-1">{Page}</main>
      <Footer />
    </div>
  );
}
