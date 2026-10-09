import { useState } from 'react'
import { NURSERIES, mapUrl, searchUrl } from '../data/nurseries'
import type { NurseryType, Nursery } from '../data/nurseries'
import type { Settings } from '../types'

interface NurseryListProps {
  settings: Settings
  onUpdateSettings: (newSettings: Settings) => void
}

const TYPES: (NurseryType | 'fav' | 'all')[] = ['all', 'fav', '区立保育園', '私立保育園', '幼稚園', '認定こども園', '小規模保育']
const LABEL: Record<string, string> = { all: 'すべて', fav: 'お気に入り' }

export function NurseryList({ settings, onUpdateSettings }: NurseryListProps) {
  const [filter, setFilter] = useState<(typeof TYPES)[number]>('all')
  const [searchText, setSearchText] = useState('')
  const favorites = settings.nurseryFavorites || []
  const memos = settings.nurseryMemos || {}
  const custom = settings.customNurseries || []

  const toggleFavorite = (id: string) => {
    const next = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id]
    onUpdateSettings({ ...settings, nurseryFavorites: next })
  }

  const updateMemo = (id: string, text: string) => {
    onUpdateSettings({ ...settings, nurseryMemos: { ...memos, [id]: text } })
  }

  const addCustomNursery = () => {
    if (!searchText.trim()) return
    const newNursery: Nursery = {
      id: `custom-${Date.now()}`,
      name: searchText.trim(),
      type: '私立保育園'
    }
    onUpdateSettings({
      ...settings,
      customNurseries: [...custom, newNursery],
      nurseryFavorites: [...favorites, newNursery.id] // Auto-favorite
    })
    setSearchText('')
    setFilter('fav')
  }

  const allNurseries = [...NURSERIES, ...custom]

  const list = allNurseries.filter((n) => {
    if (searchText && !n.name.includes(searchText)) return false
    return filter === 'all' ? true : filter === 'fav' ? favorites.includes(n.id) : n.type === filter
  })

  const isExactMatch = allNurseries.some(n => n.name === searchText.trim())

  const chip = (on: boolean) => ({
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    border: '1px solid #ccc',
    background: on ? '#2b7055' : '#fff',
    color: on ? '#fff' : '#333',
    whiteSpace: 'nowrap' as const,
  })

  return (
    <div style={{ paddingBottom: '80px' }}>
      <h2>世田谷区の保育施設</h2>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
        気になる園に「★」をつけると、メモで夫婦の感想を記録できます。<br/>
        ※一覧にない園は検索ボックスから手動追加できます。
      </p>

      <div style={{ marginBottom: '1rem' }}>
        <input 
          type="text" 
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="保育園名で検索..."
          style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
        {TYPES.map((t) => (
          <button key={t} onClick={() => setFilter(t)} style={chip(filter === t)}>
            {LABEL[t] ?? t}
            {t === 'fav' && favorites.length ? `(${favorites.length})` : ''}
          </button>
        ))}
      </div>

      {searchText.trim() && !isExactMatch && (
        <div style={{ marginBottom: '1rem', padding: '1rem', background: '#e0f2e9', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 0.5rem', color: '#2b7055' }}>お探しの園が見つかりませんか？</p>
          <button onClick={addCustomNursery} style={{ padding: '0.6rem 1rem', background: '#2b7055', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
            「{searchText}」をリストに追加
          </button>
        </div>
      )}

      {list.length === 0 && <p className="empty">条件に一致する園がありません。</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {list.map((n) => {
          const fav = favorites.includes(n.id)
          return (
            <div
              key={n.id}
              style={{
                border: '1px solid #eee',
                borderRadius: '10px',
                padding: '0.8rem 1rem',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.72rem', background: '#e0f2e9', color: '#2b7055', padding: '2px 6px', borderRadius: '4px' }}>
                    {n.type}
                  </span>
                  <div style={{ margin: '0.25rem 0 0', fontWeight: 700 }}>{n.name}</div>
                  {n.note && <div style={{ fontSize: '0.8rem', color: '#666' }}>{n.note}</div>}
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <a href={n.url || searchUrl(n)} target="_blank" rel="noreferrer" title={n.url ? 'サイトへ' : 'Webで検索'} style={{ fontSize: '1.2rem', textDecoration: 'none' }}>
                    {n.url ? '🔗' : '🔍'}
                  </a>
                  <a href={mapUrl(n.name)} target="_blank" rel="noreferrer" title="マップで検索" style={{ fontSize: '1.3rem', textDecoration: 'none' }}>
                    📍
                  </a>
                  <button
                    onClick={() => toggleFavorite(n.id)}
                    aria-label="お気に入り"
                    style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: fav ? '#f5b400' : '#ccc', padding: 0 }}
                  >
                    {fav ? '★' : '☆'}
                  </button>
                </div>
              </div>
              
              {(fav || memos[n.id]) && (
                <textarea
                  value={memos[n.id] || ''}
                  onChange={(e) => updateMemo(n.id, e.target.value)}
                  placeholder="見学の感想やメモを夫婦で共有..."
                  style={{
                    width: '100%', boxSizing: 'border-box', padding: '0.6rem',
                    borderRadius: '8px', border: '1px solid #e1e8e5',
                    background: '#f9fbf9', fontSize: '0.9rem', color: '#333',
                    resize: 'vertical', minHeight: '60px'
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
