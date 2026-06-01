'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  Phone, MapPin, Clock, Star, Wrench, Gauge, Bike, Truck, Snowflake, Droplets, Settings, Warehouse,
  CheckCircle2, ChevronDown, Menu, X, ShieldCheck, Sparkles, Users, Award, ArrowRight, Calendar, MessageSquare, Navigation, Mail,
  Zap, Package, Filter, Fuel, Disc, CircleDot, FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

const PHONE = '739 263 617'
const PHONE_LINK = 'tel:+420739263617'
const EMAIL = 'DaliborJekl@dalimoto.cz'
const EMAIL_LINK = 'mailto:DaliborJekl@dalimoto.cz'
const CONTACT_PERSON = 'Dalibor Jekl'
const ADDRESS_STREET = '5. května 2679'
const ADDRESS_CITY = '272 01 Kladno – Sítná'
const ADDRESS_NOTE = 'u vjezdu do garážového komplexu u GDM'
const HOURS_WEEKDAYS = 'Po–Pá 9:00–18:00'
const HOURS_NOTE = 'Po dohodě možno i mimo pracovní dobu'

const services = [
  { icon: Wrench, title: 'Kompletní přezutí pneumatik', desc: 'Osobní vozidla, dodávky i motocykly. Rychle, šetrně a profesionálně.' },
  { icon: Gauge, title: 'Vyvážení kol', desc: 'Moderní přesné vyvážení pro plynulou a bezpečnou jízdu.' },
  { icon: Bike, title: 'Pneuservis motocyklů', desc: 'Přezutí, vyvážení i kompletní montáž motocyklových kol.' },
  { icon: Truck, title: 'Pneuservis dodávek', desc: 'Kompletní servis dodávkových vozidel a užitkových aut.' },
  { icon: Snowflake, title: 'Plnění klimatizací', desc: 'Kontrola těsnosti, čištění a doplnění chladiva R134a / R1234yf.' },
  { icon: Droplets, title: 'Výměna oleje a kapalin', desc: 'Motorový olej, brzdová a chladící kapalina – vše na počkání.' },
  { icon: Settings, title: 'Drobné opravy', desc: 'Brzdy, defekty, údržba motorových vozidel a příslušenství.' },
  { icon: Warehouse, title: 'Uskladnění pneumatik', desc: 'Bezpečné sezónní uskladnění Vašich pneu v ideálních podmínkách.' },
]

const pricingCategories = [
  {
    title: 'Osobní automobily',
    icon: 'car',
    items: [
      { item: 'Komplet přezutí vč. vyvážení – kola 13"–15"', price: '750 Kč' },
      { item: 'Komplet přezutí vč. vyvážení – kola 16"', price: '850 Kč' },
      { item: 'Komplet přezutí vč. vyvážení – kola 17"', price: '950 Kč' },
      { item: 'Komplet přezutí vč. vyvážení – kola 18"', price: '1 050 Kč' },
      { item: 'Přehození kol vč. vyvážení 13"–15"', price: 'od 500 Kč' },
      { item: 'Přehození kol vč. vyvážení 16"', price: '550 Kč' },
      { item: 'Přehození kol vč. vyvážení 17"', price: '600 Kč' },
      { item: 'Přehození kol vč. vyvážení 18"', price: '650 Kč' },
    ],
  },
  {
    title: 'Dodávky',
    icon: 'van',
    items: [
      { item: 'Komplet přezutí dodávky vč. vyvážení', price: 'od 1 250 Kč' },
      { item: 'Komplet přehození pneu dodávky vč. vyvážení', price: 'od 750 Kč' },
    ],
  },
  {
    title: 'Motocykly',
    icon: 'moto',
    items: [
      { item: 'Přezutí motocyklu (1 kolo) vč. vyvážení', price: 'od 250 Kč' },
      { item: 'Přezutí motocyklu vč. montáže (1 kolo) vč. vyvážení', price: 'od 450 Kč' },
    ],
  },
  {
    title: 'Drobné úkony',
    icon: 'tool',
    items: [
      { item: 'Vyvážení kola', price: '50 Kč' },
      { item: 'Demontáž kola', price: '50 Kč' },
      { item: 'Montáž kola', price: '50 Kč' },
      { item: 'Zutí kola', price: '50 Kč' },
      { item: 'Nazutí kola', price: '50 Kč' },
      { item: 'Oprava defektu', price: '300 Kč' },
      { item: 'Přetěsnění disku', price: '25 Kč' },
      { item: 'Broušení disku', price: '25 Kč' },
      { item: 'Ventilek (1 ks)', price: '25 Kč' },
      { item: 'Lepené závaží 5 g', price: '4 Kč' },
    ],
  },
]

