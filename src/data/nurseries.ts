export type NurseryType = '区立保育園' | '私立保育園' | '幼稚園' | '認定こども園' | '小規模保育'

export interface Nursery {
  id: string
  name: string
  type: NurseryType
  note?: string
  url?: string
}

export const NURSERIES: Nursery[] = [
  { id: 'sangenjaya', name: '区立三軒茶屋保育園', type: '区立保育園', url: 'https://www.city.setagaya.lg.jp/' },
  { id: 'youga', name: '区立用賀保育園', type: '区立保育園', url: 'https://www.city.setagaya.lg.jp/' },
  { id: 'shimokitazawa', name: '区立下北沢保育園', type: '区立保育園', url: 'https://www.city.setagaya.lg.jp/' },
  { id: 'futakotamagawa', name: '区立二子玉川保育園', type: '区立保育園', url: 'https://www.city.setagaya.lg.jp/' },
  { id: 'meidaimae', name: '区立明大前保育園', type: '区立保育園' },
]

export const searchNurseriesUrl = (nursery: Nursery): string => {
  if (nursery.url) return nursery.url
  return \https://www.google.com/search?q=世田谷区+\\
}
