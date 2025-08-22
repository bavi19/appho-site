// APPHO @ SDSU — single file React site (Membership includes Admin access)
// Edit only the `site` object below to update copy, colors, images, officers, speakers, and links.
// Yearly refresh: change `site.year`, update officers and speakers.
// Google Calendar: paste your embed into site.events.calendarSrc.
// Admin in Membership: set site.admin.password and site.admin.sheetLink.
// Deploy: I can package for Vite/Netlify/Vercel, or export as static HTML.

import { useMemo, useState } from "react";
import { Calendar, Users, Mail, Instagram, Globe, Shield } from "lucide-react";

// Inject Google Fonts
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
        :root { --appho-red: #A6192E; }
        .font-display { font-family: 'Oswald', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji','Segoe UI Emoji', 'Segoe UI Symbol', sans-serif; }
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif; }
      `}</style>
    </>
  );
}

// ==========================
// CONTENT — EDIT ME ONLY
// ==========================
const site = {
  name: "APPHO @ SDSU",
  year: "2025–26",
  tagline: "Build • Ship • Learn together",
  brand: {
    logoUrl: "/img/appho-logo.png", // replace with your logo URL or leave blank to hide
    primaryColor: "bg-red-600", // SDSU red
    headerColor: "bg-black", // SDSU black
  },
  // Navigation — Membership includes Admin. No APPHO4LIFE.
  nav: [
    { key: "membership", label: "Membership" },
    { key: "speakers", label: "Speakers" },
    { key: "people", label: "People" },
    { key: "events", label: "Events" },
    { key: "contact", label: "Contact" },
  ],
  hero: {
    headline: "APPHO @ SDSU",
    sub: "Build • Ship • Learn together",
    ctaText: "Join now",
    ctaLink: "https://forms.gle/example-membership", // replace
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop",
  },
  about: {
    blurb:
      "APPHO is a student organization at SDSU where members build projects, learn practical skills, and grow a supportive network for careers in tech and related fields.",
    highlights: [
      "Hands-on workshops and weekly meetups",
      "Project pods that ship real work",
      "Guest speakers and career prep",
    ],
  },
  membership: {
    intro: "Membership is open to all SDSU students. No experience required.",
    benefits: [
      "Weekly meetings with hands-on workshops",
      "Speaker series with founders and engineers",
      "Project pods and resume-ready experience",
      "Priority access to hackathons and sponsor swag",
    ],
    howToJoin: [
      { label: "Apply on Google Form", href: "https://forms.gle/example-membership" },
      { label: "Join our Discord", href: "https://discord.gg/example" },
      { label: "Get the newsletter", href: "https://apphosdsu.com/newsletter" },
    ],
    dues: { show: true, text: "Annual dues: $20. Scholarships available. Pay after your 2nd meeting." },
  },
  speakers: {
    intro: "Upcoming and past speakers",
    upcoming: [
      // { name: "Jane Doe", role: "PM, BigCo", topic: "From idea to launch", date: "Sep 18, 2025", link: "#" },
    ],
    past: [
      { name: "Alex Rivera", role: "Founder, BuildLab", topic: "Zero to one projects", date: "Apr 3, 2025", link: "#" },
      { name: "Priya Shah", role: "Security Eng, CloudCo", topic: "Threat modeling 101", date: "Mar 6, 2025", link: "#" },
    ],
  },
  people: {
    intro: "Meet the leadership team",
    note: "Update this every August.",
    officers: [
      { name: "Avery Lee", role: "President", photo: "https://images.unsplash.com/photo-1541534401786-2077eed87a54?q=80&w=800&auto=format&fit=crop", email: "avery@apphosdsu.com" },
      { name: "Sam Patel", role: "VP, Programs", photo: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=800&auto=format&fit=crop", email: "sam@apphosdsu.com" },
      { name: "Mia Rodriguez", role: "Treasurer", photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop", email: "mia@apphosdsu.com" },
      { name: "Leo Nguyen", role: "Outreach Lead", photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop", email: "leo@apphosdsu.com" },
    ],
    advisors: [
      // { name: "Faculty Advisor", role: "Advisor", photo: "", email: "" },
    ],
  },
  events: {
    intro: "Public calendar. Auto updates.",
    calendarSrc:
      "https://calendar.google.com/calendar/embed?src=c_classroom12345%40group.calendar.google.com&ctz=America%2FLos_Angeles",
    addCalendarText: "Add to your calendar",
    addCalendarLink: "",
  },
  contact: {
    email: "appho.sdsu@gmail.com",
    instagram: "https://www.instagram.com/apphosdsu/",
    address: "San Diego State University, San Diego, CA",
    formTo: "mailto:appho.sdsu@gmail.com?subject=APPHO%20Inquiry",
  },
  admin: {
    password: "appho-admin", // change this
    sheetLink: "", // paste your Google Sheet link here
  },
};

// ==========================
// UI
// ==========================
function Container({ children }) {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 font-sans">{children}</div>;
}

function Logo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none">
      {site.brand.logoUrl ? (
        <img
          src={site.brand.logoUrl}
          alt="APPHO logo"
          className="h-9 w-auto object-contain hidden sm:block"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}
      <div className="text-xl font-display tracking-tight">APPHO</div>
    </div>
  );
}

function Nav({ current, setCurrent }) {
  return (
    <header className={`sticky top-0 z-40 border-b border-zinc-800 ${site.brand.headerColor} text-white`}>
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div onClick={() => setCurrent("home")}>
            <Logo />
          </div>
          <nav className="hidden gap-1 md:flex">
            {site.nav.map((item) => {
              const active = current === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setCurrent(item.key)}
                  className={`rounded-xl px-3 py-2 text-sm transition ${active ? "bg-white text-zinc-900" : "hover:bg-white/10"}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <a
            href={site.hero.ctaLink}
            className={`hidden rounded-xl px-3 py-2 text-sm font-medium md:inline-block ${site.brand.primaryColor} text-white hover:opacity-90`}
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
                  onClick={() => setCurrent(item.key)}
                  className={`rounded-lg px-2 py-1 text-xs ${active ? "bg-white text-zinc-900" : "bg-white/10"}`}
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
    <section className="bg-gradient-to-b from-black to-zinc-900 text-white py-16">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="font-display text-5xl font-semibold tracking-tight">{site.hero.headline}</h1>
            <p className="mt-3 text-lg text-zinc-200">{site.hero.sub}</p>
            <p className="mt-1 text-sm text-zinc-400">{site.year}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.hero.ctaLink}
                className={`rounded-xl px-4 py-2 ${site.brand.primaryColor} text-white font-medium hover:opacity-90`}
              >
                {site.hero.ctaText}
              </a>
              <a href="#events" className="rounded-xl px-4 py-2 bg-white/10 hover:bg-white/20">
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

