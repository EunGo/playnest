import { useMemo, useState } from 'react'
import {
  Baby,
  CalendarDays,
  ChevronLeft,
  Check,
  ChevronRight,
  Filter,
  GraduationCap,
  HeartHandshake,
  Home,
  Languages,
  MapPin,
  MessageCircle,
  Plus,
  Search,
  ShieldCheck,
  Star,
  Trees,
  UserRound,
} from 'lucide-react'
import './App.css'

type Section = 'discover' | 'calendar' | 'match' | 'care' | 'community' | 'settings'

type Place = {
  name: string
  category: string
  distance: string
  area: string
  rating: string
  ageGroup: string
  languages: string[]
  features: string[]
  image: string
}

const places: Place[] = [
  {
    name: 'Little Harbour Playroom',
    category: 'Indoor play area',
    distance: '0.6 km',
    area: 'Jordaan',
    rating: '4.8',
    ageGroup: '0-4 years',
    languages: ['English', 'Korean', 'Dutch'],
    features: ['Stroller space', 'Baby corner', 'Coffee nearby'],
    image: '/place-playroom.svg',
  },
  {
    name: 'Sunny Steps Garden',
    category: 'Toddler park',
    distance: '1.1 km',
    area: 'Westerpark',
    rating: '4.7',
    ageGroup: '1-7 years',
    languages: ['English', 'Spanish', 'Dutch'],
    features: ['Fenced', 'Shade', 'Sand play'],
    image: '/place-park.svg',
  },
  {
    name: 'Tiny Makers Studio',
    category: 'Creative lessons',
    distance: '1.8 km',
    area: 'De Pijp',
    rating: '4.9',
    ageGroup: '2-7 years',
    languages: ['English', 'French'],
    features: ['Trial class', 'Small groups', 'Mess-friendly'],
    image: '/place-studio.svg',
  },
]

const matches = [
  {
    family: 'Mina, Joon and baby Ari',
    fit: '94%',
    neighborhood: 'Jordaan',
    childAge: '2y 3m',
    languages: ['Korean', 'English'],
    availability: 'Tue mornings, Sat afternoon',
    interests: ['Water play', 'Picture books', 'Quiet cafes'],
  },
  {
    family: 'Sam, Noor and toddler Leo',
    fit: '88%',
    neighborhood: 'Oud-West',
    childAge: '18m',
    languages: ['English', 'Arabic'],
    availability: 'Wed afternoon, Sun morning',
    interests: ['Music class', 'Parks', 'Snack swaps'],
  },
  {
    family: 'Clara, Ben and twins Mila & Theo',
    fit: '82%',
    neighborhood: 'De Pijp',
    childAge: '3y',
    languages: ['English', 'German'],
    availability: 'Fri morning',
    interests: ['Art', 'Play kitchens', 'Nature walks'],
  },
]

const weekEvents = [
  { day: 'Mon', date: '19', title: 'Open play at Little Harbour', time: '10:00', type: 'Registered', signups: 12 },
  { day: 'Tue', date: '20', title: 'Language match: Korean + English', time: '09:30', type: 'Suggested', signups: 8 },
  { day: 'Wed', date: '21', title: 'Music lesson trial', time: '15:00', type: 'Lesson', signups: 6 },
  { day: 'Thu', date: '22', title: 'Parent tips circle', time: '20:30', type: 'Chat', signups: 15 },
  { day: 'Fri', date: '23', title: 'Tiny Makers group registration', time: '11:00', type: 'Group', signups: 9 },
  { day: 'Sat', date: '24', title: 'Weekend park meetup', time: '10:30', type: 'Suggested', signups: 11 },
]

