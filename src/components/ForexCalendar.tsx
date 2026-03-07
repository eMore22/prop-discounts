"use client";

// src/components/ForexCalendar.tsx
// Drop this anywhere: <ForexCalendar />
// Fetches live economic calendar data from Forex Factory via /api/forex-news

import { useEffect, useState } from 'react';
import { Calendar, Clock, TrendingUp, RefreshCw, ExternalLink, Zap } from 'lucide-react';

interface ForexEvent {
  title: string;
  country: string;
  date: string;
  time: string;
  impact: 'High' | 'Medium' | 'Low' | 'Holiday';
  forecast: string;
  previous: string;
  currency: string;
}

const IMPACT_CONFIG = {
  High:    { color: 'text-red-500',    bg: 'bg-red-500',    label: 'High Impact',   dot: 'bg-red-500' },
  Medium:  { color: 'text-amber-500',  bg: 'bg-amber-500',  label: 'Medium Impact', dot: 'bg-amber-500' },
  Low:     { color: 'text-slate-400',  bg: 'bg-slate-400',  label: 'Low Impact',    dot: 'bg-slate-400' },
  Holiday: { color: 'text-blue-400',   bg: 'bg-blue-400',   label: 'Holiday',       dot: 'bg-blue-400' },
};

const CURRENCY_FLAGS: Record<string, string> = {
  USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧', JPY: '🇯🇵',
  AUD: '🇦🇺', CAD: '🇨🇦', CHF: '🇨🇭', NZD: '🇳🇿',
  CNY: '🇨🇳', ALL: '🌐',
};

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  } catch { return dateStr; }
}

function groupByDate(events: ForexEvent[]) {
  const groups: Record<string, ForexEvent[]> = {};
  events.forEach(e => {
    const key = e.date || 'Unknown';
    if (!groups[key]) groups[key] = [];
    groups[key].push(e);
  });
  return groups;
}

type Filter = 'All' | 'High' | 'Medium' | 'Low';

export default function ForexCalendar() {
  const [events, setEvents] = useState<ForexEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('All');
  const [lastUpdated, setLastUpdated] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/forex-news');
      const data = await res.json();
      if (data.events) {
        setEvents(data.events);
        setLastUpdated(new Date().toLocaleTimeString());
      } else {
        setError('No events available right now.');
      }
    } catch {
      setError('Unable to load calendar. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = filter === 'All' ? events : events.filter(e => e.impact === filter);
  const grouped = groupByDate(filtered);

  return (
    <div className="bg-gradient-to-br from-[#0a0f1e] to-[#0d1f3c] rounded-2xl border border-[#1a3a5c] overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 border-b border-[#1a3a5c] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-xl">
            <Calendar className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-white font-black text-base">Economic Calendar</h2>
            <p className="text-slate-500 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Live · Powered by Forex Factory
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdated && <span className="text-slate-600 text-xs hidden sm:block">Updated {lastUpdated}</span>}
          <button onClick={() => fetchData(true)} disabled={refreshing}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white">
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="px-5 py-3 border-b border-[#1a3a5c] flex gap-2 flex-wrap">
        {(['All', 'High', 'Medium', 'Low'] as Filter[]).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${filter === f
              ? f === 'High' ? 'bg-red-500 text-white'
              : f === 'Medium' ? 'bg-amber-500 text-black'
              : f === 'Low' ? 'bg-slate-600 text-white'
              : 'bg-blue-600 text-white'
              : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}>
            {f === 'High' ? '🔴' : f === 'Medium' ? '🟡' : f === 'Low' ? '⚪' : '📅'} {f}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-h-[520px] overflow-y-auto">
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-slate-500 text-sm">Loading economic calendar...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="px-5 py-10 text-center">
            <Calendar className="w-10 h-10 text-slate-700 mx-auto mb-3" />
            <p className="text-slate-400 text-sm font-semibold">{error}</p>
            <button onClick={() => fetchData()}
              className="mt-3 text-blue-400 text-xs font-bold hover:underline">Try again</button>
          </div>
        )}

        {!loading && !error && Object.keys(grouped).length === 0 && (
          <div className="px-5 py-10 text-center">
            <Calendar className="w-10 h-10 text-slate-700 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No {filter !== 'All' ? filter.toLowerCase() + ' impact' : ''} events found this week.</p>
          </div>
        )}

        {!loading && !error && Object.entries(grouped).map(([date, dayEvents]) => (
          <div key={date}>
            {/* Date header */}
            <div className="sticky top-0 px-5 py-2.5 bg-[#0d1a30] border-b border-[#1a3a5c] z-10">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{formatDate(date)}</span>
            </div>

            {/* Events */}
            {dayEvents.map((event, i) => {
              const cfg = IMPACT_CONFIG[event.impact] || IMPACT_CONFIG.Low;
              const flag = CURRENCY_FLAGS[event.currency] || '🌐';
              return (
                <div key={i} className="px-5 py-3.5 border-b border-[#1a3a5c]/50 hover:bg-white/3 transition-colors group">
                  <div className="flex items-start gap-3">
                    {/* Impact dot */}
                    <div className="flex flex-col items-center gap-1 pt-0.5 flex-shrink-0">
                      <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot} ${event.impact === 'High' ? 'animate-pulse' : ''}`} />
                    </div>

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-white text-sm font-bold leading-snug truncate">{event.title}</p>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="text-lg">{flag}</span>
                          <span className="text-xs font-black text-slate-500 bg-white/5 px-1.5 py-0.5 rounded">
                            {event.currency || event.country}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-1.5 text-xs">
                        {event.time && (
                          <span className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3 h-3" /> {event.time}
                          </span>
                        )}
                        <span className={`font-black ${cfg.color}`}>{cfg.label}</span>
                        {event.forecast && (
                          <span className="text-slate-500">Forecast: <span className="text-blue-400 font-bold">{event.forecast}</span></span>
                        )}
                        {event.previous && (
                          <span className="text-slate-500">Prev: <span className="text-slate-300 font-bold">{event.previous}</span></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[#1a3a5c] flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <Zap className="w-3 h-3" />
          <span>Data from Forex Factory · Updates every 30 min</span>
        </div>
        <a href="https://www.forexfactory.com/calendar" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-400 font-bold transition-colors">
          Full Calendar <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}