export type NurseryType = '区立保育園' | '私立保育園' | '幼稚園' | '認定こども園' | '小規模保育'

export interface Nursery {
  id: string
  name: string
  type: NurseryType
  note?: string
  url?: string
}

export const NURSERIES: Nursery[] = [
  { id: 'sangenjaya', name: '区立三軒茶屋保育園', type: '区立保育園' },
  { id: 'youga', name: '区立用賀保育園', type: '区立保育園' },
  { id: 'shimokitazawa', name: '区立下北沢保育園', type: '区立保育園' },
  { id: 'futakotamagawa', name: '区立二子玉川保育園', type: '区立保育園' },
  { id: 'meidaimae', name: '区立明大前保育園', type: '区立保育園' },
  { id: 'kyodo', name: '区立経堂保育園', type: '区立保育園' },
  { id: 'sakurashinmachi', name: '区立桜新町保育園', type: '区立保育園' },
  { id: 'komazawa', name: '区立駒沢保育園', type: '区立保育園' },
  { id: 'todoroki', name: '区立等々力保育園', type: '区立保育園' },
  { id: 'oyamadai', name: '区立尾山台保育園', type: '区立保育園' },
  { id: 'kaminoge', name: '区立上野毛保育園', type: '区立保育園' },
  { id: 'chitosekarasuyama', name: '区立千歳烏山保育園', type: '区立保育園' },
  { id: 'soshigaya', name: '区立祖師谷保育園', type: '区立保育園' },
  { id: 'seijo', name: '区立成城保育園', type: '区立保育園' },
  { id: 'kitami', name: '区立喜多見保育園', type: '区立保育園' },
  { id: 'matsubara', name: '区立松原保育園', type: '区立保育園' },
  { id: 'akatsutsumi', name: '区立赤堤保育園', type: '区立保育園' },
  { id: 'daita', name: '区立代田保育園', type: '区立保育園' },
  { id: 'ikejiri', name: '区立池尻保育園', type: '区立保育園' },
  { id: 'mishuku', name: '区立三宿保育園', type: '区立保育園' },
]

export const searchNurseriesUrl = (nursery: Nursery): string => {
  if (nursery.url) return nursery.url
  return \https://www.google.com/search?q=世田谷区+\\
}