const eventDateKeys = new Set(['2026-08-19', '2026-08-20', '2026-08-21', '2026-08-22', '2026-08-23', '2026-08-24'])
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const careProviders = [
  { name: 'Nora V.', role: 'Qualified nanny', checks: 'ID, CPR, 8 references', focus: 'Babies and bilingual routines' },
  { name: 'Marta Studio', role: 'Toddler art teacher', checks: 'Verified studio, trial class', focus: 'Ages 2-7, sensory-safe materials' },
  { name: 'Kindermusik West', role: 'Music lesson', checks: 'Licensed instructor', focus: 'Small-group rhythm sessions' },
]

const channels = [
  { name: 'New in the city', count: '128 parents', topic: 'Settling in, documents, doctors' },
  { name: 'Under-2 sleep and feeding', count: '84 parents', topic: 'Gentle tips and local product finds' },
  { name: 'Weekend playdates', count: '213 parents', topic: 'Open invites and family-friendly routes' },
]

const playList = ['Rainy-day indoor play', 'First museum morning', 'Low-noise cafe meetups', 'Park snack picnic']

const filters = ['Under 1 km', '0-7 years', 'English', 'Indoor', 'Stroller-friendly']

function App() {
  const [activeSection, setActiveSection] = useState<Section>('discover')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [showRegisteredOnly, setShowRegisteredOnly] = useState(false)
  const shouldShowSearch = activeSection === 'discover' || activeSection === 'community'

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => place.languages.includes(selectedLanguage))
  }, [selectedLanguage])

  const visibleEvents = showRegisteredOnly
    ? weekEvents.filter((event) => event.type === 'Registered' || event.type === 'Group')
    : weekEvents

  const navigation = [
    { id: 'discover', label: 'Around me', icon: MapPin },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays },
    { id: 'match', label: 'Matching', icon: HeartHandshake },
    { id: 'care', label: 'Nannies & lessons', icon: ShieldCheck },
    { id: 'community', label: 'Forum & chat', icon: MessageCircle },
  ] as const

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="brand-mark">
          <span className="brand-icon" aria-hidden="true">
            <span className="logo-letter">P</span>
            <span className="logo-dot"></span>
          </span>
          <div>
            <strong>PlayNest</strong>
            <span>for families under pre-schooler</span>
          </div>
        </div>

        <button
          aria-label="Open profile settings"
          className={activeSection === 'settings' ? 'profile-button active' : 'profile-button'}
          onClick={() => setActiveSection('settings')}
          type="button"
        >
          <UserRound size={20} aria-hidden="true" />
        </button>
      </header>

      <section className="main-area">
        <header className="topbar">
          <div>
            <p className="eyebrow">Amsterdam, nearby now</p>
            <h1>{sectionTitle(activeSection)}</h1>
          </div>
          {shouldShowSearch && (
            <label className="search-box">
              <Search size={18} aria-hidden="true" />
              <input aria-label="Search" placeholder="Search play areas, parents, tips" />
            </label>
          )}
        </header>

        {activeSection === 'discover' && (
          <DiscoverSection
            filteredPlaces={filteredPlaces}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        )}

        {activeSection === 'calendar' && (
          <CalendarSection
            showRegisteredOnly={showRegisteredOnly}
            setShowRegisteredOnly={setShowRegisteredOnly}
            visibleEvents={visibleEvents}
          />
        )}

        {activeSection === 'match' && <MatchingSection selectedLanguage={selectedLanguage} />}

        {activeSection === 'care' && <CareSection />}

        {activeSection === 'community' && <CommunitySection />}

        {activeSection === 'settings' && <SettingsSection selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />}
      </section>

      <nav className="bottom-nav" aria-label="Primary navigation">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <button
              className={activeSection === item.id ? 'bottom-nav-item active' : 'bottom-nav-item'}
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              type="button"
            >
              <Icon size={20} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </main>
  )
}

function sectionTitle(section: Section) {
  const titles: Record<Section, string> = {
    discover: 'Find nearby child-friendly places',
    calendar: 'Plan your next playdate',
    match: 'Meet compatible families',
    care: 'Find trusted support',
    community: 'Ask, share, and feel less alone',
    settings: 'Your family settings',
  }

  return titles[section]
}