const products = [
  { icon: Package, title: 'Použité díly', desc: 'Pečlivě prověřené použité díly za výhodné ceny.' },
  { icon: Fuel, title: 'Motocyklové oleje MOTUL', desc: 'Špičkové motocyklové oleje značky MOTUL skladem.' },
  { icon: Droplets, title: 'Motorové oleje AUTO', desc: 'Široký výběr motorových olejů pro osobní vozy.' },
  { icon: Filter, title: 'Filtry', desc: 'Olejové, vzduchové, palivové i kabinové filtry.' },
]

const whyUs = [
  { icon: Star, title: '4,8★ hodnocení', desc: '46+ spokojených recenzí na Googlu.' },
  { icon: Calendar, title: 'Rychlé objednání', desc: 'Termín obvykle do několika dní.' },
  { icon: ShieldCheck, title: 'Férové ceny', desc: 'Bez skrytých poplatků a překvapení.' },
  { icon: Award, title: 'Zkušený servis', desc: 'Dlouholeté zkušenosti a kvalitní práce.' },
  { icon: Users, title: 'Osobní přístup', desc: 'Individuální řešení pro každého klienta.' },
  { icon: Sparkles, title: 'Kvalitní vybavení', desc: 'Moderní stroje a profesionální nástroje.' },
  { icon: Bike, title: 'Moto i auto', desc: 'Osobní vozy, dodávky i motocykly.' },
  { icon: MapPin, title: 'Kladno a okolí', desc: 'Snadno dostupné, blízko centra.' },
]

const reviews = [
  { name: 'Petr Novák', rating: 5, text: 'Skvělý pneuservis, přezuli mi auto na počkání a za super cenu. Vstřícný přístup, určitě se sem vrátím.' },
  { name: 'Jana Svobodová', rating: 5, text: 'Rychlé objednání i samotné přezutí. Kluci jsou profíci, vysvětlí, co a proč dělají. Doporučuji všem v Kladně.' },
  { name: 'Martin Dvořák', rating: 5, text: 'Vyvážili mi kola perfektně, auto jede jako po másle. Cena férová, atmosféra přátelská.' },
  { name: 'Tomáš Procházka', rating: 5, text: 'Pneuservis na motorku v Kladně je vzácnost. DaliMoto to umí výborně, hotovo bylo do hodiny.' },
  { name: 'Lucie Veselá', rating: 4, text: 'Spokojenost. Plnili mi klimu, funguje skvěle. Termín jsem dostala hned další den.' },
  { name: 'Jakub Horák', rating: 5, text: 'Drobnou opravu zvládli rychle a kvalitně. Konečně servis, kde se cítím dobře. Doporučuji.' },
]

const processSteps = [
  { n: '01', title: 'Zavoláte nebo napíšete e-mail', desc: 'Stačí krátký telefon, e-mail nebo online formulář. Objednání NONSTOP.' },
  { n: '02', title: 'Domluvíme termín', desc: 'Najdeme co nejrychlejší volný termín – potvrdíme zpětnou zprávou.' },
  { n: '03', title: 'Přijedete do servisu', desc: '5. května 2679, Kladno-Sítná (u vjezdu do garážového komplexu u GDM).' },
  { n: '04', title: 'Provedeme servis', desc: 'Na počkání nebo dle dohody, vč. uskladnění pneu do další sezóny.' },
]