function Card({ children }) {
  return <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">{children}</div>;
}

function HomeAbout() {
  return (
    <section className="py-12">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="font-display text-3xl">About</h2>
            <p className="mt-3 text-zinc-700">{site.about.blurb}</p>
            <ul className="mt-4 space-y-2 text-zinc-700 list-disc pl-5">
              {site.about.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-xl font-medium">Get started</h3>
            <div className="mt-3 grid gap-3">
              <a href={site.hero.ctaLink} className="rounded-xl border px-4 py-3 hover:bg-zinc-50">
                Membership form
              </a>
              <a href="#events" className="rounded-xl border px-4 py-3 hover:bg-zinc-50">
                See upcoming events
              </a>
            </div>
          </Card>
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
            <h2 className="font-display text-3xl">Membership</h2>
            <p className="mt-2 text-zinc-600">{site.membership.intro}</p>
            <ul className="mt-4 space-y-2 text-zinc-700 list-disc pl-5">
              {site.membership.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            {site.membership.dues?.show && (
              <p className="mt-4 rounded-lg bg-red-50 p-3 text-red-900 text-sm border border-red-200">
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
        <h3 className="font-display text-2xl">Officer / Admin</h3>
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
            <a className="underline" href={site.admin.sheetLink} target="_blank" rel="noreferrer">
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
        <h2 className="font-display text-3xl">Speakers</h2>
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
    <article className="relative p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm">
      {tag && (
        <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs rounded-full bg-red-600 text-white shadow">
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
          <a className="font-semibold text-red-700 hover:underline" href={link} target="_blank" rel="noreferrer">
            Details
          </a>
        )}
      </div>
    </article>
  );
}

function People() {
  return (
    <section className="py-12">
      <Container>
        <h2 className="font-display text-3xl">People</h2>
        <p className="mt-2 text-zinc-600">{site.people.intro}</p>
        <p className="text-xs text-zinc-500">{site.people.note}</p>
        <h3 className="mt-6 font-semibold flex items-center gap-2"><Users className="h-4 w-4" /> Officers</h3>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.people.officers.map((p, i) => (
            <Card key={i}>
              <div
                className="aspect-[4/5] w-full rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${p.photo})` }}
              />
              <div className="mt-3">
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-zinc-600">{p.role}</div>
                {p.email && (
                  <a
                    href={`mailto:${p.email}`}
                    className="mt-2 inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm hover:bg-zinc-50"
                  >
                    <Mail className="h-4 w-4" /> Email
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
        {site.people.advisors?.length ? (
          <>
            <h3 className="mt-10 font-semibold">Advisors</h3>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {site.people.advisors.map((p, i) => (
                <Card key={i}>
                  <div
                    className="aspect-[4/5] w-full rounded-xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${p.photo})` }}
                  />
                  <div className="mt-3">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-zinc-600">{p.role}</div>
                    {p.email && (
                      <a href={`mailto:${p.email}`} className="mt-2 inline-block underline text-sm">
                        {p.email}
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : null}
      </Container>
    </section>
  );
}

function Events() {
  return (
    <section id="events" className="py-12">
      <Container>
        <h2 className="font-display text-3xl">Events</h2>
        <p className="mt-2 text-zinc-600">{site.events.intro}</p>
        <div className="mt-4 overflow-hidden rounded-2xl border">
          <iframe title="Google Calendar" src={site.events.calendarSrc} style={{ border: 0 }} className="h-[720px] w-full" />
        </div>
        {site.events.addCalendarLink && (
          <a
            href={site.events.addCalendarLink}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-zinc-50"
          >
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
            <h2 className="font-display text-3xl">Contact</h2>
            <div className="mt-3 space-y-3 text-sm text-zinc-700">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a className="underline" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                <a className="underline" href={site.contact.instagram}>
                  Instagram
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" /> {site.contact.address}
              </div>
            </div>
            <a href={site.contact.formTo} className="mt-4 inline-block rounded-xl border px-4 py-2 hover:bg-zinc-50">
              Email us
            </a>
          </Card>
          <Card>
            <h3 className="text-xl font-medium">Questions about membership?</h3>
            <p className="mt-2 text-zinc-600">We will get back to you within a few days during the semester.</p>
            <a href={site.hero.ctaLink} className="mt-4 inline-block rounded-xl border px-4 py-2 hover:bg-zinc-50">
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
    <footer className="border-t bg-white py-8">
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
              <a href={`mailto:${site.contact.email}`} className="underline">
                {site.contact.email}
              </a>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              <a href={site.contact.instagram} className="underline">
                Instagram
              </a>
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

export default function ApphoSite() {
  const [current, setCurrent] = useState("home");

  const Page = useMemo(() => {
    switch (current) {
      case "membership":
        return <Membership />;
      case "speakers":
        return <Speakers />;
      case "people":
        return <People />;
      case "events":
        return <Events />;
      case "contact":
        return <Contact />;
      default:
        return (
          <>
            <Hero />
            <HomeAbout />
          </>
        );
    }
  }, [current]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <HeadStyle />
      <Nav current={current} setCurrent={setCurrent} />
      {Page}
      <Footer />
    </div>
  );
}