function DiscoverSection({
  filteredPlaces,
  selectedLanguage,
  setSelectedLanguage,
}: {
  filteredPlaces: Place[]
  selectedLanguage: string
  setSelectedLanguage: (language: string) => void
}) {
  return (
    <div className="content-grid discover-grid">
      <section className="map-surface" aria-label="Locations around me">
        <div className="map-toolbar">
          <span><Home size={16} aria-hidden="true" /> Prinsengracht 263</span>
          <button type="button"><Filter size={16} aria-hidden="true" /> Filters</button>
        </div>
        <div className="map-visual">
          <iframe
            title="Google map around Prinsengracht 263"
            src="https://www.google.com/maps?q=Prinsengracht%20263%2C%20Amsterdam&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map-marker-layer" aria-label="Nearby map markers">
            <span className="pin pin-one" aria-label="Play"><Baby size={18} aria-hidden="true" /></span>
            <span className="pin pin-two" aria-label="Park"><Trees size={18} aria-hidden="true" /></span>
            <span className="pin pin-three" aria-label="Class"><GraduationCap size={18} aria-hidden="true" /></span>
          </div>
        </div>
        <div className="filter-row" aria-label="Active filters">
          {filters.map((filter) => <button key={filter} type="button">{filter}</button>)}
        </div>
      </section>

      <section className="panel-column" aria-label="Nearby spaces">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Kids-friendly spaces and play areas</p>
            <h2>Best fits near you</h2>
          </div>
          <select value={selectedLanguage} onChange={(event) => setSelectedLanguage(event.target.value)} aria-label="Language filter">
            <option>English</option>
            <option>Korean</option>
            <option>Dutch</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </div>

        <div className="place-list">
          {filteredPlaces.map((place) => (
            <article className="place-card" key={place.name}>
              <img src={place.image} alt={`${place.name} preview`} />
              <div>
                <div className="place-title-row">
                  <h3>{place.name}</h3>
                  <span><Star size={14} aria-hidden="true" /> {place.rating}</span>
                </div>
                <p>{place.category} · {place.area} · {place.distance}</p>
                <div className="tag-row">
                  <span>{place.ageGroup}</span>
                  {place.features.slice(0, 2).map((feature) => <span key={feature}>{feature}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function CalendarSection({
  showRegisteredOnly,
  setShowRegisteredOnly,
  visibleEvents,
}: {
  showRegisteredOnly: boolean
  setShowRegisteredOnly: (showRegisteredOnly: boolean) => void
  visibleEvents: typeof weekEvents
}) {
  const [visibleMonth, setVisibleMonth] = useState(new Date(2026, 7, 1))
  const month = visibleMonth.getMonth()
  const year = visibleMonth.getFullYear()
  const monthLabel = visibleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const monthStartOffset = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthDays = Array.from({ length: daysInMonth }, (_, index) => index + 1)

  const changeMonth = (offset: number) => {
    setVisibleMonth((currentMonth) => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1))
  }

  const dateKey = (day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  return (
    <div className="content-grid">
      <section className="panel-column wide-panel">
        <div className="section-heading calendar-heading">
          <div>
            <p className="eyebrow">Date calendar</p>
            <h2>This week</h2>
          </div>
          <label className="toggle-control">
            <input type="checkbox" checked={showRegisteredOnly} onChange={(event) => setShowRegisteredOnly(event.target.checked)} />
            <span>Registered only</span>
          </label>
        </div>

        <section className="month-calendar" aria-label={`${monthLabel} monthly calendar`}>
          <div className="month-calendar-header">
            <button type="button" aria-label="Browse previous month" onClick={() => changeMonth(-1)}>
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <h3>{monthLabel}</h3>
            <span>{visibleEvents.length} plans shown</span>
            <button type="button" aria-label="Browse next month" onClick={() => changeMonth(1)}>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
          <div className="month-weekdays" aria-hidden="true">
            {weekDays.map((day) => <span key={day}>{day}</span>)}
          </div>
          <div className="month-grid">
            {Array.from({ length: monthStartOffset }, (_, index) => <span className="calendar-spacer" key={`spacer-${index}`}></span>)}
            {monthDays.map((day) => (
              <time
                className={dateKey(day) === '2026-08-19' ? 'month-day today' : eventDateKeys.has(dateKey(day)) ? 'month-day has-event' : 'month-day'}
                dateTime={dateKey(day)}
                key={day}
              >
                <span>{day}</span>
              </time>
            ))}
          </div>
        </section>

        <div className="calendar-list">
          {visibleEvents.map((event) => (
            <article className="event-card" key={`${event.day}-${event.title}`}>
              <time dateTime={`2026-08-${event.date}`}>
                <strong>{event.day}</strong>
                <span>{event.date}</span>
              </time>
              <div>
                <h3>{event.title}</h3>
                <p>{event.time} · {event.type}</p>
                <span className="event-signups">
                  {event.signups} kids are coming
                </span>
              </div>
              <button type="button" aria-label={`Open ${event.title}`}><ChevronRight size={20} aria-hidden="true" /></button>
            </article>
          ))}
        </div>
        <div className="load-more-row">
          <button type="button">Load more</button>
        </div>
      </section>

      <section className="panel-column">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Group registration</p>
            <h2>Small groups open</h2>
          </div>
        </div>
        <div className="registration-list">
          <button type="button">Friday sensory play · 3 spots</button>
          <button type="button">Weekend expat meetup · 6 spots</button>
          <button type="button">Toddler music trial · 2 spots</button>
        </div>
      </section>
    </div>
  )
}

function MatchingSection({ selectedLanguage }: { selectedLanguage: string }) {
  return (
    <div className="content-grid">
      <section className="panel-column wide-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Playdate matching</p>
            <h2>Families with similar rhythms</h2>
          </div>
          <span className="language-pill"><Languages size={16} aria-hidden="true" /> {selectedLanguage}</span>
        </div>
        <div className="match-list">
          {matches.map((match) => (
            <article className="match-card" key={match.family}>
              <div className="avatar-stack" aria-hidden="true"><span></span><span></span></div>
              <div>
                <div className="place-title-row">
                  <h3>{match.family}</h3>
                  <span>{match.fit} fit</span>
                </div>
                <p>{match.childAge} · {match.neighborhood} · {match.availability}</p>
                <div className="tag-row">
                  {match.languages.map((language) => <span key={language}>{language}</span>)}
                  {match.interests.slice(0, 2).map((interest) => <span key={interest}>{interest}</span>)}
                </div>
              </div>
              <button className="icon-button" type="button" aria-label={`Invite ${match.family}`}><HeartHandshake size={20} aria-hidden="true" /></button>
            </article>
          ))}
        </div>
      </section>

      <section className="panel-column">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Playdate preference</p>
            <h2>Matching priorities</h2>
          </div>
        </div>
        <div className="preference-list">
          <label><input type="checkbox" defaultChecked /> Same language at home</label>
          <label><input type="checkbox" defaultChecked /> Similar nap schedule</label>
          <label><input type="checkbox" defaultChecked /> Nearby families within 1 km</label>
          <label><input type="checkbox" /> First meetup in public place</label>
          <label><input type="checkbox" defaultChecked /> Calm indoor activities</label>
          <label><input type="checkbox" defaultChecked /> Stroller-friendly places</label>
          <label><input type="checkbox" /> Shared parenting style</label>
          <label><input type="checkbox" /> Weekend availability</label>
          <label><input type="checkbox" defaultChecked /> Similar child age range</label>
          <label><input type="checkbox" /> Allergy-aware snacks</label>
        </div>
      </section>
    </div>
  )
}

function CareSection() {
  return (
    <div className="content-grid">
      <section className="panel-column wide-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Qualified nanny and teachers</p>
            <h2>Trusted support nearby</h2>
          </div>
          <button className="secondary-button" type="button"><ShieldCheck size={16} aria-hidden="true" /> Verified only</button>
        </div>
        <div className="provider-list">
          {careProviders.map((provider) => (
            <article className="provider-card" key={provider.name}>
              <span><ShieldCheck size={18} aria-hidden="true" /></span>
              <div>
                <h3>{provider.name}</h3>
                <p>{provider.role}</p>
                <small>{provider.checks} · {provider.focus}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel-column">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Play list</p>
            <h2>Saved ideas</h2>
          </div>
        </div>
        <div className="play-list">
          {playList.map((idea) => <button key={idea} type="button"><Check size={16} aria-hidden="true" /> {idea}</button>)}
        </div>
      </section>
    </div>
  )
}

function CommunitySection() {
  return (
    <div className="content-grid">
      <section className="panel-column wide-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Forum, tips, and open chat channels</p>
            <h2>Parent conversations</h2>
          </div>
          <button className="create-button" type="button">
            <Plus size={16} aria-hidden="true" />
            Create
          </button>
        </div>
        <div className="channel-list">
          {channels.map((channel) => (
            <article className="channel-card" key={channel.name}>
              <MessageCircle size={22} aria-hidden="true" />
              <div>
                <h3>{channel.name}</h3>
                <p>{channel.topic}</p>
                <span>{channel.count}</span>
              </div>
              <div className="channel-actions" aria-label={`${channel.name} actions`}>
                <button type="button">View</button>
                <button type="button">Join</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel-column">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Today’s tips</p>
            <h2>From nearby parents</h2>
          </div>
        </div>
        <div className="tips-list">
          <p>Best quiet hour at the library play corner is before 10:30.</p>
          <p>Two cafes near Westerpark keep spare high chairs behind the counter.</p>
          <p>The canal-side playground has a clean changing room by the museum entrance.</p>
        </div>
      </section>
    </div>
  )
}

function SettingsSection({
  selectedLanguage,
  setSelectedLanguage,
}: {
  selectedLanguage: string
  setSelectedLanguage: (language: string) => void
}) {
  return (
    <div className="content-grid">
      <section className="panel-column wide-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">User setting</p>
            <h2>Family profile</h2>
          </div>
        </div>
        <form className="settings-form">
          <label>
            Parent name
            <input defaultValue="Eunyoung" />
          </label>
          <label>
            Group category
            <select defaultValue="2-3">
              <option>0-1 years</option>
              <option>1-2 years</option>
              <option value="2-3">2-3 years</option>
              <option>3-4 years</option>
              <option>4-5 years</option>
              <option>5-6 years</option>
              <option>6-7 years</option>
              <option>custom</option>
            </select>
          </label>
          <label>
            Home language
            <select value={selectedLanguage} onChange={(event) => setSelectedLanguage(event.target.value)}>
              <option>English</option>
              <option>Korean</option>
              <option>Dutch</option>
              <option>French</option>
              <option>Spanish</option>
            </select>
          </label>
          <label>
            Preferred distance
            <input type="range" min="1" max="10" defaultValue="3" />
          </label>
        </form>
      </section>

      <section className="panel-column">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Trust controls</p>
            <h2>Comfort settings</h2>
          </div>
        </div>
        <div className="preference-list">
          <label><input type="checkbox" defaultChecked /> Hide exact address</label>
          <label><input type="checkbox" defaultChecked /> Require verified profiles</label>
          <label><input type="checkbox" /> Allow group invites</label>
          <label><input type="checkbox" defaultChecked /> Weekly parent digest</label>
        </div>
      </section>
    </div>
  )
}

export default App