const faqs = [
  { q: 'Jak dlouho trvá přezutí?', a: 'Standardní přezutí osobního vozu zabere zhruba 30–45 minut. V sezóně doporučujeme rezervovat termín předem.' },
  { q: 'Musím se objednat?', a: 'Doporučujeme objednání telefonem nebo formulářem. V hlavní sezóně je objednání nutné, mimo sezónu často zvládneme i bez objednání.' },
  { q: 'Přezouváte i motocykly?', a: 'Ano, pneuservis motocyklů je naší specialitou. Provádíme přezutí, vyvážení i opravy defektů na motocyklových kolech.' },
  { q: 'Provádíte plnění klimatizací?', a: 'Ano, kontrolu těsnosti, čištění i doplnění chladiva. Klimatizaci doporučujeme servisovat každé 2 roky.' },
  { q: 'Lze uskladnit pneumatiky?', a: 'Samozřejmě. Nabízíme bezpečné sezónní uskladnění pneumatik v ideálních podmínkách. Cenu vám rádi sdělíme po telefonu.' },
]

const heroImg = 'https://images.unsplash.com/photo-1655198739321-edc210858ab5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHw0fHx0aXJlJTIwc2VydmljZXxlbnwwfHx8YmxhY2t8MTc4MDM1Njk1Mnww&ixlib=rb-4.1.0&q=85'
const img2 = 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwzfHxjYXIlMjByZXBhaXJ8ZW58MHx8fGJsYWNrfDE3ODAzNTY5NjN8MA&ixlib=rb-4.1.0&q=85'
const img3 = 'https://images.unsplash.com/photo-1613214036979-1c6a7e0cf677?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwyfHx0aXJlJTIwc2VydmljZXxlbnwwfHx8YmxhY2t8MTc4MDM1Njk1Mnww&ixlib=rb-4.1.0&q=85'
const img4 = 'https://images.unsplash.com/photo-1609511583488-e13c95c04aa0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwzfHxtZWNoYW5pYyUyMHdoZWVsfGVufDB8fHxibGFja3wxNzgwMzU2OTUyfDA&ixlib=rb-4.1.0&q=85'

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [
    { href: '#sluzby', label: 'Služby' },
    { href: '#cenik', label: 'Ceník' },
    { href: '#proc-my', label: 'Proč my' },
    { href: '#recenze', label: 'Recenze' },
    { href: '#faq', label: 'FAQ' },
    { href: '#kontakt', label: 'Kontakt' },
  ]
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#070b18]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 lg:h-20 items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 grid place-items-center shadow-lg shadow-orange-500/20">
            <Wrench className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight">DaliMoto</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-orange-400/90">Pneuservis Kladno</span>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/70 hover:text-white transition-colors">{l.label}</a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a href={PHONE_LINK} className="flex items-center gap-2 text-sm font-semibold text-white hover:text-orange-400 transition">
            <Phone className="h-4 w-4 text-orange-400" /> {PHONE}
          </a>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20">
            <a href="#kontakt">Objednat termín</a>
          </Button>
        </div>
        <button className="lg:hidden p-2 text-white" onClick={() => setOpen(v => !v)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden bg-[#070b18]/95 backdrop-blur-md border-t border-white/5">
            <div className="px-6 py-4 flex flex-col gap-3">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-base font-medium text-white/80 hover:text-orange-400">{l.label}</a>
              ))}
              <a href={PHONE_LINK} className="flex items-center gap-2 py-2 text-base font-semibold text-orange-400">
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white w-full mt-2">
                <a href="#kontakt" onClick={() => setOpen(false)}>Objednat termín</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Pneuservis DaliMoto Kladno" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b18] via-[#070b18]/85 to-[#070b18]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b18] via-transparent to-transparent" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-wrap items-center gap-2 mb-6">
            <Badge className="bg-orange-500/15 text-orange-400 border border-orange-500/30 px-3 py-1 hover:bg-orange-500/20">
              <Star className="h-3 w-3 mr-1.5 fill-orange-400" /> 4,8/5 · 46+ recenzí na Google
            </Badge>
            <Badge className="bg-green-500/15 text-green-400 border border-green-500/30 px-3 py-1 hover:bg-green-500/20">
              <Zap className="h-3 w-3 mr-1.5 fill-green-400" /> Objednání NONSTOP
            </Badge>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-balance">
            Profesionální{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">pneuservis</span>
            </span>{' '}
            v Kladně bez zbytečného čekání
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
            Kompletní pneuservis, přezutí, vyvážení kol, plnění klimatizací a drobné opravy vozidel. Osobní vozy, dodávky i motocykly.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-base h-14 px-7 shadow-xl shadow-orange-500/25">
              <a href="#kontakt"><Calendar className="h-5 w-5 mr-2" /> Objednat termín</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-7 text-base bg-white/5 hover:bg-white/10 border-white/20 text-white">
              <a href={PHONE_LINK}><Phone className="h-5 w-5 mr-2" /> Zavolat nyní</a>
            </Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href={PHONE_LINK} className="flex items-center gap-3 group">
              <div className="h-12 w-12 rounded-full bg-orange-500/15 grid place-items-center border border-orange-500/30 group-hover:bg-orange-500/25 transition">
                <Phone className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Zavolejte nám</div>
                <div className="text-xl font-bold text-white group-hover:text-orange-400 transition">{PHONE}</div>
              </div>
            </a>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Clock className="h-4 w-4 text-orange-400" />
              {HOURS_WEEKDAYS} · {HOURS_NOTE}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-[#070b18]/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {[
            { n: '4,8★', l: 'Google hodnocení' },
            { n: '46+', l: 'Spokojených recenzí' },
            { n: '10+', l: 'Let zkušeností' },
            { n: '100%', l: 'Férové ceny' },
          ].map((s, i) => (
            <div key={i} className="py-5 px-4 text-center">
              <div className="text-2xl lg:text-3xl font-bold text-white">{s.n}</div>
              <div className="text-xs lg:text-sm text-white/60 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, desc }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5 }} className="max-w-3xl mb-12 lg:mb-16">
      {eyebrow && <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400 mb-3">{eyebrow}</div>}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">{title}</h2>
      {desc && <p className="mt-4 text-lg text-white/65 leading-relaxed">{desc}</p>}
    </motion.div>
  )
}

function Services() {
  return (
    <section id="sluzby" className="relative py-24 lg:py-32 bg-[#070b18]">
      <div className="absolute inset-0 bg-radial-orange opacity-50" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader eyebrow="Naše služby" title="Kompletní pneuservis a autoservis pod jednou střechou" desc="Specializujeme se na rychlý a profesionální servis osobních vozů, dodávek i motocyklů. Vše s férovou cenou a osobním přístupem." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Card className="group h-full bg-white/[0.03] border-white/10 hover:border-orange-500/40 hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/20 grid place-items-center mb-5 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
                    <s.icon className="h-6 w-6 text-orange-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const [activeTab, setActiveTab] = useState(0)
  const cat = pricingCategories[activeTab]
  return (
    <section id="cenik" className="relative py-24 lg:py-32 bg-gradient-to-b from-[#070b18] to-[#0a1027]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Kompletní ceník" title="Transparentní ceny bez skrytých poplatků" desc="Kompletní orientační ceník přímo z naší dílny. U elektronových kol se navíc účtuje lepené závaží. Konečnou cenu Vám vždy předem potvrdíme." />
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                <a href={PHONE_LINK}><Phone className="h-4 w-4 mr-2" /> Vyžádat cenu</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/5 border-white/15 hover:bg-white/10">
                <a href="#kontakt">Online formulář</a>
              </Button>
            </div>
            <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-white/75 leading-relaxed">
                <strong className="text-white">Tip:</strong> U přezutí kompletních kol vč. vyvážení je v ceně i nazutí, zutí, demontáž a montáž. Lepené závaží je účtováno zvlášť pouze u elektronových kol.
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-2 mb-4">
              {pricingCategories.map((c, i) => (
                <button
                  key={c.title}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                    activeTab === i
                      ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20'
                      : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden backdrop-blur-sm">
              <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
                <div className="text-sm font-semibold uppercase tracking-wider text-white/80">{cat.title}</div>
                <div className="text-sm font-semibold uppercase tracking-wider text-orange-400">Cena</div>
              </div>
              <ul className="divide-y divide-white/5">
                {cat.items.map((p) => (
                  <li key={p.item} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group gap-4">
                    <span className="text-white/85 group-hover:text-white text-sm sm:text-base">{p.item}</span>
                    <span className="text-orange-400 font-bold tabular-nums whitespace-nowrap">{p.price}</span>
                  </li>
                ))}
              </ul>
              <div className="px-6 py-4 border-t border-white/10 bg-orange-500/5 flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-white/70 leading-relaxed">Cena se může lišit podle typu vozidla a použitých materiálů. U elektronových kol se navíc účtuje lepené závaží.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Products() {
  return (
    <section id="produkty" className="relative py-24 lg:py-32 bg-[#070b18]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Náš sortiment" title="Prodej náhradních dílů, olejů a filtrů" desc="Kromě servisních služeb u nás zakoupíte i kvalitní spotřební díly a oleje pro Váš automobil i motocykl. Vše skladem nebo na objednávku." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Card className="group h-full bg-white/[0.03] border-white/10 hover:border-orange-500/40 hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/20 grid place-items-center mb-5 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
                    <p.icon className="h-6 w-6 text-orange-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-r from-orange-500/10 to-orange-600/5 p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-orange-500/20 border border-orange-500/30 grid place-items-center flex-shrink-0">
              <MessageSquare className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <div className="text-lg font-semibold text-white mb-1">Dotaz na prodejce</div>
              <p className="text-sm text-white/70 leading-relaxed max-w-2xl">Potřebujete poradit nebo zjistit cenu zboží či služby? Napište nám e-mail – obratem se Vám ozveme s nabídkou a potvrzením termínu.</p>
            </div>
          </div>
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 whitespace-nowrap">
            <a href={EMAIL_LINK}><Mail className="h-4 w-4 mr-2" /> Napsat e-mail</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

function WhyUs() {
  return (
    <section id="proc-my" className="relative py-24 lg:py-32 bg-[#0a1027]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Proč si vybrat DaliMoto" title="Servis, kterému můžete věřit" desc="Desítky spokojených zákazníků měsíčně si nevybírají náhodou. Tady je důvod, proč." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {whyUs.map((w, i) => (
            <motion.div key={w.title} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }} className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-orange-500/40 hover:bg-white/[0.04] transition-all">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 grid place-items-center flex-shrink-0">
                  <w.icon className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">{w.title}</div>
                  <div className="text-sm text-white/60 leading-relaxed">{w.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section id="recenze" className="relative py-24 lg:py-32 bg-[#070b18]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionHeader eyebrow="Recenze zákazníků" title="Co o nás říkají naši klienti" desc={null} />
          <div className="flex items-center gap-3 mb-12 lg:mb-16">
            <div className="flex">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-orange-400 text-orange-400" />)}
            </div>
            <div className="text-white"><span className="font-bold">4,8/5</span> · 46+ recenzí</div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Card className="h-full bg-white/[0.03] border-white/10 hover:border-orange-500/30 transition">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {Array.from({ length: r.rating }).map((_, idx) => <Star key={idx} className="h-4 w-4 fill-orange-400 text-orange-400" />)}
                    {Array.from({ length: 5 - r.rating }).map((_, idx) => <Star key={`e${idx}`} className="h-4 w-4 text-white/20" />)}
                  </div>
                  <p className="text-white/80 leading-relaxed mb-5">„{r.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 grid place-items-center text-white font-semibold">
                      {r.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{r.name}</div>
                      <div className="text-xs text-white/50">Spokojený zákazník</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[#070b18] to-[#0a1027] overflow-hidden">
      <div className="absolute inset-0 bg-radial-orange opacity-40" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader eyebrow="Jak probíhá návštěva" title="Jednoduchý proces ve 4 krocích" desc="Od telefonu k hotové práci. Žádné zbytečné komplikace." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {processSteps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="relative">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 h-full hover:border-orange-500/40 transition">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-5xl font-bold bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent">{s.n}</span>
                  {i < processSteps.length - 1 && <ArrowRight className="h-5 w-5 text-white/20 hidden lg:block" />}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-[#0a1027]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Časté otázky" title="Odpovědi na to, co vás zajímá" desc="Nenašli jste odpověď? Zavolejte nám, rádi vám poradíme." />
            <Button asChild className="bg-orange-500 hover:bg-orange-600">
              <a href={PHONE_LINK}><Phone className="h-4 w-4 mr-2" /> {PHONE}</a>
            </Button>
          </div>
          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 rounded-xl bg-white/[0.03] px-5 data-[state=open]:border-orange-500/30">
                  <AccordionTrigger className="text-left text-white hover:no-underline py-5 font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-white/70 pb-5 leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [loading, setLoading] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Vyplňte prosím jméno a telefon.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Chyba odeslání')
      toast.success('Děkujeme! Brzy se vám ozveme.')
      setForm({ name: '', phone: '', email: '', service: '', message: '' })
    } catch (err) {
      toast.error(err.message || 'Něco se pokazilo.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:p-8">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-white/80 text-sm mb-2 block">Jméno *</Label>
          <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Vaše jméno" className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-11" required />
        </div>
        <div>
          <Label className="text-white/80 text-sm mb-2 block">Telefon *</Label>
          <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+420 ..." className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-11" required />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-white/80 text-sm mb-2 block">E-mail</Label>
          <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="vas@email.cz" className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-11" />
        </div>
        <div>
          <Label className="text-white/80 text-sm mb-2 block">Služba</Label>
          <Input value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} placeholder="Přezutí, klima, ..." className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-11" />
        </div>
      </div>
      <div>
        <Label className="text-white/80 text-sm mb-2 block">Zpráva</Label>
        <Textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} placeholder="Sdělte nám prosím model vozu, velikost kol a preferovaný termín." className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
      </div>
      <Button type="submit" disabled={loading} className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base">
        {loading ? 'Odesílám...' : (<><MessageSquare className="h-4 w-4 mr-2" /> Odeslat poptávku</>)}
      </Button>
      <p className="text-xs text-white/50 text-center">Odesláním souhlasíte se zpracováním osobních údajů pro účely vyřízení poptávky.</p>
    </form>
  )
}

function Contact() {
  return (
    <section id="kontakt" className="relative py-24 lg:py-32 bg-[#070b18]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Kontakt" title="Domluvte si termín už dnes" desc="Zavolejte, napište nebo se zastavte. Najdete nás v Kladně – Kročehlavech." />
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <a href={PHONE_LINK} className="flex items-start gap-4 group">
                  <div className="h-11 w-11 rounded-lg bg-orange-500/15 border border-orange-500/30 grid place-items-center flex-shrink-0 group-hover:bg-orange-500 transition">
                    <Phone className="h-5 w-5 text-orange-400 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase text-white/50 tracking-wider mb-1">Telefon</div>
                    <div className="font-bold text-white group-hover:text-orange-400 transition">{PHONE}</div>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-lg bg-orange-500/15 border border-orange-500/30 grid place-items-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-xs uppercase text-white/50 tracking-wider mb-1">Adresa</div>
                    <div className="font-bold text-white leading-tight">5. května 2679<br/>272 01 Kladno – Kročehlavy</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-lg bg-orange-500/15 border border-orange-500/30 grid place-items-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-xs uppercase text-white/50 tracking-wider mb-1">Otevírací doba</div>
                    <div className="text-white text-sm">
                      <div>Po–Pá <span className="font-semibold">8:00–17:00</span></div>
                      <div>So <span className="font-semibold">8:00–12:00</span></div>
                    </div>
                  </div>
                </div>
                <a href="https://www.google.com/maps/dir/?api=1&destination=DaliMoto+5.+května+2679+Kladno" target="_blank" rel="noopener" className="flex items-start gap-4 group">
                  <div className="h-11 w-11 rounded-lg bg-orange-500/15 border border-orange-500/30 grid place-items-center flex-shrink-0 group-hover:bg-orange-500 transition">
                    <Navigation className="h-5 w-5 text-orange-400 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase text-white/50 tracking-wider mb-1">Navigovat</div>
                    <div className="font-bold text-white group-hover:text-orange-400 transition">Otevřít v mapách</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 h-[320px] lg:h-[400px]">
              <iframe
                title="DaliMoto Kladno mapa"
                src="https://maps.google.com/maps?q=5.%20kv%C4%9Btna%202679%2C%20272%2001%20Kladno&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.3) invert(0.92) hue-rotate(180deg)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#04060f] border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 grid place-items-center">
                <Wrench className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-xl font-bold">DaliMoto</div>
                <div className="text-xs uppercase tracking-widest text-orange-400/80">Pneuservis Kladno</div>
              </div>
            </div>
            <p className="text-white/60 max-w-md leading-relaxed">Profesionální pneuservis a autoservis v Kladně. Osobní vozy, dodávky i motocykly. Rychlé termíny, férové ceny, kvalitní práce.</p>
          </div>
          <div>
            <div className="font-semibold text-white mb-4">Služby</div>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#sluzby" className="hover:text-orange-400">Přezutí pneumatik</a></li>
              <li><a href="#sluzby" className="hover:text-orange-400">Vyvážení kol</a></li>
              <li><a href="#sluzby" className="hover:text-orange-400">Pneuservis motocyklů</a></li>
              <li><a href="#sluzby" className="hover:text-orange-400">Plnění klimatizací</a></li>
              <li><a href="#sluzby" className="hover:text-orange-400">Výměna oleje</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white mb-4">Kontakt</div>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange-400" /><a href={PHONE_LINK} className="hover:text-orange-400">{PHONE}</a></li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-orange-400 mt-0.5" /><span>5. května 2679<br/>272 01 Kladno</span></li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-orange-400" />Po–Pá 8–17 · So 8–12</li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <div>© {new Date().getFullYear()} DaliMoto. Všechna práva vyhrazena.</div>
          <div>Pneuservis Kladno · Autoservis Kladno · Přezutí pneumatik</div>
        </div>
      </div>
    </footer>
  )
}

function CookieBanner() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    try {
      if (!localStorage.getItem('dalimoto-cookies')) setShow(true)
    } catch {}
  }, [])
  const accept = () => {
    try { localStorage.setItem('dalimoto-cookies', '1') } catch {}
    setShow(false)
  }
  if (!show) return null
  return (
    <div className="fixed bottom-4 inset-x-4 sm:left-auto sm:right-4 sm:max-w-sm z-50">
      <div className="rounded-xl border border-white/10 bg-[#070b18]/95 backdrop-blur-md p-5 shadow-2xl">
        <div className="flex items-start gap-3 mb-3">
          <ShieldCheck className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-white mb-1">Cookies & soukromí</div>
            <p className="text-xs text-white/65 leading-relaxed">Používáme nezbytné cookies pro správné fungování webu. Pokračováním souhlasíte s jejich použitím.</p>
          </div>
        </div>
        <Button onClick={accept} className="w-full h-9 bg-orange-500 hover:bg-orange-600">Rozumím</Button>
      </div>
    </div>
  )
}

function StickyCallButton() {
  return (
    <a href={PHONE_LINK} className="lg:hidden fixed bottom-4 left-4 right-4 z-40 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-2xl shadow-orange-500/40 flex items-center justify-center gap-2">
      <Phone className="h-5 w-5" /> Zavolat {PHONE}
    </a>
  )
}

function App() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Services />
      <Pricing />
      <WhyUs />
      <Reviews />
      <Process />
      <FAQSection />
      <Contact />
      <Footer />
      <CookieBanner />
      <StickyCallButton />
    </main>
  )
}

export default App
